# 人手不足研究所｜14 Launch Readinessレポート v1.0

**文書名:** 14-launch-readiness.md
**対象サイト:** 人手不足研究所
**位置づけ:** Phase 9（QA・Launch）で実施したQA結果と、`docs/09-implementation-claude-code.md` §66 Launch条件への適合状況の記録
**作成日:** 2026-08-17

## 結論

コードレベル・ローカルビルドレベルで確認可能なQAは完了し、発見した不具合は修正済み。ただし本番Secret・本番インフラ（DB・メール配信・PDFアセット・独立ドメイン）が未設定のため、**実際のProduction公開はこのセッションでは行っていない**。Launch条件（09 §66）のうちインフラ依存の項目は、該当のSecret/インフラが揃った後に人間が確認する必要がある。

## Launch条件（09 §66）への適合状況

| Launch条件 | 状態 | 詳細 |
| --- | --- | --- |
| Build Success | ✅ 確認済み | `npm run build` 成功（24ルート生成） |
| Critical Errorなし | ✅ 確認済み | `npm run typecheck` / `lint` / `validate` / `test`（80件）全て成功。QAで発見した1件（sitemap漏れ）は修正済み |
| Form成功 | 🚫 確認不可 | `DATABASE_URL`未設定のためローカルでは送信→DB保存まで到達しない。フォームUI・Zod validation・Honeypot・Rate Limitはコードレベルで確認済み（下記QA詳細参照） |
| Lead保存成功 | 🚫 確認不可 | 同上。本番DB接続後に人間が実施する |
| Email成功 | 🚫 確認不可 | `EMAIL_API_KEY`未設定。`consoleEmailAdapter`へのフォールバック動作とPIIマスキング（`maskEmail`）はテスト済み |
| PDF成功 | 🚫 確認不可 | B-3（配布方式：Signed URL/実質的保護）が未決定に加え、実PDFアセットが未着。Report自体が0件 |
| SEO確認 | ✅ 確認済み | 下記QA詳細参照 |
| Analytics確認 | ⚠️ 部分確認 | `NEXT_PUBLIC_GA_MEASUREMENT_ID`未設定時に何も注入されないこと、設定時にgtag初期化・CVイベント発火コードが呼ばれることはコード・ブラウザで確認済み。実GA4への送信は測定ID取得後に人間が確認する |
| Mobile確認 | ✅ 確認済み | 下記QA詳細参照 |
| Privacy公開 | ✅ 確認済み | `/privacy/`実装済み（Phase 8）。index対象・canonical正常・Footerからの導線を確認 |

## 今回実施したQAの詳細

### Functional QA
- 内部リンク: TOP・4 Theme Hub・建設Industry Hub・Reports・Interviews・Article詳細・Interview詳細・About・Privacy・Contact・InterviewRequest・Consultation・Thanks×4・404・dev/ui・sitemap.xml・robots.txt・opengraph-imageの23ページを起点にクロールし、発見した全内部リンク（追加14件）を含めて200であることを確認。リンク切れなし
- 404ページ: 存在しないURLへのアクセスでカスタム404ページが表示され、TOPへの導線とテーマ一覧が機能することを確認
- 外部リンク: Interview企業リンクが`target="_blank" rel="noopener noreferrer"`であることをコードで確認（Phase 5実装分）

### Content QA
- 出典: `content/articles/construction-labor-shortage.mdx`内の全統計記述が、frontmatterの`sources`（5件）で登録された出典に対応していることを確認
- Draft除外: `getPublishedArticles/Reports/Interviews`のdraftフィルタ、および`app/sitemap.ts`のpublished限定ロジックをコードで確認

### SEO QA
- **不具合を発見・修正**: `/about/` `/privacy/`（Phase 8で追加）が`app/sitemap.ts`に含まれていなかった。両ページとも`robots`指定なし（index対象）であるにもかかわらずsitemapから漏れていたため、`staticPaths`へ追加した
- sitemap: 修正後、`/thanks/*` `/consultation/` `/dev/`が引き続き含まれないことを確認
- canonical: 主要9ページ種別で自己参照を確認。TOPのみ`http://localhost:3000`（末尾スラッシュなし）となるが、これはNext.js Metadata APIがルートパスの`canonical: "/"`を解決する際の標準動作であり、コード側の`alternates.canonical: "/"`設定自体は正しい。検索エンジン上は同一URLとして扱われるため実害はない
- title/description: 全17ページ（静的12 + 動的5）で欠落なし
- 構造化データ: TOP以下全ページでOrganization/WebSiteが、Article詳細でArticle/BreadcrumbListが表示内容と一致することを確認

### Responsive QA（Desktop / Tablet 768×1024 / Mobile 375×812）
- Header: Desktop/Tabletでは横並びナビ、Mobileではハンバーガーメニュー（`<details>`によるJS不要の実装）が正常動作
- Article: TOC・Chart（サーバー生成SVG）・DataTableがMobile幅で自身のコンテナ内に`overflow-x-auto`で収まり、ページ全体の横スクロールを引き起こさないことを確認
- Form: Contact埋め込みフォームがMobile幅で崩れず表示されることを確認
- Interview: Tablet幅で企業プロフィールカードを含めて正常表示
- Report一覧: 0件時の空状態メッセージが正常表示（Empty Section該当なし）

**軽微な所見（Minor）**: Header横ナビが768px（Tailwindの`md`ブレークポイント境界）ちょうどで2行に折り返される。機能上の問題はなく、実害は小さいため今回は修正せず記録に留める。

### Security QA
- Honeypot・Rate Limitは共通処理`lib/actions/lead-actions.ts`の`submitLeadAction`に一箇所実装され、4フォーム全てが同じ経路を通ることをコードで確認
- Rate Limitはインメモリ実装のため、サーバーレス環境で複数インスタンスに分散した場合は保護が弱まる旨がコードコメントで明記されている（本番運用時の既知の制約）
- `.env.example`に実際のSecret値が含まれていないことを確認
- `maskEmail`によりログへメールアドレス全文が出力されないことを既存テストで確認
- `privacyPolicyAgreed: z.literal(true)`によりプライバシーポリシー同意が必須項目であることを確認

### Accessibility QA
- 主要6ページで見出し階層がH1→H2のみで構成され、階層の飛び番がないことを確認
- `<img>`タグはサイト内に存在しない（Eyecatch未実装のため）。ChartはSVGに`role="img"` `aria-label`を付与済み
- フォーム全項目が`FormField`経由で`htmlFor`とlabelを関連付け済み
- Honeypotフィールドは`aria-hidden="true"` `tabIndex={-1}`で支援技術から適切に除外
- モバイルメニューはネイティブ`<details>/<summary>`でキーボード操作可能

### Performance QA（Lighthouse等の数値計測ツールは未導入のため、コードレベルの確認に留める）
- `"use client"`は11ファイルのみで、いずれもフォーム・トラッキング・クリックイベント等操作が必要な箇所に限定されている
- 画像アセットは現状サイト内に存在しない（ファイルサイズリスクなし）
- フォントは`next/font`経由でロード済み（Phase 2実装）
- GA4スクリプトは測定ID未設定時に読み込まれないことを確認済み（Phase 7実装・今回再確認）

## Production公開前に必要な意思決定・作業（人間が行う）

Launch条件のインフラ確認に加えて、以下は`docs/11-open-issues.md`に未決事項として残っている。

| 項目 | 内容 | 参照 |
| --- | --- | --- |
| C-3 | 独立ドメイン・名称の最終確定。リポジトリ名（`hito-lab`）も連動 | 11-open-issues.md C-3 |
| B-3 | Report PDFの配布方式（Signed URL vs 実質的保護）の決定 | 11-open-issues.md B-3 |
| — | 本番DB（PostgreSQL）の用意と`DATABASE_URL`設定、Migration適用（Claude Codeでは行わない） | CLAUDE.md禁止事項 |
| — | 本番メール配信サービスの契約と`EMAIL_API_KEY`設定 | — |
| — | 実GA4プロパティ作成と`NEXT_PUBLIC_GA_MEASUREMENT_ID`設定 | — |
| — | Report・Interviewの実データ投入（現状Report 0件・Interview 0件） | docs/10 §15-19 |
| — | `content/articles/construction-labor-shortage.mdx`のdraft→published変更 | CLAUDE.md禁止事項（人間が行う） |
| — | bizdev-note.com側の301リダイレクト・sitemap更新・内部リンク張り替え | docs/13-migration-candidates.md |

これらが揃った時点で、`.claude/skills/qa/SKILL.md`の「人間が確認する項目」（フォーム送信→Lead保存→Email→PDF取得の一連、GA4イベントの実発火）を人間が実施し、Production公開の最終判断を行う。
