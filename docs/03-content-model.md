# 人手不足研究所｜03 コンテンツモデル仕様書 v1.0
**文書名:** 03-content-model.md
**対象サイト:** 人手不足研究所
**位置づけ:** 00 基本設計書、01 情報設計書、02 サイトマップ・URL設計書の下位設計書
**目的:** 人手不足研究所で管理するコンテンツ、人物、企業、分類、CTA、出典等のデータ構造を定義し、Claude Codeによる実装・記事追加・更新を一貫したルールで行えるようにする。判断をClaude Codeの裁量に委ねず、型とvalidationで担保することを基本方針とする。

# 1. 本設計書の目的
人手不足研究所では、単なる記事メディアではなく、

- 解説記事
- 独自調査・レポート
- 企業・専門家インタビュー
- 企業情報
- 著者・監修者情報
- 公的統計・参考資料
- レポートダウンロード
- 問い合わせCTA
- 業界・職種・地域・テーマ等の分類

を統合して管理する。

そのため、記事本文をMarkdown/MDXで管理するだけではなく、**コンテンツとそれに紐づく構造化データを明確に分離して設計する。**

# 2. 基本方針
## 2-1. 初期の主要コンテンツモデル
初期リリースでは以下の3モデルを主要コンテンツとする。

### Article
解説・ニュース・事例等の通常記事。

### Report
独自調査・統計分析・アンケート・市場調査等。

### Interview
企業・経営者・従業員・支援会社・専門家等へのインタビュー。

将来的に必要であれば、

- CaseStudy
- Database
- Tool
- Guide

等を独立モデル化できる構造とする。

# 3. 共通コンテンツモデル
Article / Report / Interviewは共通して以下を持つ。

id:

title:

slug:

description:

status:

publishedAt:

updatedAt:

primaryTheme:

themes:

industries:

jobs:

areas:

tags:

authors:

editors:

reviewers:

eyecatch:

featured:

relatedContent:

cta:

seo:

# 4. コンテンツID
各コンテンツにはslugとは別に内部IDを持たせる。

例：

id: cnt_202608001

## 目的
- slug変更時にも内部参照を維持する
- 関連記事指定
- CTA関連付け
- 将来的なCMS移行
- API利用
- DB移行

等を容易にする。

slugではなくIDを内部参照に使用することを基本とする。

# 5. title
ユーザー向けのページタイトル。

例：

title: 建設業は本当に人手不足なのか？20年前と比較

H1として利用する。

SEOタイトルは必要に応じて別フィールドで上書き可能とする。

# 6. slug
URL生成に利用する。

例：

slug: construction-labor-shortage

命名ルール：

- 英小文字
- kebab-case
- 原則英語
- 短くする
- 公開後は原則変更しない

# 7. description
コンテンツの概要。

用途：

- 記事一覧
- OGP
- meta descriptionの初期値
- 関連記事
- 検索結果
- AI向け文脈提供

例：

description: 建設投資額と就業者数・建設技能者数の20年間の推移から、建設業の人手不足の実態を分析します。

# 8. status
公開状態。

初期値候補：

draft

review

published

archived

## 定義
### draft
執筆中。公開しない。

### review
編集・確認待ち。公開しない。

### published
公開対象。

### archived
過去コンテンツ。原則一覧等から除外するが、URL維持の必要がある場合はページを残す。

# 9. 公開日・更新日
publishedAt: 2026-08-12

updatedAt: 2026-08-12

ページ上に明示できる構造とする。

# 10. コンテンツライフサイクル
必要に応じて以下を設定できる。

lifecycle: evergreen

候補：

evergreen

annual

news

temporary

## evergreen
継続的に更新する恒久記事。

## annual
年次レポート等。

## news
時事性の高い記事。

## temporary
期間限定施策等。

初期リリースでは任意フィールドとする。

# 11. primaryTheme
02で定義したURL生成に使用する主要テーマ。

primaryTheme: recruiting

候補：

recruiting

organization

dx

management

通常記事では必須。

Report / InterviewはURL生成には利用しないが、主要テーマとして保持する。

# 12. themes
複数テーマを指定可能。

themes:

  - recruiting

  - organization

primaryThemeは必ずthemes内にも含める。

validationで確認する。

# 13. industries
業界属性。

例：

industries:

  - construction

複数付与可能。

業界横断記事の場合：

industries:

  - construction

  - logistics

  - nursing-care

# 14. jobs
職種属性。

例：

jobs:

  - construction-worker

  - site-manager

該当職種がない場合は空配列可。

jobs: []

# 15. areas
地域属性。

例：

areas:

  - nationwide

または、

areas:

  - hokuriku

  - toyama

  - ishikawa

  - fukui

地域親子関係の自動推論仕様は別途実装判断とする。

# 16. tags
細かな補助属性。

tags:

  - labor-shortage

  - recruitment-cost

  - young-workers

タグは自由入力禁止。

Taxonomy Masterから選択する。

# 17. featured
TOP等で特集表示するか。

featured: true

初期値：

featured: false

# 18. eyecatch
アイキャッチ画像。

eyecatch:

  src: /images/articles/construction-labor-shortage.webp

  alt: 建設現場で働く技能者と建設業の人手不足を示すイメージ

  caption:

  credit:

## 必須
- src
- alt

## 任意
- caption
- credit

# 19. 人物モデル People
著者・編集者・監修者・インタビュー対象者等を共通人物マスターとして管理する。

保存先例：

/data/people/

人物データ例：

id: person_naoto-matsushima

name: 松嶋直人

slug: naoto-matsushima

role:

  - author

  - editor

position:

organization:

profile:

image:

website:

social:

# 20. authors
本文を執筆した人物。

authors:

  - person_naoto-matsushima

複数指定可能。

# 21. editors
編集担当者。

editors:

  - person_naoto-matsushima

省略可。

# 22. reviewers
専門的な監修・レビューを行った人物。

reviewers:

  - person_example-expert

省略可。

# 23. 執筆・編集・監修表示
ページ末尾に共通UIとして自動生成する。

例：

執筆

松嶋直人

編集

人手不足研究所編集部

監修

○○ ○○

表示対象が存在する項目のみ出力する。

# 24. 著者ページ
将来的に、

/authors/{slug}/

を生成可能な設計とする。

著者ページには、

- 氏名
- 経歴
- 専門領域
- 執筆記事
- 監修記事

等を表示可能とする。

初期公開は必須としないが、データ構造は対応する。

# 25. 出典モデル Source
人手不足研究所では、参考資料・公的統計・論文・企業資料等を可能な限り構造化して管理する。

本文内リンクだけに依存しない。

記事frontmatterでは以下を保持する。

sources:

  - source_mlit_construction_2025

  - source_statistics_labor_2025

出典詳細はSource Masterに持つ。

# 26. Source Master
例：

id: source_mlit_construction_2025

title: 建設業を巡る現状と課題

publisher: 国土交通省

url: https://example.com/

publishedAt: 2025-06-01

accessedAt: 2026-08-12

sourceType: government

sourceType候補：

government

academic

industry

company

media

survey

other

# 27. 参考資料・出典の自動生成
記事末尾に、

## 参考資料・出典
を自動表示する。

表示例：

国土交通省「建設業を巡る現状と課題」

総務省「労働力調査」

厚生労働省「一般職業紹介状況」

タイトルから元資料へリンクする。

# 28. 本文内引用との関係
本文中の引用・出典表記は必要箇所に個別に行う。

末尾のSourcesは、

- 使用した資料の一覧
- 参照元の透明性
- 更新時の確認

を目的とする。

本文内注記を完全に代替するものではない。

# 29. 更新履歴
必要な記事のみ、更新内容を管理できる。

revisions:

  - date: 2027-06-01

    note: 建設技能者数を2026年統計に更新

初期は任意。

ページ上では、

## 更新履歴
として末尾付近に自動表示可能とする。

# 30. Articleモデル
通常記事。

保存先例：

/content/articles/

frontmatter例：

id: cnt_202608001

title: 建設業は本当に人手不足なのか？20年前と比較

slug: construction-labor-shortage

description: 建設投資額と建設就業者数の推移から建設業の人手不足を分析します。

contentType: article

articleType: analysis

status: published

publishedAt: 2026-08-12

updatedAt: 2026-08-12

primaryTheme: recruiting

themes:

  - recruiting

industries:

  - construction

jobs:

  - construction-worker

areas:

  - nationwide

tags:

  - labor-shortage

authors:

  - person_naoto-matsushima

sources:

  - source_mlit_example

relatedContent: []

cta:

  - cta_construction-report

featured: false

# 31. Article Type
Article内の細分類。

候補：

analysis

guide

news

case

opinion

## analysis
データ・情報を分析する記事。

## guide
実務ノウハウ・HowTo。

## news
ニュース・動向。

## case
事例。

## opinion
編集部・専門家による論考。

# 32. Reportモデル
人手不足研究所の中心的コンテンツ。

保存先例：

/content/reports/

Reportは通常記事よりも調査情報を厚く保持する。

# 33. Report共通例
id: report_202608001

title: 建設業人手不足レポート2026

slug: construction-labor-shortage-2026

description: 建設業の人手不足について、統計データと現場職インタビューから分析したレポートです。

contentType: report

status: published

publishedAt: 2026-08-12

updatedAt: 2026-08-12

primaryTheme: recruiting

themes:

  - recruiting

  - organization

industries:

  - construction

jobs:

  - construction-worker

areas:

  - nationwide

tags:

  - labor-shortage

  - recruitment-market

authors:

  - person_naoto-matsushima

research:

  year: 2026

  types:

    - statistical-analysis

    - interview-research

  period:

    start:

    end:

  targetPopulation:

  sampleSize:

  methodology:

  notes:

download:

  enabled: true

  assetId: asset_construction_report_2026

  formId: form_report_download

sources:

  - source_example

relatedContent:

  - cnt_202608001

cta:

  - cta_report-download

# 34. researchType
Reportの調査方法。

候補：

statistical-analysis

survey

interview-research

market-research

case-analysis

mixed-method

複数指定可。

# 35. research.period
調査実施期間。

period:

  start: 2026-05-01

  end: 2026-06-30

公的統計分析だけで実施期間が存在しない場合は省略可。

# 36. research.targetPopulation
調査対象。

例：

targetPopulation: 建設現場で勤務経験のある20〜40代男性

# 37. sampleSize
回答者数・対象数。

sampleSize: 9

定量調査以外で不適切な場合は省略。

# 38. methodology
調査方法概要。

methodology: オンラインインタビューおよび公開統計の分析

# 39. Reportページの自動表示
frontmatterから以下を自動表示できるようにする。

## 調査概要
- 調査名称
- 調査期間
- 調査対象
- サンプル数
- 調査方法
- 調査主体

入力済み項目のみ表示する。

# 40. Reportダウンロードモデル
Report本文とファイル・フォームを分離する。

download:

  enabled: true

  assetId: asset_report_001

  formId: form_report_001

# 41. Download Asset Master
例：

id: asset_report_001

type: pdf

title: 建設業人手不足レポート2026

file:

status: active

将来的にVercel Blob等へ移行可能な構造にする。

# 42. Form Master
フォーム実装と記事を密結合させない。

例：

id: form_report_001

type: report-download

provider: internal

status: active

フォームサービスやCRM変更時もコンテンツデータ側への影響を抑える。

# 43. Interviewモデル
保存先例：

/content/interviews/

インタビューでは人物と企業を本文と分離して構造化する。

# 44. Interview例
id: interview_202608001

title: ○○建設に聞く、若手採用と定着の取り組み

slug: example-construction-company

description:

contentType: interview

status: published

publishedAt: 2026-08-12

updatedAt: 2026-08-12

primaryTheme: recruiting

themes:

  - recruiting

  - organization

  - dx

industries:

  - construction

jobs:

  - construction-worker

areas:

  - hokuriku

tags:

  - young-workers

  - employee-retention

authors:

  - person_naoto-matsushima

interview:

  conductedAt: 2026-07-20

  interviewees:

    - person_example-president

  companies:

    - company_example

relatedContent: []

cta:

  - cta_interview-request

# 45. intervieweeType
人物側に属性を持たせる。

候補：

executive

hr

employee

recruitment-support

hr-consultant

it-vendor

expert

other

複数ロールも許可する。

# 46. Company Master
企業情報は各記事frontmatterへ直接ベタ書きせず、Company Masterとして管理する。

保存先例：

/data/companies/

企業データ例：

id: company_example

name: 株式会社○○

slug: example-company

description: 北陸エリアを中心に建設工事を行う企業。

industry:

  - construction

location:

  prefecture: ishikawa

  city:

website:

  url: https://example.com/

  status: active

recruitment:

  page:

    url:

    status: active

  jobLinks:

    - label: Indeed

      url:

      status: active

    - label: 採用サイト

      url:

      status: active

logo:

# 47. Company紹介ブロック
Interview記事ではCompany Masterから企業紹介を自動生成する。

例：

## 取材企業
**株式会社○○**

北陸を中心に建設工事を行う企業。

- 公式サイト
- 採用ページ
- 募集中の求人

リンクが存在するものだけ表示する。

# 48. 企業紹介リンク
企業紹介では以下のリンクを扱う。

### 公式サイト
website:

### 採用ページ
recruitment.page:

### 求人媒体
recruitment.jobLinks:

候補：

- Indeed
- 求人ボックス
- Wantedly
- Airワーク
- 採用サイト
- ハローワーク等

# 49. リンク状態管理
採用リンク等は終了する可能性があるため、

status: active

を持たせる。

候補：

active

inactive

unknown

inactiveの場合は原則表示しない。

リンク切れを防ぐため、将来的に定期チェック可能な構造にする。

# 50. Company Masterの目的
Company情報を本文と分離することで、

- 採用URL変更
- 公式サイト変更
- 求人終了
- 企業説明変更

が起きてもInterview本文を編集せず更新できるようにする。

複数インタビューで同じ企業が登場しても一元管理できる。

# 51. 関連コンテンツ
関連記事は、

**手動指定 + 自動補完**

方式とする。

frontmatter：

relatedContent:

  - cnt_202608002

  - report_202608001

指定されたコンテンツを優先表示する。

不足分は分類一致度から自動生成する。

# 52. 自動関連記事ロジック
優先評価候補：

- 同一primaryTheme
- 同一industry
- 同一job
- 同一area
- 同一tag
- 関連Report
- 同一contentType

実際のスコアリングは08技術設計書等で定義する。

# 53. CTAモデル
CTA本文を各記事に直接書かず、CTA Masterを使用する。

保存先：

/data/ctas/

例：

id: cta_construction-report

type: report-download

title: 建設現場職の採用について詳しく知る

description: 調査結果をまとめたレポートを無料でダウンロードできます。

label: レポートをダウンロード

target:

  type: report

  id: report_202608001

status: active

# 54. CTA Type
候補：

report-download

contact

consultation

interview-request

newsletter

external

# 55. CTAの複数指定
1記事に複数CTAを指定可能とする。

cta:

  - cta_construction-report

  - cta_contact

表示位置はテンプレート側で制御する。

# 56. CTA自動補完
手動指定がない場合、primaryThemeやindustryに応じてデフォルトCTAを表示可能とする。

例：

建設 × 採用

→ 建設業人手不足レポート

DX

→ 業務改善相談

ただし初期は過剰な自動化を避けてもよい。

# 57. Taxonomy Master
01で定義した以下をマスター化する。

Theme

Industry

Job

Area

Tag

保存先例：

/data/taxonomies/

# 58. Theme Master
例：

id: recruiting

label: 採用・人材確保

shortLabel: 採用

brandLabel: 採る

description:

url: /recruiting/

# 59. Industry Master
id: construction

label: 建設

description:

status: active

## status

業界マスターには `status` を持たせる。

| 値 | 意味 |
| --- | --- |
| active | コンテンツで使用可。業界ハブの公開候補 |
| planned | 将来対象。フォームの選択肢には出すが、コンテンツ側では使用不可 |

初期の `active` は建設のみ。介護・物流・製造・宿泊は `planned` として定義し、コンテンツが蓄積した時点で `active` へ変更する。

07で定義するフォームの業界選択肢は、`active` と `planned` の両方から生成する。業界マスターを二重管理しない。

## 業界横断コンテンツ

複数業界にまたがるコンテンツのために、以下を定義する。

id: cross-industry

label: 業界横断

status: active

`cross-industry` と個別業界IDを同時に付与しない。どちらかにする。

# 60. Job Master
id: construction-worker

label: 現場作業員

relatedIndustries:

  - construction

固定親子関係ではなく、関連情報として保持する。

# 61. Area Master
id: hokuriku

label: 北陸

type: region

parent:

都道府県の場合：

id: toyama

label: 富山県

type: prefecture

parent: hokuriku

# 62. Tag Master
id: labor-shortage

label: 人手不足

description:

# 63. taxonomy validation
コンテンツ内で使用するIDは必ずマスターに存在しなければならない。

存在しない値があればビルド時にエラーまたは警告を出す。

これによりClaude Codeが場当たり的なタグを新規作成しても、ビルド段階で必ず検出される状態にする。

# 64. 新規taxonomy追加手順
新しい分類を追加する際は、

- 既存値で代替できないか確認
- 今後複数利用するか確認
- ID決定
- 日本語label決定
- マスター追加
- 必要に応じて説明文追加
- コンテンツから参照

の順とする。

# 65. SEOモデル
各コンテンツにSEO overrideを持たせる。

seo:

  title:

  description:

  canonical:

  noindex: false

未指定時は共通ロジックで自動生成する。

# 66. SEO title
未指定の場合：

{title}｜人手不足研究所

等をベースに自動生成。

詳細ルールは04 SEO・AIO設計書で定義。

# 67. noindex
通常はfalse。

seo:

  noindex: false

記事単位で特別な事情がある場合のみtrueを許可。

# 68. 構造化データとの連携
03のデータから04で以下を生成する。

### Article
Articleモデル

### Report
Article / Dataset等を内容に応じて利用

### Interview
Article

### People
Person

### Company
Organization

### 全ページ
BreadcrumbList等

# 69. MDX管理
初期段階では本文をMDXで管理する。

構造：

/content/

  articles/

  reports/

  interviews/

# 70. マスターデータ
/data/

  people/

  companies/

  ctas/

  sources/

  taxonomies/

  assets/

  forms/

本文と共通データを分離する。

# 71. frontmatterの入力負荷
記事公開時の入力負荷を抑えるため、項目を3段階に分ける。

## 必須
id

title

slug

description

contentType

status

publishedAt

updatedAt

primaryTheme

themes

industries

authors

# 72. 通常入力
jobs

areas

tags

eyecatch

relatedContent

cta

# 73. 必要時のみ
editors

reviewers

sources

revisions

seo override

lifecycle

featured

research

download

interview

# 74. 記事末尾の自動生成
可能な限りfrontmatter・masterデータから以下を自動描画する。

通常記事：

関連記事

CTA

執筆・編集・監修

参考資料・出典

更新履歴

Interview：

関連記事

取材企業情報

企業公式サイト

採用ページ・求人リンク

CTA

執筆・編集

Report：

調査概要

関連コンテンツ

ダウンロードCTA

執筆・編集・監修

参考資料・出典

更新履歴

# 75. 本文とメタ情報の分離
MDX本文には、

- 記事本文
- 見出し
- 図表
- インラインリンク

を中心に記述する。

以下は本文に直接書かず自動生成を優先する。

- 著者プロフィール
- 企業紹介
- CTA
- 参考資料一覧
- 更新履歴
- 関連記事

これにより表示形式をサイト全体で統一する。

# 76. 画像・図表
本文画像では最低限、

src

alt

caption

source

を扱えるようにする。

統計グラフでは出典表示を推奨する。

# 77. Asset Master
PDFや共通画像等はAsset Masterで管理可能とする。

例：

id: asset_report_001

type: pdf

title:

path:

status: active

# 78. データ更新の考え方
企業情報、CTA、人物情報等は記事本文とは別に更新する。

例えば採用ページURL変更時は、

Company Masterのみ更新

とし、過去Interview記事を個別修正しない。

# 79. Claude Code記事作成時のルール
新規コンテンツの追加は、その都度手順を説明せずに済むよう、スキルとして固定する。

配置先：

- `.claude/skills/add-article/SKILL.md`
- `.claude/skills/add-report/SKILL.md`
- `.claude/skills/add-interview/SKILL.md`

いずれも `disable-model-invocation: true` を設定し、人間が `/add-article` のように明示的に呼び出したときだけ実行されるようにする。Claude Codeが会話の流れで勝手にコンテンツを追加する状態にしない。

各スキルが実行する基本フローは以下とする。

- 既存Taxonomy Masterを確認
- Content IDを発行
- 適切なContent Modelを選択
- frontmatter作成
- MDX本文作成
- sources登録
- relatedContent候補設定
- CTA設定
- validation
- draft状態で保存

を基本フローとする。

# 80. Claude Codeがしてはいけないこと
以下は `.claude/rules/content.md` に禁止事項として記述する。ただしルールは指示であって強制ではないため、validationで機械的に落とせるものはvalidation側にも実装する。

- 未定義タグを勝手に追加する
- Company情報をInterview本文へ重複記載する
- URLを既存分類変更に合わせて勝手に変更する
- 著者・監修者を本文中だけで管理する
- PDF URLを本文に直書きする
- CTA文言を記事ごとにコピーして増殖させる
- 出典を本文末尾へ手入力だけで管理する
- draft記事を自動公開する

このうち「未定義タグ」「参照IDの不在」「必須項目の欠落」は81のvalidationで検出できる。「本文への重複記載」「CTA文言のコピー」はvalidationで検出できないため、レビュー時の確認項目として扱う。

# 81. validation
ビルド前またはCIで以下をチェックする。

### 必須項目
不足していないか。

### ID重複
Content / People / Company / Source等でIDが重複していないか。

### Taxonomy
使用IDが存在するか。

### primaryTheme
themes内に含まれるか。

### relatedContent
参照IDが存在するか。

### Company
Interviewで参照する企業IDが存在するか。

### Sources
source IDが存在するか。

# 82. URL生成ロジック
Article：

/{primaryTheme}/{slug}/

Report：

/reports/{slug}/

Interview：

/interviews/{slug}/

03側では必要フィールドだけ定義し、詳細URL方針は02に従う。

# 83. 初期Articleテンプレート
---

id:

title:

slug:

description:

contentType: article

articleType: analysis

status: draft

publishedAt:

updatedAt:

primaryTheme:

themes: []

industries: []

jobs: []

areas:

  - nationwide

tags: []

authors: []

eyecatch:

sources: []

relatedContent: []

cta: []

featured: false

seo:

  title:

  description:

  canonical:

  noindex: false

---

# 84. 初期Reportテンプレート
---

id:

title:

slug:

description:

contentType: report

status: draft

publishedAt:

updatedAt:

primaryTheme:

themes: []

industries: []

jobs: []

areas:

  - nationwide

tags: []

authors: []

eyecatch:

research:

  year:

  types: []

  period:

    start:

    end:

  targetPopulation:

  sampleSize:

  methodology:

  notes:

download:

  enabled: false

  assetId:

  formId:

sources: []

relatedContent: []

cta: []

featured: false

seo:

  title:

  description:

  canonical:

  noindex: false

---

# 85. 初期Interviewテンプレート
---

id:

title:

slug:

description:

contentType: interview

status: draft

publishedAt:

updatedAt:

primaryTheme:

themes: []

industries: []

jobs: []

areas: []

tags: []

authors: []

eyecatch:

interview:

  conductedAt:

  interviewees: []

  companies: []

sources: []

relatedContent: []

cta: []

featured: false

seo:

  title:

  description:

  canonical:

  noindex: false

---

# 86. データモデルの将来拡張
将来的に以下を追加可能とする。

### Service
提供サービス。

### CaseStudy
支援実績。

### Tool
採用単価計算等のツール。

### Dataset
独自データセット。

### Event
セミナー等。

### Newsletter
メール配信。

既存Article等へ無理に詰め込まない。

# 87. CMS移行への対応
初期はMDX + Master Dataで運用する。

将来Headless CMSを導入する場合も、

Article

Report

Interview

Person

Company

Source

CTA

Taxonomy

というモデルをそのままCMS Collectionへ移行できる構造を目指す。

# 88. 検索機能との連携
03で定義した以下の属性を、将来のコンテンツ検索・絞り込みに利用する。

title

description

themes

industries

jobs

areas

tags

contentType

company

検索結果URLのSEO方針は02に従う。

# 89. AIOへの対応思想
AI検索・生成AIによる引用を意識し、

特にReportで、

- 調査主体
- 調査方法
- 対象
- サンプル数
- 調査期間
- 公開日
- 更新日
- 出典

を明示できる構造とする。

またArticleでも、

- 執筆者
- 監修者
- 出典
- 更新日

を構造化する。

# 90. Interviewの価値設計
Interviewは単なる読み物ではなく、

### 読者にとって
一次情報・具体例。

### 取材企業にとって
企業紹介・採用導線・求人導線。

### 人手不足研究所にとって
関係構築・一次情報・専門性。

の3者に価値がある構造とする。

そのためCompany Masterと採用リンクを重要要素として扱う。

# 91. 企業リンクの表示原則
Interviewでは、取材先企業が希望する場合、以下を積極的に掲載可能とする。

- 企業公式サイト
- 採用サイト
- 募集ページ
- 求人媒体
- サービスページ
- SNS

ただし、読者にとって関連性のあるリンクに限定する。

# 92. リンク切れ対応
Company Master内のリンクにstatusを持たせることで、求人終了等に対応する。

将来的には定期リンクチェックを自動化可能とする。

# 93. Reportと企業取材の関連
Reportが企業インタビューを含む場合、

relatedContent:

で該当Interviewを紐づける。

Reportページから、

調査協力企業・関連インタビュー

等を表示可能にする。

# 94. 人手不足研究所編集部
個人だけでなく編集部を著者・編集者として扱えるよう、Peopleとは別にOrganization的なContributorを許可してもよい。

初期ではPerson Master内に、

id: editorial-team

name: 人手不足研究所編集部

として簡易対応可能とする。

将来的にContributorモデルへ分離可能。

# 95. 設計上の優先順位
本設計では、

- 運用しやすさ
- 検索・分類しやすさ
- SEO/AIOへの利用
- 将来のCMS移行
- Claude Codeとの相性（型・validation・ファイル分離によって自動生成の誤りが検出できること）

を優先する。

過剰なデータベース設計は避ける。

# 96. 本設計の最重要ルール
### ルール1
本文と共通データを分離する。

### ルール2
著者・企業・出典・CTAはMaster化する。

### ルール3
分類はTaxonomy Masterから選ぶ。

### ルール4
Reportは調査情報を厚く持つ。

### ルール5
Interviewは企業情報・採用導線を構造化する。

### ルール6
記事末尾の共通情報は自動生成する。

### ルール7
新しい分類はマスター更新を経由させ、validationで未定義値を弾く。

# 97. 初期実装対象
Phase 1では最低限以下を実装する。

### Content
- Article
- Report
- Interview

### Master
- People
- Company
- Source
- CTA
- Theme
- Industry
- Job
- Area
- Tag

### 共通機能
- validation
- URL生成
- 著者表示
- 出典自動表示
- Company紹介自動表示
- 関連記事
- CTA表示

# 98. 初期実装で後回し可能なもの
- revisionHistory UI
- 高度なCTA自動判定
- 求人リンク自動死活監視
- 高度な全文検索
- Dataset専用モデル
- Contributor独立モデル
- CMS
- API
- DB
- 高度なレコメンド

データ構造のみ将来拡張可能にしておく。

# 99. 次の設計書との関係
## 04 SEO・AIO設計書
本モデルを利用して、

- metadata
- 構造化データ
- 著者情報
- 出典
- Reportの引用性
- 内部リンク
- sitemap

を定義する。

## 05 ページテンプレート設計書
本モデルを利用して、

- Article
- Report
- Interview
- Company紹介
- Author
- CTA

のUIを定義する。

## 08 技術設計書
- Zod等によるvalidation
- MDX loader
- master参照
- relatedContents
- build
- search index

等を実装仕様化する。

# 100. 本設計の完成イメージ
例えば北陸の建設会社を取材し、

「若手採用」
「人材定着」
「Excel業務改善」

について話を聞いた場合、

Interview本文は1つでも、

themes:

  - recruiting

  - organization

  - dx

industries:

  - construction

jobs:

  - construction-worker

areas:

  - hokuriku

interview:

  companies:

    - company_example

  interviewees:

    - person_example-president

として管理する。

Company Masterには、

公式サイト

採用ページ

求人媒体

企業紹介

を保持する。

記事末尾では、

取材企業紹介

関連レポート

関連記事

採用ページ

執筆者

等が自動生成される。

これにより、コンテンツ制作・SEO・取材営業・企業紹介・将来のサービス受注を一つの情報基盤上で接続する。

# 101. 結論
人手不足研究所では、コンテンツを単なる「記事ファイル」として管理しない。

**記事・調査・企業・人物・出典・CTA・分類を相互に関連付けた情報資産**として管理する。

初期はMDX中心の軽量な運用としながら、

- メディアの成長
- 記事数増加
- 独自調査の蓄積
- インタビュー企業増加
- CMS導入
- データベース化

へ無理なく発展できる構造を採用する。
