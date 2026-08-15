# 人手不足研究所｜09 実装ロードマップ・Claude Code開発運用設計書 v1.1
**文書名:** 09-implementation-claude-code.md
**対象サイト:** 人手不足研究所
**位置づけ:** 01〜08で定義した情報設計、URL、コンテンツモデル、SEO/AIO、ページテンプレート、ブランド/UI、CV/Lead、技術設計を、実際の開発・確認・公開手順へ落とし込む設計書
**目的:** Claude Codeを活用しながら、人手不足研究所を過剰実装せず、安全かつ段階的に構築し、設計書と実装の乖離を防ぐ。

# 1. 本設計書の目的
本設計書では、

**何を作るか**

ではなく、

**どの順番で、どの単位で、どこまで作り、どこで確認するか**

を定義する。

Claude Codeへサイト全体を一括で実装させることは避ける。

各フェーズごとに、

設計確認

↓

実装

↓

Validation

↓

Preview

↓

人間確認

↓

次フェーズ

という流れを基本とする。

# 2. 実装の最上位原則
### 原則1
**一度にサイト全体を作らない。**

### 原則2
**実データで早期検証する。**

### 原則3
**設計書を実装のSingle Source of Truthとする。**

### 原則4
**Claude Codeに設計判断を勝手に変更させない。**

### 原則5
**各PhaseにAcceptance Criteriaを設ける。**

### 原則6
**Preview確認を挟んでからProductionへ反映する。**

### 原則7
**MVPと将来仕様を明確に分離する。**

# 3. MVPの定義
初回公開では、01〜08の全仕様を完全実装することを目的としない。

MVPでは、

**建設業を中心とした、人手不足研究所として成立する最小限のメディア**

を完成させる。

# 4. MVPで必須のページ
初回公開時に最低限以下を実装する。

TOP

4 Theme Hub

建設 Industry Hub

Article

Report

Interview

Report List

Interview List

About

Contact

Interview Request

Service Lead

Privacy

Thank You

# 5. MVPで必須の機能
MDX Content

Taxonomy

Master Data

関連記事

Author

Source

Company Profile

CTA

Report DL

4種Form

Lead保存

Email通知

SEO Metadata

Structured Data

Sitemap

robots

GA4

Search Console

Vercel Deploy

# 6. MVPで後回しにするもの
以下は初回公開必須ではない。

全文検索

職種Hub

地域Hub

業界×テーマHub

CRM

Lead Scoring

Company Enrichment

Marketing Automation

AI Search

Recommendation

CMS

Author詳細ページ

高度なDashboard

# 7. 実装フェーズ全体
以下の順序で実装する。

Phase 0

Repository / Docs準備

Phase 1

技術基盤・Content Model

Phase 2

Design System・共通UI

Phase 3

Article Vertical Slice

Phase 4

TOP / Theme / Industry Hub

Phase 5

Report / Interview

Phase 6

Form / Lead DB / Email

Phase 7

SEO / Analytics

Phase 8

初期Content投入

Phase 9

QA / Launch

# 8. Phase 0｜Repository・設計書準備
目的：

Claude Codeが開発を開始できる共通基盤を作る。

# 9. Phase 0 成果物
GitHub Repository

README

/docs

CLAUDE.md

.claude/rules/

.claude/skills/

.claude/settings.json

.gitignore

Environment Template

基本Branch構成

Claude Codeの設定は後回しにしない。Phase 1以降の全作業がこの設定の上で走るため、設定が無いまま実装を始めると、同じ前提を毎回口頭で渡す状態になる。詳細は67で定義する。

# 10. 設計書配置
Repository内：

/docs

  00-basic-design.md

  01-information-architecture.md

  02-sitemap-url.md

  03-content-model.md

  04-seo-aio.md

  05-page-template.md

  06-brand-ui.md

  07-conversion-lead.md

  08-technical-architecture.md

  09-implementation-claude-code.md

  10-launch-interview-plan.md

  11-open-issues.md

ファイル名は実際に確定した名称へ統一する。

11-open-issues.mdには、設計書間で未確定・不整合となっている論点を集約する。Claude Codeが設計書を読んだ際に、どこが確定済みでどこが未決かを判別できる状態にする。

# 11. Phase 0 Acceptance Criteria
- Repositoryが存在する
- /docsに設計書が配置されている
- READMEから設計書へ辿れる
- CLAUDE.mdが存在し、`/context` でMemory filesとして読み込まれることを確認済み
- .claude/settings.jsonにdenyルールが設定されている
- mainがProduction branchとして設定されている
- Vercel接続前でもローカル開発を開始できる

# 12. Phase 1｜技術基盤・Content Model
実装対象：

Next.js

TypeScript

App Router

Tailwind

MDX

Zod

Content Loader

Taxonomy Master

Content Schema

# 13. Phase 1ではUIを作り込みすぎない
このフェーズでは、

「Articleが読み込める」

ところまでを重視する。

TOPやReportの完成デザインには着手しない。

# 14. Phase 1 成果物
/content

/data

/lib/content

/lib/validation

/components/mdx

等の基本構造。

# 15. Article Schema実装
03に基づき、

Article

Report

Interview

のSchemaを定義する。

ただしPhase 1ではまずArticleが正常に読み込めることを最優先する。

# 16. Taxonomy実装
最低限：

Theme

Industry

Job

Area

Tag

をMasterとして定義する。

存在しないIDが使用された場合にValidationされるようにする。

# 17. Phase 1 Acceptance Criteria
- npm run build成功
- TypeScript errorなし
- Article MDXが読み込める
- frontmatter validationが動く
- slug重複を検出できる
- Taxonomy validationが動く
- DraftがProduction対象にならない

# 18. Phase 2｜Design System・共通UI
06に基づき実装する。

# 19. Phase 2 実装対象
Color Token

Typography

Spacing

Radius

Container

Button

Card

Breadcrumb

Header

Footer

# 20. Font
Zen Maru Gothic

Noto Sans JP

を設計書通り実装する。

# 21. UI確認用ページ
この段階で簡易Style Guideページを作ってもよい。

例：

/dev/ui

Productionでは非公開。

表示候補：

Typography

Color

Button

Card

Stat

Quote

CTA

# 22. Phase 2 Acceptance Criteria
- 06のColor Tokenが一元管理される
- Fontが正しく読み込まれる
- PC/MobileでTypography確認済み
- Primary/Secondary Buttonが存在する
- Header/Footerが成立する
- 重大なAccessibility問題がない

# 23. Phase 3｜Article Vertical Slice
非常に重要なPhase。

ここでは、

**実際の記事1本を完全に仕上げる。**

# 24. Vertical Sliceの意味
一つのArticleを使って、

Content Model

↓

URL

↓

UI

↓

SEO

↓

Source

↓

Author

↓

Related Content

↓

CTA

↓

Mobile

まで縦に通す。

# 25. 使用するArticle
ダミー原稿ではなく、既存の建設業人手不足Article等、実際に公開予定のコンテンツを利用する。

# 26. Article実装対象
Breadcrumb

Category

H1

Description

Date

Author

Eyecatch

TOC

MDX Body

H2/H3

Table

Image

Chart

Key Finding

CTA

Related Content

Author

Sources

Revision

# 27. Article SEO
このPhaseで最低限、

title

description

canonical

Article JSON-LD

BreadcrumbList

OGP

まで確認する。

# 28. Article Mobile確認
必須。

特に、

長いH1

Table

Chart

TOC

CTA

Source

を確認する。

# 29. Phase 3 Acceptance Criteria
- 実記事が正常表示
- Desktop / Mobile確認
- H1/H2/H3正常
- Source自動表示
- Author自動表示
- 関連コンテンツ表示
- CTA表示
- Metadata正常
- JSON-LD正常
- Build成功

ここを満たすまで次の主要ページへ広げない。

# 30. Phase 4｜TOP / Theme / Industry Hub
Articleで確立したDesign SystemをもとにHubを実装する。

# 31. Phase 4 実装対象
TOP

/recruiting/

/organization/

/dx/

/management/

/industries/construction/

# 32. TOP
05の構成：

Hero

Featured Report

Theme

Industry

Research

Interview

Brand Philosophy

Latest Article

About

を基本とする。

# 33. Theme Hub
固定Editorial Contentと自動Content Feedを組み合わせる。

# 34. Industry Hub
初期は建設のみを本格実装する。

介護・物流等はデータ構造だけ保持してもよい。

# 35. Phase 4 Acceptance Criteria
- TOPが成立
- 4 Theme Hubが表示
- 建設Industry Hubが表示
- Hubが単なるArticle一覧ではない
- Report/Interview/Articleが動的取得される
- Desktop/Mobile正常
- Metadata正常

# 36. Phase 5｜Report / Interview
一次情報資産の主要テンプレートを実装する。

# 37. Report実装
対象：

Report List

Report Detail

Research Method

Key Finding

Chart

Download CTA

Related Content

Source

# 38. Reportは実データで確認する
既存の建設レポート等を利用する。

ダミーReportでは確認しない。

# 39. Interview実装
対象：

Interview List

Interview Detail

Compact Company Profile

Interviewee Profile

本文

Detail Company Profile

Website

Recruitment Page

Job Links

Related Content

Interview Request CTA

# 40. Interview実データ
可能であれば実際の取材原稿・企業情報を使う。

難しい場合は、実公開を想定した十分なサンプルデータを使用する。

# 41. Phase 5 Acceptance Criteria
### Report
- Web上で主要情報が読める
- Research Method表示
- Source表示
- DL CTA表示
- PDF未連携でもページ成立

### Interview
- Company Master連携
- 企業紹介が冒頭・末尾に表示
- 外部リンク正常
- inactive link非表示
- Mobile正常

# 42. Phase 6｜Form / Lead DB / Email
ここで初めてLead機能を接続する。

# 43. DB Migration
08で定義した、

companies

people

activities

を実装する。

# 44. 4 Forms
Report Download

Interview Request

Contact

Service Lead

を実装する。

# 45. Form共通化
Common Fieldsは共通Component/Schemaを利用する。

4Formを別々にコピー実装しない。

# 46. Report DL Flow
Report

↓

Form

↓

DB Save

↓

Email

↓

Thank You

↓

PDF

まで通す。

# 47. UTM / Source Content
Form送信時、

utm_*

landingPage

sourceContentId

reportId

等が保存されることを確認する。

# 48. Phase 6 Acceptance Criteria
- 4Form正常送信
- Server Validation
- Company作成/既存判定
- Person作成/既存判定
- Activity保存
- Email通知
- Thank You
- 二重送信防止
- Spam対策
- Production Secretがコードに存在しない

# 49. Phase 7｜SEO / Analytics
SEOはPhase 3から段階的に実装するが、このPhaseでサイト全体を仕上げる。

# 50. Phase 7 対象
Metadata

Canonical

OGP

Structured Data

sitemap

robots

GA4

Search Console

CV Events

UTM

404

Redirect

# 51. Structured Data
ページ種別ごとに確認する。

Article

BreadcrumbList

Organization

Person

Dataset必要時

# 52. Analytics Event
07のEvent仕様を実装する。

# 53. Phase 7 Acceptance Criteria
- GA4 Page View確認
- CV Event確認
- sitemap正常
- robots正常
- canonical正常
- Structured Data検証
- noindexページ正常
- 404正常
- Search Console登録可能状態

# 54. Phase 8｜初期Content投入
テンプレート完成後、初期コンテンツを本格投入する。

# 54-2. 既存記事の移行
初期コンテンツ投入と同じフェーズで、新規事業開発ノートからの記事移行を行う。

手順は 12 §6、リダイレクト仕様は 02 §42-2。

順序を守る。

1. 新サイトで公開
2. 動作確認
3. **その後に**旧サイトで301を設定
4. 旧サイトのsitemapから削除

先に旧サイトを止めると、移行期間中に到達不能な記事ができる。

移行時に本文を大幅リライトしない。同じ内容で移し、301が効いていることを確認してから改稿する。

# 55. 初期Content対象
詳細は10 初期コンテンツ計画で定義する。

最低限、

建設Article

建設Report

Interview

About

Theme固定コンテンツ

建設Industry固定コンテンツ

を投入する。

# 56. Content投入時のClaude Code利用
`/add-article` `/add-report` `/add-interview` を使う。各スキルは、

原稿

↓

Content Type判定

↓

Frontmatter

↓

Taxonomy

↓

MDX

↓

Source

↓

Internal Link

↓

Build

まで支援可能とする。

# 57. 初期Content QA
記事ごとに、

タイトル

URL

Theme

Industry

Source

Date

Image

Internal Link

CTA

Mobile

を確認する。

# 58. Phase 8 Acceptance Criteria
- 初期ContentがDraftではない
- URL重複なし
- Source確認
- 主要内部リンク成立
- Empty Sectionなし
- TOP/Hubへ正常反映
- 移行記事が新URLで表示される
- 旧URLから新URLへ301で転送される
- 旧サイトのsitemapから移行記事が削除されている
- 旧サイト内の内部リンクが新URLへ張り替えられている

# 59. Phase 9｜QA・Launch
本番公開前の最終確認。

# 60. QAカテゴリ
Functional

Content

SEO

Visual

Responsive

Performance

Accessibility

Form

Security

Analytics

# 61. Functional QA
確認：

Navigation

Internal Link

External Link

CTA

Form

Download

404

# 62. Content QA
確認：

誤字

Title

Date

Source

Company

Job Link

Author

# 63. SEO QA
確認：

title

description

canonical

index/noindex

sitemap

robots

structured data

OGP

# 64. Responsive QA
最低限：

Desktop

Tablet

Mobile

特に、

Header

Article

Table

Chart

Form

Interview

Report

を確認する。

# 65. Performance QA
Lighthouse等を参考に、

- 大画像
- JS量
- Layout Shift
- Font
- Third Party Script

を確認する。

数字だけを目的にしすぎない。

# 66. Launch条件
以下を満たした場合のみProduction公開する。

Build Success

Critical Errorなし

Form成功

Lead保存成功

Email成功

PDF成功

SEO確認

Analytics確認

Mobile確認

Privacy公開

# 67. Claude Codeの設定構成
毎回のプロンプトへ同じ前提を書くのではなく、リポジトリ側へ恒久的に持たせる。

配置は以下とする。

```
CLAUDE.md                        常時読み込み。前提・禁止事項・検証コマンド
.claude/
  rules/
    taxonomy.md                  分類の禁止事項（01由来）
    urls.md                      URL体系の禁止事項（02由来）
    content.md                   コンテンツ追加時の禁止事項（03由来）
    seo.md                       SEO/AIOの禁止事項（04由来）
    pages.md                     ページ構成の参照先（05由来）
    design.md                    Design Token（06由来。paths指定でUI作業時のみ）
    leads.md                     個人情報・Lead取扱い（07由来）
  skills/
    phase/SKILL.md               フェーズ着手時の共通手順
    add-article/SKILL.md         Article追加
    add-report/SKILL.md          Report追加
    add-interview/SKILL.md       Interview追加
    plan-article/SKILL.md        記事企画・カニバリ確認
    qa/SKILL.md                  公開前QAチェック
  settings.json                  権限設定（deny / ask）
```

役割分担は以下とする。

### CLAUDE.md

毎セッション読み込まれる。200行以内を目安とし、肥大化させない。「毎回説明し直している事実」だけを置く。設計書本文は転記せず、docs/を参照させる。

### .claude/rules/

領域ごとの制約。`paths` frontmatterを付けたルールは、該当ファイルを触ったときだけ読み込まれる。design.mdのようにUI作業時にしか要らないものはpaths指定にして、常時の文脈を圧迫させない。

### .claude/skills/

反復手順。呼び出したときだけ本文が読み込まれるため、長い手順書を置いても平時のコストがない。CLAUDE.mdに書いた手順が長くなってきたら、スキルへ移す。

### .claude/settings.json

唯一の強制力を持つ層。CLAUDE.mdとルールは文脈であり、遵守は保証されない。本番DB・Secret・pushなど「実行されたら取り返しがつかない操作」はここでdenyする。

# 68. フェーズ着手時の指示
各フェーズの着手は `/phase <番号>` で行う。スキル本体に共通手順を持たせ、プロンプトにはフェーズ番号だけを渡す。

`.claude/skills/phase/SKILL.md` の内容は以下を骨子とする。

```markdown
---
description: 実装フェーズに着手する。フェーズ番号を引数に取る。
disable-model-invocation: true
argument-hint: [フェーズ番号]
---

docs/09-implementation-claude-code.md のPhase $ARGUMENTS を読み、
参照すべき設計書（同ファイル内に記載）を確認してください。

進め方：

1. まずプランモードで実装計画を提示してください。実装はまだ行いません。
2. 計画には「今回作るもの」「今回作らないもの」「Acceptance Criteria への対応」を含めてください。
3. 承認後に実装してください。
4. 完了後に npm run typecheck / lint / validate / build を実行し、結果を報告してください。
5. Acceptance Criteria を1項目ずつ満たしたか確認してください。

設計書と実装が矛盾する場合、設計書を優先してください。
設計変更が必要と判断した場合は、実装せずに以下を報告してください。

- 問題
- 現仕様
- なぜ実装が難しいか
- 推奨変更
- 影響範囲
```

大きなフェーズはプランモード（Shift+Tab で切り替え）で計画を確認してから実装させる。計画段階で作業範囲のずれを止められるため、実装後の手戻りより安い。

# 68-2. 検証手段を必ず与える
Claude Codeは検証できる対象があるほど精度が上がる。package.jsonに以下を用意し、CLAUDE.mdへ記載する。

```
npm run typecheck    tsc --noEmit
npm run lint         eslint
npm run validate     Zodによるcontent/data検証
npm run build        next build
```

「実装したら通してから報告する」ことをCLAUDE.mdへ書く。フェーズ完了の自己申告ではなく、コマンドの結果で判断する。

必要に応じてPostToolUseフックでMDX保存時に `npm run validate` を自動実行させてもよいが、Phase 1では手動実行で足りる。

# 69. 1セッション = 1つの明確な成果物
1回のセッションで狙う成果物は一つに限定する。

コンテキストが埋まるほど指示への追従が落ちるため、フェーズをまたぐ場合はセッションを切る。長時間のセッションでは `/context` で使用状況を確認し、必要なら区切って再開する。

調査・探索など出力量が多い作業はサブエージェント（Exploreなど）へ委譲し、メインの文脈を汚さない。

# 70. 避ける指示
サイト全部作って

いい感じにして

必要なもの全部追加して

SEOも全部対応して

等の曖昧な依頼は避ける。

# 71. Claude Codeが自由に判断できる領域
以下はClaude Codeの裁量とする。毎回確認を求めない。

関数分割

ファイル分割

内部型

Utility

軽微なRefactoring

Test構造

Performance改善

ただし設計書に反しない範囲。

# 72. 設計書優先領域
以下は設計書を正とする。実装都合で変えない。

URL

Page Structure

Content Model

Taxonomy

Typography

Color

CTA

SEO方針

Lead Model

# 73. Claude Codeが独断で変更してはいけない領域
以下は人間の承認事項とする。

URL体系

主要DB Schema

Brand Color

Font

Theme分類

Industry分類

公開方針

Privacy方針

Production Secret

本番DB

このうち、指示文で守らせるもの／機構で止めるものを分ける。

| 対象 | 担保方法 |
| --- | --- |
| URL体系・Theme/Industry分類 | `.claude/rules/` ＋ validation |
| Brand Color・Font | Design Token化。直値をlintで検出 |
| DB Schema | `.claude/rules/` のpaths指定（db/schema配下） |
| Production Secret・本番DB | `.claude/settings.json` のdenyで到達不能にする |
| 公開方針（draft→published） | validationとレビュー。08の禁止事項に準拠 |

指示文だけで守らせるのは、破られても復旧可能なものに限る。

# 74. 仕様変更プロセス
実装中に設計上の問題が判明した場合、Claude Codeへ以下の報告を求める。この要求はCLAUDE.mdへ常設する。

1. 問題

2. 現仕様

3. なぜ実装が難しいか

4. 推奨変更

5. 影響範囲

# 75. 仕様変更の順番
変更を承認した場合、

設計書修正

↓

必要ならVersion更新

↓

実装変更

の順とする。

コードだけ変更しない。

# 76. 設計書Version
重大変更時は、

v1.0

v1.1

v2.0

等を必要に応じて更新する。

小さな実装上の調整で毎回Versionを上げる必要はない。

# 77. Git運用
実装単位でBranchを分ける。

例：

feature/article-template

feature/report-template

feature/lead-form

fix/mobile-table

# 78. Pull Request
重要機能ではPRを作成する。

PRには、

何を変更したか

なぜ変更したか

参照設計書

確認方法

残課題

を記載する。

# 79. Preview
UI・Form・Navigation等はVercel Previewで確認する。

# 80. main反映
Preview確認後にmainへMergeする。

可能な限り直接mainへ大規模変更を入れない。

# 81. Commit
Commitは意味のある単位に分ける。

例：

feat: add article content schema

feat: add report card

fix: improve mobile table overflow

# 82. Design Review
主要ページについて、

TOP

Article

Report

Interview

Theme

Industry

の初回実装時は人間によるVisual Reviewを必須とする。

# 83. Content Review
AI/Claude Codeが作成したContentは、人間確認後にpublishedへ変更する。

Claude Codeが原稿作成後に自動公開しない。

# 84. DB Migration Review
DB Migrationは内容を確認してからProduction適用する。

Claude CodeにProduction Migrationを独断実行させない。

# 85. Environment Review
PreviewとProductionでDB・Email・Storageを混同しない。

# 86. Bug対応
重大度を概念的に分ける。

### Critical
サイト表示不能

Form保存不能

個人情報漏洩

誤ったPDF配布

即対応。

### Major
主要UI崩れ

重要リンク切れ

SEO重大不具合

優先対応。

### Minor
Spacing

軽微な表示

まとめて対応可能。

# 87. Launch後の改善
公開を完成としない。

初期公開後、

Search Console

GA4

CV

User Feedback

Content

を見ながら改善する。

# 88. 初期1〜2か月で見ること
Index状況

検索表示

Article流入

Report DL

CTA Click

Form CVR

Mobile UX

等。

# 89. MVP後すぐに作らないもの
アクセスが少ない段階で、

AI Search

複雑なCRM

Personalization

高度なDashboard

を作らない。

# 90. 次の実装判断
機能追加は、

**実際の運用上の問題が出てから**

検討する。

例：

記事が探せない

→ Search

Git投稿がつらい

→ CMS

Lead管理が大変

→ CRM

企業調査が大変

→ Enrichment

# 91. 実装優先順位の原則
迷った場合、

Content公開

↓

検索可能性

↓

一次情報

↓

Lead取得

↓

運用効率

↓

高度機能

の順で優先する。

# 92. Claude Codeの役割
Claude Codeは、

**設計を決める主体**

ではなく、

**設計を実装し、問題を発見し、改善案を提示する開発パートナー**

として利用する。

一人運用であるため、レビュー役が不在になりやすい。重要な実装については、実装したセッションとは別に、レビュー専用のセッションまたはサブエージェントで見直させる。同一セッション内での自己レビューは、直前の判断を追認しやすい。

# 93. 人間の役割
人間側は、

Brand

Strategy

Content

Taxonomy

Editorial Judgment

Business Priority

Final Approval

を担当する。

# 94. Claude Codeの強みを活かす領域
積極的に利用する。

Boilerplate

Component

Schema

Validation

Refactor

Test

Content変換

Internal Link

Metadata

Build Error修正

# 95. Claude Codeに任せすぎない領域
ブランド戦略

検索意図

記事の一次情報

企業評価

取材内容

営業判断

Privacy判断

# 96. 初期公開時の完成像
初回公開時に、

建設を中心とした独自Article

建設Report

Interview

Theme Hub

建設Industry Hub

Lead Form

が機能し、

人手不足研究所というメディアが何を目指しているか

が伝わる状態を完成とする。

# 97. 将来業界の扱い
介護・物流・製造・宿泊等は、初期からTaxonomyとして存在してよい。

ただしコンテンツ不足の状態でHubを大量公開しない。

# 98. 09と10の関係
09：

**どう作るか**

10：

**何を入れて立ち上げるか**

とする。

# 99. 10への引き継ぎ事項
10 初期コンテンツ計画では、

- 建設Article
- Report
- Interview
- Theme固定Content
- Industry固定Content
- 公開順
- Content Cluster
- 制作優先順位
- 取材
- 調査

等を決定する。

# 100. 09最重要原則
### 原則1
**サイトを一括実装しない。**

### 原則2
**Article 1本をVertical Sliceとして最初に完成させる。**

### 原則3
**実コンテンツでUIを検証する。**

### 原則4
**PhaseごとにAcceptance Criteriaを持つ。**

### 原則5
**設計書変更後にコードを変更する。**

### 原則6
**Claude Codeへの1回の作業範囲を小さくし、検証コマンドで完了を判定する。**

### 原則7
**UI変更はPreviewで確認する。**

### 原則8
**AI生成コンテンツを自動公開しない。**

### 原則9
**MVPに不要な高度機能を作らない。**

### 原則10
**公開後の実データを見て次の開発を決める。**

# 101. 結論
人手不足研究所の開発では、

**設計を全部作ったから、一気に実装する**

という進め方を取らない。

01〜08の設計を基準に、

小さく作る

↓

実データを入れる

↓

Previewを見る

↓

問題を直す

↓

次へ広げる

という反復型で開発する。

Claude Codeには大きな裁量を無制限に与えるのではなく、

**明確な設計・明確な作業範囲・明確な完了条件・検証可能な手段**

を渡す。

そして、渡した前提が毎セッション再現されるよう、CLAUDE.md・ルール・スキル・権限設定としてリポジトリへ固定する。

これにより、

**Claude Codeによる開発速度**
と
**人手不足研究所としての一貫した設計思想**

を両立する。

初回公開の目的は機能数を増やすことではない。

**独自Article・Report・Interviewが公開でき、検索から読まれ、企業との接点が生まれる。**

まずこの状態を作ることをMVP完成とする。
