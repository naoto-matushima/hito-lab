# 人手不足研究所｜08 技術設計書 v1.0
**文書名：** 08-technical-architecture.md
**対象サイト：** 人手不足研究所
**位置づけ：** 01〜07で定義した情報構造・コンテンツ・SEO/AIO・ページ・ブランド/UI・CV/リード設計を、実際に開発・公開・運用できる技術構成へ変換する設計書
**目的：** Claude Codeによる初期開発から、その後の記事追加・レポート公開・リード蓄積・機能拡張まで、過剰な技術負債を作らず運用できる基盤を定義する。

# 1. 技術設計の基本思想
人手不足研究所は、初期段階では大規模Webサービスではない。

一方で将来的には、

- 数百〜数千記事
- 業界・テーマ別ページ
- 大量のInterview
- Report
- Company DB
- Lead DB
- 検索
- CRM
- メール配信
- AI/AIO対応

等への発展可能性がある。

そのため、

**最初は小さく、構造は正しく、後から交換できる**

ことを最重要原則とする。

# 2. 技術選定の基本方針
Phase 1では以下を基本構成とする。

Next.js

+

TypeScript

+

App Router

+

MDX

+

Zod

+

PostgreSQL系DB

+

GitHub

+

Vercel

コンテンツ管理のためだけにWordPressやHeadless CMSを導入しない。

# 3. Architecture概要
                   ┌─────────────┐

                    │   GitHub    │

                    └──────┬──────┘

                           │

                         Push

                           │

                           ▼

                    ┌─────────────┐

                    │   Vercel    │

                    └──────┬──────┘

                           │

                    Next.js App

                           │

          ┌────────────────┼────────────────┐

          │                │                │

          ▼                ▼                ▼

       MDX/Data         Lead DB         File Storage

          │                │                │

          ▼                ▼                ▼

       Content         Company/         Report PDF

                       Person/

                       Activity

# 4. Frontend Framework
**Next.js App Router**を採用する。

理由：

- SEOとの相性
- Server Rendering
- Static Generation
- Server Components
- Metadata API
- Sitemap
- robots
- Image Optimization
- Vercelとの親和性
- 将来的な動的機能追加

人手不足研究所との相性が良い。

# 5. TypeScript
全体をTypeScriptで実装する。

JavaScriptとの混在を原則避ける。

目的：

- Content Schemaの安全性
- Component Propsの安全性
- Master Dataの整合性
- 将来的な開発者追加
- Claude Codeによるコード生成の正確性向上（型が仕様書として機能する）

# 6. App Router
/appを基本ルーティングとして利用する。

概念：

app/

├─ page.tsx

├─ articles/

├─ reports/

├─ interviews/

├─ themes/

├─ industries/

├─ about/

├─ contact/

├─ interview-request/

├─ consultation/

└─ thanks/

実際のURL構造は02設計書を優先する。

# 7. Rendering方針
基本は、

**静的生成を優先する。**

Article / Report / Interview / Theme / Industryなど、公開後に頻繁に内容が変化しないページはStatic Generationを基本とする。

フォームやDBアクセス等、動的処理が必要な部分のみServer側処理を利用する。

# 8. JavaScript最小化
Article等の読み物ページではClient Componentを必要以上に使用しない。

Server Componentを基本とし、

- Menu
- Form
- Accordion
- Search
- Interactive Chart

など、操作が必要な箇所のみClient Component化する。

# 9. コンテンツ管理
Phase 1では、

**MDX + Master Data**

を基本とする。

CMSは導入しない。

# 10. MDXを使う対象
主に、

Article

Report

Interview

固定コンテンツ

で使用する。

文章・見出し・表・画像だけでなく、必要に応じて独自Componentを本文へ挿入可能とする。

# 11. MDX例
---

id: article_construction_shortage

title: "建設業は本当に人手不足なのか？"

slug: "construction-labor-shortage"

contentType: article

primaryTheme: recruiting

industries:

  - construction

publishedAt: 2026-08-10

updatedAt: 2026-08-10

status: published

---

## 建設業の人手不足はどこまで進んでいるのか

本文……

<KeyFinding

  value="92万人"

  label="建設技能者の減少"

/>

# 12. Frontmatter
Frontmatterは03で定義したContent Schemaに従う。

記事ごとに自由なフィールドを追加しない。

Schema変更が必要な場合は共通Schemaを更新する。

# 13. Zod Validation
MDX Frontmatter / Master DataはZod等で検証する。

例えば、

titleなし

slug重複

存在しないTheme ID

存在しないIndustry ID

不正な日付

等はBuild時に検出する。

# 14. Build Fail方針
重大なデータ不整合がある場合、

**Buildを失敗させる。**

誤ったリンク・Taxonomy・metadataをそのまま本番公開しない。

# 15. Master Data
以下は本文MDXと分離して管理する。

Theme

Industry

Job

Area

Tag

People

Company

Source

CTA

Form

Asset

03のMaster設計を基準とする。

# 16. Data Directory
概念：

data/

├─ taxonomies/     themes / industries / jobs / areas / tags

├─ people/

├─ companies/

├─ sources/

├─ ctas/

├─ forms/

└─ assets/

JSON / YAML / TypeScriptのどれを利用するかは、実装の保守性を見て決定可能。

Phase 1ではYAMLまたはTypeScript Objectを候補とする。

# 17. Content Directory
候補：

content/

├─ articles/

├─ reports/

├─ interviews/

└─ pages/

# 18. Asset Directory
public/

├─ images/

├─ icons/

└─ static/

ただしReport PDF等のDLファイルは、公開方針に応じてStorageへ分離する。

# 19. Component Directory
例：

components/

├─ layout/

├─ navigation/

├─ content/

├─ cards/

├─ data/

├─ forms/

├─ cta/

└─ ui/

# 20. Component設計
06で定義した以下をComponent化する。

Button

ArticleCard

ReportCard

InterviewCard

ThemeCard

IndustryCard

KeyFinding

StatCard

Chart

DataTable

Quote

ResearchMethod

CTA

Form

CompanyProfile

AuthorProfile

Breadcrumb

SourceList

# 21. MDX Component
MDX本文で使用可能なComponentは制限する。

例えば、

<KeyFinding />

<StatCard />

<Chart />

<DataTable />

<Quote />

<CTA />

<CompanyProfile />

等。

記事ごとに独自Componentを乱造しない。

# 22. Design Token
06のDesign TokenをCSS Variables等で一元管理する。

:root {

  --color-primary: #547C73;

  --color-accent: #C96F55;

  --color-background: #FAF9F6;

  --color-surface: #FFFFFF;

  --color-text: #292D2B;

  --font-brand: "Zen Maru Gothic", sans-serif;

  --font-base: "Noto Sans JP", sans-serif;

}

# 23. CSS
Phase 1ではCSS ModulesまたはTailwind CSSを候補とする。

実装速度・Component再利用を考えると、**Tailwind CSSを第一候補**とする。

ただし06のDesign Tokenを優先し、Tailwind標準色を無秩序に利用しない。

# 24. Font
Google Fontsを直接外部ロードするより、Next.jsのFont Optimization機能を利用する。

対象：

Zen Maru Gothic

Noto Sans JP

必要Weightのみ読み込む。

# 25. Image
next/imageを基本とする。

目的：

- Responsive Image
- サイズ最適化
- Lazy Loading
- CLS抑制
- WebP / AVIF等への最適化

# 26. 画像サイズ
CMSがないため、記事作成時に巨大画像を無制限に追加しない。

用途ごとの推奨画像サイズを別途運用ルールとして定義する。

# 27. SVG
Logo / Icon / 単純図形ではSVGを利用可能とする。

不明な外部SVGをそのまま埋め込まない。

# 28. Report PDF
Report PDFは記事コンテンツとは分離して扱う。

初期候補：

**Vercel Blob等のObject Storage**

とする。

理由：

- PDF配布
- URL管理
- ファイル差し替え
- 将来的なPrivate配布

への対応がしやすい。

# 29. Report PDF公開方式
Report詳細ページ自体は公開する。

PDF本体については、

Report Page

↓

Form

↓

Thank You

↓

PDF

を基本とする。

# 30. PDF URL
PDFファイルURLを記事本文に直接ベタ書きしない。

Report frontmatterの `download.assetId` からAsset Master（`data/assets/`）を参照する形で管理する。

例：

reportId: report_construction_2026

fileUrl: ...

# 31. PDF Security
Phase 1では完全なDRM等は不要。

ただしフォームを通さずPDF URLを大量に露出させる設計は避ける。

将来的にPrivate Blob / Signed URL等へ移行可能な構造とする。

# 32. Form Architecture
フォームはNext.js側で受け付ける。

候補：

Server Action

または

Route Handler

Phase 1では共通Form処理を作り、4CVから再利用する。

# 33. Form Flow
Browser

↓

Form Validation

↓

Server

↓

Server Validation

↓

Spam Check

↓

DB Save

↓

Email

↓

Success

↓

Thank You

# 34. Client Validation
入力補助のためClient側Validationを行う。

ただしClient Validationだけを信用しない。

# 35. Server Validation
必ずServer側でもZod等でValidationする。

特に、

- Email
- URL
- 必須項目
- leadType
- sourceContentId

等。

# 36. Lead DB
リード情報はファイルやGitHubに保存しない。

PostgreSQL系DBを利用する。

初期はVercelとの親和性が高いServerless PostgreSQLサービスを候補とする。

特定ベンダーへの過度な依存は避ける。

# 37. ORM
DBアクセスにはORMを利用する。

第一候補：

**Drizzle ORM**

理由：

- TypeScriptとの親和性
- 比較的軽量
- SQL構造が分かりやすい
- Serverless構成との相性

ただしPrisma等でも本設計の思想を満たせる場合は変更可能。

# 38. 初期DB Table
最低限、

companies

people

activities

を想定する。

必要に応じてleadsを別Tableにしてもよい。

# 39. Company Table
概念：

id

name

domain

website_url

industry

created_at

updated_at

# 40. Person Table
概念：

id

company_id

name

email

role

phone

created_at

updated_at

# 41. Activity Table
概念：

id

company_id

person_id

type

content_id

report_id

landing_page

utm_source

utm_medium

utm_campaign

utm_content

utm_term

issue

created_at

# 42. Activity Type
最低限：

report_download

interview_request

contact

service_lead

# 43. Company Domain
会社URLからdomainを正規化して保持する。

例：

https://www.example.co.jp/about/

↓

example.co.jp

企業重複判定の重要シグナルとして利用する。

# 44. DomainをPrimary Keyにしない
企業IDはUUID等の内部IDを使用する。

Domainは変更・重複する可能性があるため、正式IDにはしない。

# 45. Person判定
Emailを重複判定の重要シグナルとする。

正式IDは内部personIdとする。

# 46. Upsert
フォーム送信時、

Company検索

↓

なければ作成

↓

Person検索

↓

なければ作成

↓

Activity追加

を基本処理とする。

# 47. Lead Enrichment
企業URLを基にした自動企業調査はPhase 1では実装しない。

まずURLを保存する。

将来的に別Processとして、

Company

↓

Enrichment

↓

Company Profile

を追加可能とする。

# 48. Internal DBとPublic Data
DBのCompany情報と、公開用Company Masterを自動同期しない。

Internal Lead Company

≠

Public Interview Company

を維持する。

# 49. Email
フォーム送信後、最低限以下を行う。

### 運営者
新規CV通知。

### ユーザー
受付確認。

Reportの場合はPDF取得案内も送信可能とする。

# 50. Email Provider
特定サービスへ設計を密結合しない。

APIベースのTransactional Emailサービスを利用する。

Providerは環境変数・Adapter等で交換可能な構造を目指す。

# 51. Email Template
最低限：

Report Download

Interview Request

Contact

Service Lead

の4種類。

HTMLメールを過度に複雑化しない。

# 52. Reply-To
問い合わせ系メールでは適切なReply-Toを設定する。

ユーザー入力値を不用意にFromへ利用しない。

# 53. Analytics
初期は、

**Google Analytics 4**

を基本とする。

加えて、

**Google Search Console**

を設定する。

# 54. Analytics Event
07で定義したイベントを実装する。

report_cta_click

report_form_start

report_form_submit

report_download

interview_cta_click

interview_form_submit

contact_form_submit

service_cta_click

service_form_submit

company_website_click

recruitment_page_click

job_link_click

# 55. Event Parameter
可能な範囲で、

content_id

content_type

primary_theme

industry

cta_id

report_id

company_id

を送信する。

# 56. UTM
Landing時に、

utm_source

utm_medium

utm_campaign

utm_content

utm_term

を取得する。

フォーム送信まで保持できるようにする。

# 57. PrivacyとAnalytics
Cookie・Analyticsの実装は、日本国内の法令・Privacy Policy・利用サービスの要件に合わせる。

必要に応じてConsent Managementを追加可能な構造にする。

# 58. SEO Metadata
Next.js Metadata APIを利用する。

各ページで最低限、

title

description

canonical

robots

openGraph

twitter

を生成する。

# 59. Metadata Source
Article等ではfrontmatterから自動生成する。

毎ページtsxへベタ書きしない。

# 60. Canonical
公開ページには原則自己参照Canonicalを設定する。

Pagination・Filter等については02 / 04設計に従う。

# 61. Sitemap
sitemap.ts等で自動生成する。

対象：

- Article
- Report
- Interview
- Theme
- Industry
- Static Pages

# 62. Sitemap除外
以下は原則除外。

Draft

Thank You

Preview

Internal

Search Result

# 63. robots
robots.ts等で管理する。

Preview / Internalページ等をクロールさせない。

# 64. Structured Data
04で定義したSchemaを実装する。

候補：

Article

BreadcrumbList

Organization

Person

FAQPage

Dataset

ページ内容に存在しないSchemaを無理に出力しない。

# 65. Structured Data Component
JSON-LD生成処理は共通化する。

記事ごとに手書きしない。

# 66. OGP
Article / Report / InterviewごとにOG画像を設定する。

将来的にはタイトル等から動的OG画像生成も検討可能。

Phase 1では固定Eyecatchでもよい。

# 67. Search
Phase 1ではサイト内全文検索を実装しない。

理由：

初期コンテンツ量では検索より、

- Theme
- Industry
- Related Content
- Report

導線の方が重要なため。

# 68. Search将来対応
検索導入に備え、

id

title

description

contentType

theme

industry

slug

を取得できるContent Index生成処理を持てる構造にする。

# 69. Content Index
Build時に、

[

  {

    "id": "...",

    "title": "...",

    "type": "article",

    "theme": "...",

    "industry": "..."

  }

]

のようなIndexを生成可能にしておく。

Phase 1では必須ではない。

# 70. Related Content
関連記事は初期段階では、

- Theme
- Industry
- Content Type
- 手動指定

等を使って決定する。

高度なAI Recommendationは不要。

# 71. Cache
静的コンテンツはCDN Cacheを積極的に利用する。

動的DB情報をArticle表示のたびに取得しない。

# 72. Revalidation
将来的にCMS等を導入する場合、On-demand Revalidation等を利用可能な構造にする。

Phase 1ではGit Push → Buildで十分。

# 73. GitHub
Source Code / Content / Master DataをGitHubで管理する。

# 74. Branch
最低限、

main

feature/*

fix/*

程度。

一人運用初期では過度なGit Flowを導入しない。

# 75. Main
mainをProduction Branchとする。

mainへの反映でVercel Production Deployを実行する。

# 76. Preview Deploy
Pull Request / Branch Push時にVercel Previewを利用する。

公開前に、

- Layout
- Mobile
- Link
- Metadata
- Article
- Chart

等を確認する。

# 77. CI
最低限Build前に、

Type Check

Lint

Content Validation

Build

を実行する。

# 78. Content Validation
特に以下を確認する。

slug重複

ID重複

Theme存在

Industry存在

Company存在

必須metadata

公開日

# 79. Broken Link
内部リンク検査をBuildまたはCIへ追加することを推奨する。

初期実装が重い場合はPhase 2でもよい。

# 80. Environment
最低限、

Development

Preview

Production

を分ける。

# 81. Environment Variables
Secretは.env等で管理し、GitへCommitしない。

例：

DATABASE_URL

EMAIL_API_KEY

ANALYTICS_ID

BLOB_TOKEN

# 82. Secret管理
Production SecretはVercel Environment Variables等で管理する。

コードへAPI Keyを直接記述しない。

# 83. Form Security
最低限：

- Server Validation
- Honeypot
- Rate Limit
- Input Sanitization
- CSRFを考慮した実装
- Error Handling

を行う。

# 84. Bot Protection
Phase 1ではHoneypot + Rate Limitを基本候補とする。

Spamが増えた場合にTurnstile等を追加する。

最初からユーザーへ複雑なCAPTCHAを要求しない。

# 85. Rate Limit
フォームAPIにIP等を基にしたRate Limitを設ける。

正常ユーザーを阻害しない範囲とする。

# 86. Database Security
DBへBrowserから直接アクセスさせない。

必ずServer側処理を経由する。

# 87. 個人情報
Company / Person / Activity DBは公開APIとして提供しない。

内部管理用途とする。

# 88. Logging
Form Error / Server Error等を追跡可能にする。

個人情報全文を不用意にLogへ出さない。

# 89. Error Monitoring
Phase 1ではVercel Logs等から開始可能。

運用規模が増えたらSentry等の導入を検討する。

# 90. Backup
Lead DBについて、利用するDB ProviderのBackup / Point-in-Time Recovery等を確認する。

Git管理されるContentとLead DBは別物であることに注意する。

# 91. Performance目標
Core Web Vitalsを意識する。

特に、

- LCP
- CLS
- INP

を悪化させない。

# 92. Performance方針
優先順位：

Static HTML

↓

Optimized Image

↓

Minimal JavaScript

↓

Lazy Loading

↓

CDN

# 93. Third Party Script
外部Scriptを無制限に追加しない。

特に、

- Analytics
- Heatmap
- Chat
- Advertising

等はPerformanceへの影響を確認する。

# 94. Accessibility
06のAccessibility要件を実装レベルで維持する。

Semantic HTMLを優先する。

<header>

<nav>

<main>

<article>

<section>

<footer>

等を適切に利用する。

# 95. Heading Structure
Articleでは、

H1

 ↓

H2

 ↓

H3

の論理構造を維持する。

デザイン目的でHeading Levelを飛ばさない。

# 96. Mobile
Mobile Firstを意識してComponentを設計する。

特に、

- Table
- Chart
- Navigation
- Form
- CTA

をDesktop前提で作らない。

# 97. Admin画面
Phase 1では独自Admin画面を作らない。

記事追加は、

MDX作成

↓

Git Commit

↓

Preview

↓

Production

で行う。

# 98. Claude Codeによる記事追加
`/add-article` を実行した場合、

- MDX生成
- Frontmatter設定
- Taxonomy設定
- Internal Link設定
- Image配置
- Schema Validation
- Build確認

まで行える構造を目指す。

手順は `.claude/skills/add-article/SKILL.md` に記述する。スキル側で `allowed-tools` を絞り、コンテンツ追加に必要な範囲（`content/` 配下の書き込みと `npm run validate` / `npm run build`）だけを事前承認する。

# 99. Claude Codeによる新規Report追加
基本フロー：

PDF配置

↓

Asset Master登録

↓

Report MDX

↓

CTA

↓

Form

↓

Related Content

↓

Build

# 100. Claude CodeによるInterview追加
基本：

Company確認

↓

Company Master登録

↓

Interview MDX

↓

人物情報

↓

公式サイト

↓

採用ページ

↓

求人リンク

↓

関連記事

↓

Build

# 101. Claude Codeへの禁止事項
以下はClaude Codeに実行させない。

- Schemaを勝手に変更
- 新Taxonomyを勝手に追加
- Brand Colorを勝手に追加
- URL構造を勝手に変更
- DB Migrationを確認なく実行
- Production Secret変更
- 個人情報をContentへ書き出す

重要なのは、これらを文章での禁止に留めないことである。CLAUDE.mdやルールは文脈として渡されるだけで、強制力を持たない。実効性のある禁止は権限設定側で行う。

`.claude/settings.json` の permissions.deny に最低限以下を設定する。

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Bash(vercel env:*)",
      "Bash(drizzle-kit push:*)",
      "Bash(psql:*)",
      "Bash(git push:*)"
    ],
    "ask": [
      "Bash(npx drizzle-kit *)",
      "Bash(gh pr merge:*)"
    ]
  }
}
```

さらに以下を併用する。

- 本番DBのURLはローカルの `.env` に置かず、Vercel Environment Variables側にのみ保持する。開発時はローカルDBまたはPreview用DBへ接続する
- Migrationは生成のみClaude Codeに行わせ、適用は人間が実行する
- Schema・Design Token・URL定義ファイルには `.claude/rules/` でパス限定ルールを付け、変更時は必ず理由を報告させる

# 102. README
Repository RootにREADMEを作成する。

最低限：

Project概要

Install

Development

Build

Content追加方法

Report追加方法

Interview追加方法

Master更新方法

Environment Variables

Deploy

を記載する。

# 103. Documentation
01〜08の設計書はRepository内の、

docs/

等へ配置可能とする。

例：

docs/

├─ 00-basic-design.md

├─ 01-information-architecture.md

├─ 02-sitemap-url.md

├─ 03-content-model.md

├─ 04-seo-aio.md

├─ 05-page-template.md

├─ 06-brand-ui.md

├─ 07-conversion-lead.md

├─ 08-technical-architecture.md

├─ 09-implementation-claude-code.md

├─ 10-launch-interview-plan.md

└─ 11-open-issues.md

CLAUDE.mdからdocs/を参照させ、Claude Codeが設計書を単一の正とみなす状態を作る。ただしCLAUDE.mdへ設計書本文を転記しない。CLAUDE.mdは常時読み込まれるため、肥大化すると他の指示への追従が落ちる。

# 104. CMS導入判断
以下が起きた場合、Headless CMSを検討する。

- 非技術者が頻繁に投稿
- 毎日大量更新
- 編集承認Workflowが必要
- Preview UIが必要
- 複数編集者
- Git運用が負担

それまではMDXを維持する。

# 105. CRM導入判断
以下が増えたらCRMを検討する。

- Lead数
- 営業担当者
- Follow Up
- メール配信
- Deal管理
- Activity管理

初期段階では独自CRMを作らない。

# 106. DBの目的
初期DBは、

**CRMを作るためではなく、企業・人物・接点を失わないため**

に利用する。

ここを混同しない。

# 107. Company Enrichment
将来的には、

Company URL

↓

Company Information

↓

Recruitment Information

↓

Industry

↓

Company Size

↓

Recruitment Status

等を補完する可能性がある。

ただし08 Phase 1では実装しない。

# 108. AI機能
初期サイトにAIチャット等を追加しない。

まず、

高品質な一次情報・データ・記事

を蓄積する。

AI利用は運営側の、

- 記事作成支援
- Taxonomy判定
- Internal Link提案
- Company調査
- Report分析

等から始める方が合理的。

# 109. AIOと技術構造
AI検索を意識して、

- Semantic HTML
- 明確なHeading
- Source
- Author
- Date
- Organization
- Structured Data
- Dataset
- Company情報

を機械可読な状態にする。

特殊な「AI SEO機能」を追加することより、情報構造の正確性を優先する。

# 110. Vendor Lock-in
可能な限り、

Content

→ MDX

Source

→ GitHub

Framework

→ Next.js

DB

→ PostgreSQL

Files

→ Object Storage

という標準的な構造を維持する。

特定サービスから移行不能になる構成を避ける。

# 111. Vercel依存
VercelはHosting / Preview / Functions / Storage連携等で積極利用してよい。

ただし、

- Content
- DB Schema
- Business Logic

をVercel独自仕様へ過度に依存させない。

# 112. Phase 1 Architecture
初期公開時は、

Next.js

TypeScript

App Router

MDX

Zod

Tailwind

PostgreSQL

Drizzle

Object Storage

Transactional Email

GA4

Search Console

GitHub

Vercel

を基本スタックとする。

# 113. Phase 1で作らないもの
WordPress

Headless CMS

独自CMS

独自CRM

AI Chat

全文検索

高度なRecommendation

Marketing Automation

Lead Scoring

Company自動調査

会員機能

Dark Mode

これらは必要性が生じてから追加する。

# 114. Phase 2候補
コンテンツ・Lead増加後：

Search

CRM Integration

Email Marketing

Company Enrichment

Lead Scoring

Content Recommendation

CMS

を検討する。

# 115. Phase 3候補
さらに成長した場合、

Company Intelligence

Industry Dashboard

Original Data Platform

Research Database

AI Search

Personalization

等へ拡張可能。

# 116. Repository概念構成
最終的なイメージ：

hito-lab/

│

├─ app/

│

├─ components/

│

├─ content/

│   ├─ articles/

│   ├─ reports/

│   └─ interviews/

│

├─ data/

│   ├─ taxonomies/

│   ├─ people/

│   ├─ companies/

│   ├─ sources/

│   ├─ ctas/

│   ├─ forms/

│   └─ assets/

│

├─ lib/

│   ├─ content/

│   ├─ db/

│   ├─ analytics/

│   ├─ email/

│   ├─ validation/

│   └─ seo/

│

├─ public/

│   └─ images/

│

├─ db/

│   ├─ schema/

│   └─ migrations/

│

├─ docs/

│

├─ tests/

│

└─ README.md

# 117. libの役割
lib/へビジネスロジックを集約する。

例えば、

lib/content

→ MDX読み込み

lib/db

→ Company / Person / Activity

lib/analytics

→ Event

lib/email

→ Mail

lib/seo

→ Metadata / JSON-LD

lib/validation

→ Zod Schema

ComponentにBusiness Logicを詰め込まない。

# 118. Test
最低限、

- Schema
- Content Loader
- Form Validation
- Company Domain Normalization

等の重要ロジックはUnit Testを検討する。

全Componentに大量のTestを書くことをPhase 1の目的にはしない。

# 119. Production公開条件
公開前に最低限、

Build成功

Type Errorなし

Content Validation成功

主要URL確認

Mobile確認

Form送信確認

Lead保存確認

Email確認

PDF DL確認

GA4確認

Metadata確認

Sitemap確認

robots確認

OGP確認

404確認

を行う。

# 120. 08最重要原則
### 原則1
**Next.js + TypeScript + MDXをサイトの基本基盤とする。**

### 原則2
**コンテンツはGit管理し、初期段階ではCMSを入れない。**

### 原則3
**MDXとMaster Dataを分離する。**

### 原則4
**Zod等でデータ整合性をBuild時に検証する。**

### 原則5
**Article等は静的生成を優先し、JavaScriptを最小化する。**

### 原則6
**LeadはPostgreSQL系DBへCompany × Person × Activityとして保存する。**

### 原則7
**PDFはコンテンツと分離したObject Storageで管理可能な構造とする。**

### 原則8
**GitHub → Vercel Preview → Productionを基本デプロイフローとする。**

### 原則9
**SEO / Analytics / CV計測を初期実装に含める。**

### 原則10
**最初からCMS・CRM・AI・検索を作り込まない。**

### 原則11
**Vercel等のサービスは利用するが、データ構造・コンテンツを特定ベンダーへ閉じ込めない。**

### 原則12
**Claude Codeが安全にコンテンツ追加・修正・検証できるRepository構造にする。禁止事項は文章ではなく権限設定とvalidationで担保する。**

# 121. 09への引き継ぎ
08までで、

01 情報設計

↓

02 コンテンツ・ページ構造

↓

03 データ構造

↓

04 運用・SEO/AIO

↓

05 ページ仕様

↓

06 ブランド/UI

↓

07 CV・Lead

↓

08 技術

まで定義された。

次はこれを、

**実際にどういう順番で作るか**

へ変換する。

つまり09では、

**開発ロードマップ / MVP / 実装順序 / Claude Codeへの作業単位と運用設定**

を設計する。

# 122. 結論
人手不足研究所では、技術的な豪華さを競わない。

初期構成は、

**Next.js × TypeScript × MDX × PostgreSQL × GitHub × Vercel**

という比較的シンプルで標準的な構成とする。

重要なのは、

**コンテンツが増えても壊れない。**
**リードが増えても失わない。**
**後から機能を増やせる。**
**Claude Codeと一緒に運用でき、かつClaude Codeが壊せない範囲が明確である。**

ことである。

特に、人手不足研究所の価値の中心はシステムではなく、

**一次情報・独自データ・企業との接点が蓄積され続けること**

にある。

したがって技術は、その蓄積を邪魔せず、むしろ長期的に資産化できる構造として設計する。
