# 人手不足研究所

建設・介護・物流・製造・宿泊など、人手不足の影響を受ける企業に向けた調査・実践メディア。

## 設計書

`docs/` が設計の唯一の正。実装が設計書と矛盾する場合は設計書を優先する。

| ファイル | 内容 |
| --- | --- |
| `docs/00-basic-design.md` | 上位設計。ブランド・ターゲット・全体方針 |
| `docs/01-information-architecture.md` | 分類（テーマ×業界×職種×地域×形式） |
| `docs/02-sitemap-url.md` | URL・パンくず・index方針 |
| `docs/03-content-model.md` | frontmatter・マスターデータ・validation |
| `docs/04-seo-aio.md` | SEO/AIO方針・構造化データ |
| `docs/05-page-template.md` | 各ページの構成と情報の優先順位 |
| `docs/06-brand-ui.md` | カラー・タイポグラフィ・コンポーネント |
| `docs/07-conversion-lead.md` | CV・フォーム・Lead |
| `docs/08-technical-architecture.md` | 技術構成 |
| `docs/09-implementation-claude-code.md` | 実装順序とフェーズごとの完了条件 |
| `docs/10-launch-interview-plan.md` | 初期公開と取材開始 |
| `docs/11-open-issues.md` | **未確定・不整合の一覧。着手前に必ず確認する** |
| `docs/12-media-strategy.md` | 競合・差別化・チャネル・運用体制 |
| `docs/13-migration-candidates.md` | bizdev-note.comからの既存記事移行候補一覧 |
| `docs/14-launch-readiness.md` | QA結果とLaunch条件への適合状況 |
| `docs/15-reference-sites.md` | 競合・参考メディア一覧（デザイン・構造検証用） |

11に記載された未決事項は、勝手に一方を採用しない。判断が必要になったら実装を止めて確認する。

コンテンツの判断（何を書くか、どう差別化するか、どのチャネルに載せるか）で迷ったら12を参照する。

## 検証コマンド

実装後は必ず以下を通してから完了を報告する。通っていない状態で「完了しました」と言わない。

```
npm run typecheck    型チェック
npm run lint         Lint
npm run validate     content/ と data/ のZod検証
npm run build        本番ビルド
```

`npm run validate` が落ちる場合、frontmatterかマスターデータに不整合がある。エラーメッセージのIDを `data/taxonomies/` で確認する。

## 技術構成

Next.js (App Router) / TypeScript / MDX / Zod / Tailwind / PostgreSQL + Drizzle / Vercel

- 読み物ページは Server Component。Client Component はフォーム・メニュー・アコーディオンなど操作が必要な箇所のみ
- Article / Report / Interview は静的生成

## ディレクトリ

```
app/          ルーティング
components/   UIコンポーネント
content/      articles / reports / interviews （MDX本文）
data/          taxonomies / people / companies / sources / ctas / forms / assets
lib/          content / db / seo / validation / email / analytics
db/           schema / migrations
docs/         設計書
```

ビジネスロジックは `lib/` に置く。コンポーネントに詰め込まない。

## 変更前に確認が必要なもの

以下は勝手に変更しない。必要だと判断したら、実装せずに理由・影響範囲・推奨案を報告する。

- URL体系
- Theme / Industry の分類とID
- DB Schema
- Brand Color / Font
- 公開方針（draft → published）
- Privacy に関わる仕様

## やらないこと

- 未定義のTaxonomy IDを新規追加する（マスター更新を経由する）
- タグ・業界・地域から一覧ページを自動生成する
- draft を published に変更する（人間が行う）
- Design Token を経由せず色・フォントの直値をコンポーネントに書く
- CTA文言・企業情報・出典を記事本文へ直書きする（マスターから参照する）
- 本番DBへのMigration適用、Production Secretの変更

## 進め方

- フェーズ着手は `/phase <番号>`
- 大きな変更はプランモードで計画を出してから実装する
- 1セッションで狙う成果物は一つに限定する
- 調査・探索はサブエージェントへ委譲し、メインの文脈を消費しない

## コンテンツ追加

| コマンド | 用途 |
| --- | --- |
| `/plan-article` | 記事企画・既存記事とのカニバリ確認 |
| `/add-article` | Article追加 |
| `/add-report` | Report追加 |
| `/add-interview` | Interview追加 |
| `/qa` | 公開前チェック |

いずれも draft 状態で保存する。公開は人間が行う。

## 文体

- 出力・コメント・コミットメッセージは日本語
- 記事本文の敬体／常体は既存記事に合わせる
- 統計・数値には必ず出典を付ける。出典が確認できない数値は書かない
