# 人手不足研究所｜02 サイトマップ・URL設計書 v1.0
**文書名:** 02-sitemap-url.md
**対象サイト:** 人手不足研究所
**位置づけ:** 00 基本設計書、01 情報設計書の下位設計書
**目的:** 01で定義した「テーマ・業界・職種・地域・形式」の5軸を、実際のページ構成・URL・パンくず・index方針・内部リンクに落とし込む。

# 1. 基本方針
人手不足研究所では、SEO上の主軸を**テーマ**とする。

主要テーマは以下の4つ。

- 採用・人材確保
- 組織・人事・定着
- 業務改善・DX
- 経営改善・IT活用

各テーマトップは単なる記事一覧ではなく、独立したSEOランディングページとして育成する。

一方で、

- 業界
- 職種
- 地域

は初期段階では主URL階層にせず、主に属性・タグとして管理する。

コンテンツが十分に蓄積し、検索需要と独自価値が確認できた場合のみ、独立したSEOランディングページを公開する。

# 2. URL設計の基本原則
## 2-1. テーマを主階層とする
通常記事は原則としてテーマ配下に置く。

例：

/recruiting/construction-labor-shortage/

/organization/employee-retention/

/dx/excel-workflow-improvement/

/management/hotel-booking-system/

## 2-2. primaryThemeをURL基準とする
各記事には01情報設計書で定義したprimaryThemeを設定する。

URLはprimaryThemeを基準に生成する。

例：

primaryTheme: recruiting

の場合、

/recruiting/{slug}/

とする。

## 2-3. primaryThemeは原則変更しない
テーマ配下URLを採用するため、公開後のprimaryTheme変更は原則行わない。

記事の内容が複数テーマにまたがる場合でも、最も主要な検索意図・編集意図を1つ選び、primaryThemeとして固定する。

どうしても変更が必要な場合は、

- 旧URLから新URLへ301リダイレクト
- canonical更新
- sitemap更新
- 内部リンク更新

を実施する。

# 3. 初期サイトマップ
/

├── recruiting/

│   └── {article-slug}/

│

├── organization/

│   └── {article-slug}/

│

├── dx/

│   └── {article-slug}/

│

├── management/

│   └── {article-slug}/

│

├── reports/

│   ├── {report-slug}/

│   ├── recruiting/

│   ├── organization/

│   ├── dx/

│   └── management/

│

├── interviews/

│   └── {interview-slug}/

│

├── industries/

│   └── construction/

│

├── about/

├── contact/

├── search/

└── privacy/

初期公開時には、テーマ別レポート一覧ページはコンテンツ量に応じて段階的に公開してよい。

# 4. トップページ
## URL
/

## 役割
人手不足研究所のブランド・主要コンテンツ・テーマへの入口。

## 主な構成
- ブランドメッセージ
- メディア説明
- 注目レポート
- 最新調査
- 主要テーマ
- 業界から探す
- インタビュー
- 「採る・活かす・減らす・強くする」のブランド思想
- 最新記事
- About導線
- 問い合わせ・レポートDL導線

## SEO上の役割
ブランド指名検索「人手不足研究所」の本体ページ。

# 5. テーマトップ
テーマトップはサイトの主要SEOハブとする。

## 5-1. 採用・人材確保
/recruiting/

## 5-2. 組織・人事・定着
/organization/

## 5-3. 業務改善・DX
/dx/

## 5-4. 経営改善・IT活用
/management/

# 6. テーマトップの役割
各テーマトップは記事一覧ページではなく、**独立した編集ハブページ**として制作する。

最低限、以下の情報を持つ。

- テーマの定義
- 人手不足との関係
- 主要な課題
- 主要な解決アプローチ
- 最新データ
- 注目レポート
- 主要記事
- インタビュー
- 業界別コンテンツ
- 関連テーマ
- 最新記事一覧

例えば/recruiting/であれば、

採用・人材確保とは

↓

人材不足の現状

↓

採用市場・求職者動向

↓

人材確保の主要手法

↓

業界別の採用課題

↓

最新レポート

↓

インタビュー

↓

記事一覧

のような構成を想定する。

# 7. 通常記事
## URL
/{primary-theme}/{slug}/

例：

/recruiting/construction-labor-shortage/

/dx/construction-excel-improvement/

/organization/young-worker-retention/

## 基本方針
- URLは短く保つ
- 日付は含めない
- 業界、地域、職種はURLに原則含めない
- slugは記事テーマを簡潔に表す英字とする
- 公開後のslug変更は原則行わない

# 8. レポート
レポートは人手不足研究所の重要資産として、通常記事とは独立URL体系とする。

## 8-1. レポート一覧
/reports/

## 役割
サイト内の全レポートへの入口。

単なる一覧ではなく、

- 注目レポート
- 最新レポート
- テーマ別レポート
- 業界別レポート
- 地域別レポート
- 調査方針

などを持つハブページとする。

# 9. レポート詳細
## URL
/reports/{report-slug}/

例：

/reports/construction-labor-shortage-2026/

/reports/construction-worker-recruitment-survey/

テーマ名は詳細URL階層に原則含めない。

理由：

- レポートは複数テーマにまたがる可能性がある
- primaryTheme変更によるURL変更を避ける
- 「レポート」というコンテンツ形式を独立資産として扱う

# 10. テーマ別レポート一覧
レポート数が増えた段階で以下を公開する。

/reports/recruiting/

/reports/organization/

/reports/dx/

/reports/management/

## 役割
特定テーマのレポートだけを探すユーザー向けページ。

## テーマトップとの違い
### /recruiting/
採用・人材確保全般を扱う総合ハブ。

### /reports/recruiting/
採用・人材確保に関する調査・レポートに限定したハブ。

検索意図が重複しないよう、タイトル・説明・コンテンツ内容を明確に分ける。

# 11. レポートページの基本構造
レポート詳細ページは、PDFダウンロードフォームだけのLPにしない。

最低限以下を持つ。

- レポートタイトル
- 調査概要
- 調査背景
- 主要なデータ
- グラフ・図表
- 主な発見
- 考察
- 一部結果
- レポートDL CTA
- 関連記事
- 関連インタビュー
- 調査主体「人手不足研究所」について
- 出典・調査方法

SEO・AIO・リード獲得の中心資産として扱う。

# 12. インタビュー
## 一覧
/interviews/

## 詳細
/interviews/{slug}/

例：

/interviews/construction-company-recruitment-case/

## 方針
インタビューはテーマではなくコンテンツ形式を主階層とする。

理由：

- 1つのインタビューで採用・組織・DX等を横断する可能性が高い
- 「企業インタビュー」という独自コンテンツ形式をブランド資産として育てるため

# 13. インタビュー一覧の将来拡張
必要に応じて以下を検討できる。

/interviews/companies/

/interviews/employees/

/interviews/experts/

ただし初期段階では分類ページを増やしすぎない。

# 14. 業界ページ
業界は01でタグ・属性として管理するが、十分なコンテンツがある業界についてはSEOハブを公開する。

## URL
/industries/{industry}/

初期最優先：

/industries/construction/

将来：

/industries/nursing-care/

/industries/logistics/

/industries/manufacturing/

/industries/hospitality/

# 15. 業界ページの構成
単なるタグ一覧にしない。

例：建設業ページ

建設業の人手不足

↓

主要統計

↓

採用・人材確保

↓

組織・人事

↓

業務改善・DX

↓

経営改善・IT活用

↓

最新レポート

↓

インタビュー

↓

最新記事

その業界について人手不足研究所が持つ情報をまとめた**業界ポータル**とする。

# 16. 職種ページ
職種は初期段階では原則として公開SEOページを作らない。

データとしては保持する。

例：

construction-worker

site-manager

truck-driver

care-worker

hotel-front-desk

十分な記事量と検索需要が確認できた場合、

/jobs/{job}/

を検討する。

例：

/jobs/construction-worker/

/jobs/truck-driver/

# 17. 地域ページ
地域も初期段階では属性として保持し、原則としてSEOページ化しない。

十分なコンテンツがある場合のみ、

/areas/{area}/

を公開する。

例：

/areas/hokuriku/

/areas/tokyo/

都道府県単位も同様に、十分な独自コンテンツがある場合のみ公開する。

# 18. 組み合わせSEOページ
以下のような組み合わせページを将来的に作成可能な構造とする。

建設 × 採用

建設 × DX

介護 × 定着

北陸 × 建設

建設 × 現場作業員

宿泊 × 予約システム

ただし自動生成はしない。

公開条件：

- 明確な検索需要がある
- 独自の説明文・データを掲載できる
- 関連コンテンツが複数ある
- 既存ページと検索意図が競合しない
- 継続更新可能である

# 19. 組み合わせページのURL
必要になった場合は、SEO意図に応じて個別設計する。

例：

/industries/construction/recruiting/

/areas/hokuriku/construction/

ただし、組み合わせページを先回りして大量生成しない。

# 20. フィルタURL
サイト内では、

- テーマ
- 業界
- 職種
- 地域
- 形式

による絞り込みUIを将来的に提供できる。

例：

/search/?industry=construction&theme=recruiting

## SEO方針
フィルタ結果URLは原則としてindex対象にしない。

検索需要を狙う場合は、別途編集した静的SEOランディングページを用意する。

# 21. サイト内検索
## URL
/search/

検索結果ページは原則noindexとする。

ユーザー利便性のための機能であり、SEOランディングページとして扱わない。

# 22. パンくず
パンくずは5軸すべてを表示しない。

通常記事ではprimaryThemeを基準とする。

例：

TOP

> 採用・人材確保

> 建設業は本当に人手不足なのか？

レポート：

TOP

> 調査・レポート

> 建設業人手不足レポート2026

インタビュー：

TOP

> インタビュー

> ○○社インタビュー

業界ページ：

TOP

> 業界から探す

> 建設

# 23. URL階層とパンくずは完全一致させない
URL構造は技術・SEO上の安定性を重視し、パンくずはユーザーにとって理解しやすい情報経路を優先する。

業界・職種・地域属性をすべてパンくずへ表示しない。

# 24. index / noindex基本方針
## 原則index
- TOP
- テーマトップ
- 通常記事
- レポート一覧
- レポート詳細
- 十分なコンテンツを持つテーマ別レポート一覧
- インタビュー一覧
- インタビュー詳細
- 十分な内容を持つ業界ページ
- About

## 原則noindex
- サイト内検索
- フィルタ結果
- コンテンツが極端に少ない属性一覧
- 自動生成された低価値ページ
- 重複ページ
- 管理系ページ

# 25. 薄いページの生成防止
業界・職種・地域・タグが存在しても、それだけを理由に一覧ページを生成しない。

公開する分類ページには最低限、

- 独自の導入文
- その分類の概要
- 読者が知るべき主要論点
- 複数の関連コンテンツ
- 内部リンク

を持たせる。

単なるカード一覧ページはSEO対象として公開しない。

# 26. canonical
通常記事・レポート・インタビューは原則自己参照canonicalを設定する。

フィルタ結果やパラメータ違いなど同一内容を示すURLが存在する場合は、代表URLへcanonicalを集約する。

# 27. ページネーション
記事数が増えた場合、テーマ・レポート・インタビュー一覧でページネーションを実装する。

初期段階では必要に応じて導入する。

ページネーションページ自体はユーザーが記事を発見できる正常な一覧ページとして扱うが、詳細なSEO方針は04 SEO・AIO設計書で定義する。

# 28. 内部リンク設計
重要ページへリンクを集中させる。

## TOPから
- 各テーマトップ
- /reports/
- /interviews/
- 主要業界ページ
- About

へリンクする。

# 29. 通常記事からの内部リンク
各記事から最低限、

- primaryThemeトップ
- 関連レポート
- 関連記事
- 必要に応じて業界ページ

へリンクする。

特に、関連する中心レポートが存在する場合は優先的にリンクする。

# 30. レポートからの内部リンク
レポート詳細から、

- 関連するテーマトップ
- 詳細解説記事
- インタビュー
- 業界ページ

へリンクする。

レポートと記事の双方向リンクを基本とする。

# 31. コンテンツクラスター設計
テーマトップを上位ハブとし、

テーマトップ

↓

主要レポート

↓

詳細記事

↓

インタビュー・事例

という構造を基本とする。

例えば、

/recruiting/

↓

/reports/construction-labor-shortage-2026/

↓

/recruiting/construction-labor-shortage/

/recruiting/construction-recruitment-cost/

/recruiting/construction-young-workers/

↓

/interviews/...

のように関連付ける。

# 32. クリック深度
重要コンテンツはTOPから原則3クリック以内で到達できる構造を目指す。

特に、

- テーマトップ
- レポート
- 業界ハブ
- 主要記事

は深い階層に埋めない。

# 33. グローバルナビゲーション
初期案：

調査・レポート

採用・人材確保

組織・人事

業務改善・DX

インタビュー

人手不足研究所について

「経営改善・IT活用」はナビゲーション幅・コンテンツ量に応じて追加を検討する。

# 34. 業界ナビゲーション
業界はグローバルナビの第一階層に並べすぎない。

トップページやテーマページ内に、

業界から探す

建設

介護

物流

製造

宿泊

の導線を設ける。

初期ではコンテンツが充実した業界のみリンクする。

# 35. フッター
フッターには以下を想定する。

調査・レポート

採用・人材確保

組織・人事

業務改善・DX

経営改善・IT活用

インタビュー

業界から探す

人手不足研究所について

お問い合わせ

プライバシーポリシー

# 36. Aboutページ
## URL
/about/

## 役割
ブランド思想・編集方針・運営主体を伝える。

主な内容：

- 人手不足研究所とは
- ブランドビジョン
- 「採る・活かす・減らす・強くする」
- 対象業界
- 調査・取材方針
- 編集方針
- 運営者
- 問い合わせ

# 37. 問い合わせ
## URL
/contact/

問い合わせ内容は将来的に、

- 取材
- レポート
- 採用
- 組織・人事
- DX・業務改善
- IT・システム
- その他

などを選択可能にする。

# 38. URL命名ルール
URL slugは以下を基本とする。

- 英小文字
- kebab-case
- 短く意味が分かる
- 年を入れる場合は必要なコンテンツのみ
- 不要な助詞・形容詞は避ける
- 公開後の変更を極力避ける

例：

construction-labor-shortage

construction-recruitment-cost

employee-retention

excel-workflow-improvement

# 39. 年号を含むURL
年次レポート等、年によって内容が明確に異なる場合は年号を含めてよい。

例：

/reports/construction-labor-shortage-2026/

毎年更新する恒久的なページの場合は、年号なしURLを使用して内容を更新する方法も検討する。

どちらを選ぶかはコンテンツシリーズ単位で統一する。

# 40. URLに日本語を使用しない
原則として日本語URLを使用せず、英語slugを採用する。

表示タイトルとURLは分離する。

# 41. 初期リリースで実装するページ
最低限以下を実装する。

/

 /recruiting/

 /organization/

 /dx/

 /management/

 /reports/

 /reports/{slug}/

 /interviews/

 /interviews/{slug}/

 /industries/construction/

 /about/

 /contact/

 /interview-request/

 /consultation/

 /thanks/report/

 /thanks/interview/

 /thanks/contact/

 /thanks/consultation/

 /privacy/

 404

通常記事は各テーマ配下で公開する。

`/thanks/*` と `/consultation/` はnoindex。sitemapにも含めない。

サイト内検索（`/search/`）はPhase 1では実装しない。ヘッダーに検索アイコンも置かない。空振りする導線を作らないため。

# 42. 初期リリースでは必須としないページ
以下はデータ構造のみ準備し、公開は後回しとする。

/jobs/

/areas/

/tags/

/reports/recruiting/

/reports/organization/

/reports/dx/

/reports/management/

/industries/{other-industry}/

/search/

/concept/hire/

/concept/enable/

/concept/reduce/

/concept/strengthen/

コンテンツ量が増えた時点で順次公開する。

`/concept/*` はブランド4視点（採る・活かす・減らす・強くする）の独立ページ。Phase 1ではTOPとAbout内のセクションで扱い、独立ページは作らない。詳細は05 §16-2。

# 42-2. 既存記事の移行とリダイレクト
人手不足研究所は独立ドメインで運営する。新規事業開発ノート（bizdev-note.com）に公開済みの採用・人手不足系記事は、人手不足研究所へ移設する。

## 方針

- 移設対象の記事は、旧URLから新URLへ **301リダイレクト** する
- 旧サイト側に記事を残さない。同一テーマの記事を2ドメインに置くと、自サイト間で検索意図が競合する（04 §67）
- 移設後の記事は、人手不足研究所のContent Model（03）に合わせてfrontmatterを付け直す
- 本文はそのまま移さず、テーマハブ・Report・業界ハブへの内部リンクを張り直す

## リダイレクトの実装

301は旧ドメイン側（bizdev-note.com）で設定する。新サイト側のNext.jsのredirects設定ではない。

移行対象が複数になる場合、旧URL→新URLの対応表を `docs/` 配下に残す。どの記事をどこへ移したかを後から追えるようにするため。

## 移行時のURL

移設記事にも通常記事と同じ命名規則を適用する。旧サイトのURL構造を引き継がない。

例：

```
旧: bizdev-note.com/human-resources/recruitment-career/constraction-recruitment-market/
新: {新ドメイン}/recruiting/construction-recruitment-market/
```

旧URLのtypo（constraction）をそのまま持ち込まない。

## 移行後の確認

- 旧URLへのアクセスが新URLへ301で転送される
- Search Consoleで旧ドメイン・新ドメインの両方を登録する
- 旧サイトのsitemapから移設記事を削除する
- 旧サイト内から移設記事へ張られている内部リンクを新URLへ張り替える

# 43. 将来の拡張方針
コンテンツ蓄積後は、

/industries/construction/

/industries/logistics/

/industries/nursing-care/

/industries/manufacturing/

/industries/hospitality/

/jobs/construction-worker/

/jobs/truck-driver/

/jobs/care-worker/

/areas/hokuriku/

/areas/kansai/

などへ拡張できる。

ただし、サイトのURL構造を根本変更せず追加可能であることを重視する。

# 44. 02設計の重要原則
本サイトのURL構造では、

**テーマ = SEO上の主要階層**

とする。

一方で、

**レポート・インタビュー = 独立したコンテンツ形式**

として別階層を持つ。

また、

**業界・職種・地域 = 原則属性**

とし、検索需要・コンテンツ量・独自価値が確認された場合のみSEOページとして公開する。

# 45. 本設計で避けること
以下は行わない。

- 全タグページの自動生成
- 全業界×テーマページの自動生成
- 全業界×職種ページの自動生成
- 全地域ページの自動生成
- フィルタURLのindex
- 記事公開後の頻繁なURL変更
- カテゴリトップを単なる一覧ページにする
- レポートDLページをフォームだけにする
- 同一検索意図のハブページを複数作る

# 46. 03コンテンツモデル仕様書への引き継ぎ事項
次の03では以下を定義する。

- article
- report
- interview

それぞれのデータ型

- slug
- primaryTheme
- themes
- industries
- jobs
- areas
- tags
- contentType

等のfrontmatter仕様

さらに、

- URL生成ロジック
- taxonomy master
- validation
- 関連記事生成
- レポート関連付け
- intervieweeType
- researchType

を仕様化する。

# 47. 04 SEO・AIO設計書への引き継ぎ事項
次の04では以下を定義する。

- テーマトップが狙う検索意図
- レポートトップとの検索意図の差別化
- title・description生成ルール
- canonical詳細
- sitemap
- robots
- Article構造化データ
- Dataset構造化データ
- Organization / WebSite
- BreadcrumbList
- 著者情報
- 出典
- 更新履歴
- 内部リンクスコア
- AI引用を意識したレポート構造

# 48. Claude Codeへの実装指示
以下をURL設計上の遵守事項とし、`.claude/rules/urls.md` に配置する。

- 通常記事はprimaryTheme配下に生成する
- レポート・インタビューは独立URL体系とする
- 業界・職種・地域タグからSEOページを自動生成しない
- フィルタ結果はSEOランディングページとして扱わない
- URLと分類データを密結合させすぎない
- 各テーマトップを編集可能な独立ページとして実装する
- レポート一覧・インタビュー一覧も独立したハブとして実装する
- 将来の分類ページ追加に耐えられる構造とする

公開後のURL変更は影響が大きいため、URL体系の変更は人間の承認事項とする。Claude Codeが変更の必要を認めた場合は、実装せずに理由と影響範囲を報告させる。

## 49. 完成イメージ
例えば「建設業人手不足レポート2026」と関連コンテンツを公開する場合、

/recruiting/

    採用・人材確保の総合ハブ

/reports/

    全レポート一覧

/reports/construction-labor-shortage-2026/

    建設業人手不足レポート

/recruiting/construction-labor-shortage/

    建設業は本当に人手不足なのか？

/recruiting/construction-recruitment-cost/

    建設業の採用単価

/interviews/example-construction-company/

    建設会社インタビュー

/industries/construction/

    建設業の総合ハブ

これらを内部リンクで強く関連付ける。

将来レポートが増えれば、

/reports/recruiting/

を追加し、採用関連レポートの専門ハブとして育成する。

# 50. 本設計書の結論
人手不足研究所では、

**テーマでSEOを取り、レポートで権威性とリードを取り、インタビューで一次情報を増やし、業界ページで専門性を束ねる。**

URL設計はこの役割分担を明確にする。

初期段階では構造を増やしすぎず、

テーマ

レポート

インタビュー

主要業界

の4つを中心に育成し、コンテンツ量と検索需要に応じて職種・地域・組み合わせページを段階的に追加する。
