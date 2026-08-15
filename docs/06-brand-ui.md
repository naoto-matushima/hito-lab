# 人手不足研究所｜06 ブランド・UI設計書 v1.0
**文書名：** 06-brand-ui.md
**対象サイト：** 人手不足研究所
**位置づけ：** 00〜05で定義したブランド・情報構造・SEO/AIO・ページテンプレートを、具体的なビジュアル/UIへ変換する設計書
**目的：** 人手不足研究所全体で一貫したブランド体験を構築し、Claude Codeによる実装時のデザイン判断基準を定義する。カラー・フォント・Spacing等はDesign Tokenとして一元管理し、Claude Codeがコンポーネント内へ直値を書かない状態を維持する。

# 1. ブランドデザインの基本思想
人手不足研究所は、

**研究所としての信頼感 × 人を扱うメディアとしての親しみやすさ**

を基本とする。

一般的なコンサルティング会社・SaaS・ニュースメディアのデザインへ寄せすぎない。

目指す印象は、

**信頼できる / 読みやすい / データが強い / 人間味がある / 現場から遠くない**

である。

# 2. ブランドトーン
デザイン上のブランドバランスを以下とする。

| **要素** | **目安** |
| --- | --- |
| 研究所・シンクタンク | 50% |
| 実務BtoBメディア | 35% |
| 未来・テクノロジー | 15% |

「研究所」といっても学術機関のように硬くしすぎない。

また「DX」を扱うからといって、青・紫・グラデーション・3Dイラスト等を多用したSaaS的表現にはしない。

# 3. デザインキーワード
デザイン判断では以下を基準とする。

### 推奨
- 信頼
- 調査
- 実証
- 人
- 現場
- データ
- 整理
- 温度
- 実務
- 前進

### 避ける
- 過度に高級
- 過度に未来的
- 過度にかわいい
- 警告的
- 営業色が強い
- スタートアップ的すぎる
- 官公庁的に硬すぎる

# 4. ブランドカラー
基本カラーパレット：

**Warm White × Sage Green × Terracotta × Charcoal**

とする。

# 5. Primary Color：Sage Green
Primaryは落ち着いたSage / Blue Green系とする。

初期候補：

--color-primary: #547C73;

--color-primary-dark: #365D55;

--color-primary-light: #E5EFEC;

--color-primary-pale: #F1F6F4;

役割：

- ブランドカラー
- Primary Button
- Link
- Theme表示
- 見出しアクセント
- Key Finding
- データUI
- Header等のアクセント

「改善」「整理」「信頼」「前進」を担当する色とする。

# 6. Accent Color：Terracotta
初期候補：

--color-accent: #C96F55;

--color-accent-dark: #A8503B;

--color-accent-light: #F3DDD6;

--color-accent-pale: #FAF0EC;

役割：

- 注目
- 課題
- 比較
- グラフの強調系列
- Important Data
- 一部Label

TerracottaをPrimary CTA色として乱用しない。

人手不足というテーマ自体に問題・危機の意味が含まれるため、サイト全体を赤系にしない。

# 7. Background Color
サイト全体背景は完全な白ではなく、Warm Whiteを基本とする。

--color-background: #FAF9F6;

--color-surface: #FFFFFF;

--color-surface-subtle: #F5F4F0;

基本：

Site Background

= Warm White

Content / Card

= White

Research / Data

= Pale Sage

Attention / Comparison

= Pale Terracotta

これにより情報階層を色でも認識できるようにする。

# 8. Text Color
純粋な#000000は原則使用しない。

--color-text: #292D2B;

--color-text-secondary: #606864;

--color-text-muted: #858B88;

--color-border: #DDDCD6;

本文はCharcoal。

柔らかさを保ちながら十分な可読性を確保する。

# 9. Semantic Color
必要に応じて、

- Success
- Warning
- Error
- Info

を定義する。

ただしPrimary / Accentとは役割を分離する。

エラー表示にTerracottaを流用するなど、ブランド色と状態色を混同しない。

# 10. カラー使用比率
ページ全体では概ね、

Warm White / White     70〜80%

Charcoal               10〜15%

Sage                   5〜10%

Terracotta             3〜5%

程度を目安とする。

色を見せることより、情報を読みやすくすることを優先する。

# 11. Typography
Font Familyは、

**Zen Maru Gothic × Noto Sans JP**

を基本とする。

# 12. Zen Maru Gothicの役割
Zen Maru Gothicはブランドの人間味を担当する。

使用候補：

- Logo
- Hero Copy
- H1
- 大きなセクションタイトル
- ブランドメッセージ

全テキストへの使用は避ける。

ページ全体の10〜20%程度を目安とする。

# 13. Noto Sans JPの役割
Noto Sans JPを本文・UIの基本フォントとする。

対象：

- Body
- H3以下
- Navigation
- Button
- Label
- Table
- Chart
- Data
- Source
- Caption
- Form

情報の読みやすさとデータの端正さを担当する。

# 14. Font Stack
--font-brand:

  "Zen Maru Gothic",

  sans-serif;

--font-base:

  "Noto Sans JP",

  sans-serif;

Google Fonts等から読み込む場合、パフォーマンスを考慮して必要なWeightだけを利用する。

# 15. Font Weight
基本：

Regular     400

Medium      500

Bold        700

極端に細いWeightは本文では使用しない。

# 16. H1
PC：

font-family: var(--font-brand);

font-size: clamp(2.25rem, 4vw, 3.5rem);

font-weight: 700;

line-height: 1.35;

letter-spacing: 0.01em;

Article等の長い日本語タイトルでは自動的にサイズを調整できる設計とする。

# 17. H2
基本はZen Maru GothicまたはNoto Sans JP。

ブランド・テーマ性の強い見出し：

Zen Maru Gothic

本文中の論理構造を重視する見出し：

Noto Sans JP

を利用可能とする。

目安：

font-size: clamp(1.6rem, 3vw, 2.1rem);

font-weight: 700;

line-height: 1.5;

# 18. H3
font-family: var(--font-base);

font-size: 1.25rem;

font-weight: 700;

line-height: 1.6;

# 19. Body
PC：

font-size: 16px;

line-height: 1.9;

長文Articleでは17px前後も検討可能。

スマートフォン：

font-size: 16px;

line-height: 1.85;

読み物として十分な行間を確保する。

# 20. Small Text
Source / Caption等：

font-size: 12px〜14px;

line-height: 1.6;

重要情報を極端に小さくしない。

# 21. 数字
統計値はNoto Sans JP Boldを基本とする。

例：

**92万人減**

数字を強く見せ、説明文との階層差を明確にする。

必要に応じて32〜56px程度まで拡大可能。

# 22. コンテンツ幅
長文本文：

max-width: 720px;

程度を基本とする。

ページ全体：

max-width: 1200px;

程度。

# 23. Wide Content
以下は本文幅を超えて表示可能とする。

- Chart
- Table
- Comparison
- Report Data
- Large Image

例：

       Wide Chart

 ┌───────────────────┐

      Article Body

      ┌─────────┐

      │         │

      └─────────┘

# 24. Grid
PCでは12-column Gridを基本候補とする。

ただし実装上必要以上に複雑化しない。

主要レイアウト：

Article

1 Column

List

3 Column

Report Feature

2 Column

Interview Feature

2 Column

# 25. Spacing System
8px単位を基本とする。

--space-1: 4px;

--space-2: 8px;

--space-3: 12px;

--space-4: 16px;

--space-5: 24px;

--space-6: 32px;

--space-7: 48px;

--space-8: 64px;

--space-9: 96px;

# 26. Section Spacing
PC：

64〜96px

Mobile：

48〜64px

ブランドLPほど巨大な余白を取らない。

# 27. Border Radius
丸みは小〜中程度。

--radius-sm: 4px;

--radius-md: 8px;

--radius-lg: 12px;

24px以上の大きな角丸を多用しない。

SaaSアプリ的な印象を避ける。

# 28. Border
Card等は、

border: 1px solid var(--color-border);

を基本候補とする。

ShadowよりBorderを優先する。

# 29. Shadow
Shadowは控えめにする。

必要な場合：

box-shadow:

  0 4px 16px rgba(0,0,0,.05);

程度。

カードすべてを浮かせない。

# 30. Button
Buttonはシンプルなフラットデザインとする。

Primary：

Sage Background

White Text

Secondary：

White / Transparent

Sage Border

Sage Text

# 31. Primary Button
用途：

- Report DL
- 重要導線
- Primary Action

角丸：

6〜8px程度

極端なPill型にしない。

# 32. Terracotta Button
原則Primary CTAとして使用しない。

必要な場合は限定的に利用する。

Terracottaは情報強調色として優先する。

# 33. Link
本文リンクはSage系。

Underlineまたは明確なHover表現を持たせる。

色だけに依存してリンクを示さない。

# 34. Card基本思想
すべてのコンテンツを同じカードにしない。

Content Typeごとに視覚的な性格を変える。

# 35. Article Card
目的：

情報・解説

基本：

Eyecatch

Theme Label

Title

Description

Date

比較的シンプルにする。

# 36. Report Card
目的：

調査・資料

Articleより「資料感」を強くする。

候補：

┌──────────────┐

│ REPORT 2026  │

│              │

│ 建設業の      │

│ 人手不足      │

│              │

│ 調査レポート  │

└──────────────┘

Report Label、Year等を積極的に使用する。

# 37. Interview Card
目的：

人・企業

写真をArticleより大きく扱う。

Photo

↓

Interview Label

↓

Title

↓

Company / Person

実写の存在感を優先する。

# 38. Theme Card
テーマ名＋短い説明。

アイコンを付ける場合は線画程度。

装飾イラストを大量に使用しない。

# 39. Industry Card
業界名を明確にする。

写真を使う場合は実際の業界・仕事が伝わる写真を優先する。

# 40. Reportデザイン
Reportは人手不足研究所のブランドを最も強く表現するページの一つとする。

特に、

- Data
- Key Finding
- Chart
- Research Method
- Download

のUI品質を高くする。

# 41. Key Finding
共通コンポーネント化する。

例：

┌─────────────────────┐

│ KEY FINDING         │

│                     │

│ 建設技能者は         │

│ 20年間で92万人減少   │

│                     │

│ 2005 → 2025         │

└─────────────────────┘

背景：

Pale Sage

数字：

Charcoal / Sage Dark

重要な比較のみTerracottaを利用可能。

# 42. Stat Card
例：

92万人

減少

建設技能者

2005 → 2025

大きな数字＋短い説明。

一画面に大量表示しない。

# 43. Chart
共通ルール：

### 基本系列
Sage。

### 比較・注目系列
Terracotta。

### 補助系列
Gray。

グラフごとに無秩序に色を変えない。

# 44. Chart構成
基本：

Chart Title

↓

Chart

↓

Key Message

↓

Source

グラフだけを配置しない。

# 45. Chart Source
必ず視認可能な位置に表示する。

例：

出典：国土交通省「○○」をもとに人手不足研究所作成

等。

# 46. Table
Table Header：

Pale SageまたはSubtle Gray

重要列・重要値：

Terracotta等で限定強調可能。

Stripeは必要な場合のみ。

# 47. Comparison UI
Before / After等では、

Before

Neutral / Terracotta Pale

After

Sage Pale

等を使用可能。

ただし「赤＝悪、緑＝善」を機械的に適用しない。

# 48. Quote
Interview等の引用は独立したQuote UIを用意する。

例：

「若い人が来ないのではなく、

 こちらが会社のことを伝えられて

 いなかったんです。」

Zen Maru Gothicを限定的に利用してもよい。

# 49. Research Method
Reportの調査概要は独立したUIにする。

背景：

Surface Subtle / Pale Sage

情報：

調査期間

対象

回答数

方法

調査主体

をGrid表示可能とする。

# 50. 写真方針
優先順位：

実際の企業・人物・現場写真

↓

独自データ・グラフ

↓

独自図解

↓

補助的なイメージ写真

ストックフォト依存を避ける。

# 51. Interview写真
Interviewでは実写を積極的に使用する。

候補：

- Portrait
- 働いている様子
- 職場
- 現場
- 商品・設備
- チーム

単なる証明写真だけにしない。

# 52. Article Eyecatch
Articleで必ず人物写真を使用する必要はない。

テーマに応じて、

- Data Visual
- Chart
- Typography
- Photo
- Illustration

を選択する。

# 53. Report Eyecatch
Reportはシリーズとして統一感を持たせる。

例えば、

Industry

Year

Report Title

Key Visual

の共通フォーマットを作る。

将来的にレポートが並んだときに、

人手不足研究所のレポート

と一目で分かる状態を目指す。

# 54. イラスト
必要な場合のみ利用する。

過度なSaaS風人物イラストは避ける。

図解として意味のあるイラストを優先する。

# 55. Icon
線画系を基本とする。

同一Icon Libraryを利用する。

複数ライブラリを混在させない。

# 56. Logo
初期は文字ロゴ中心でよい。

基本：

**人手不足研究所**

Zen Maru Gothicを候補とする。

必要に応じて小さなSymbolを追加する。

# 57. Logo Symbol
Symbolを作る場合は、

- 人
- データ
- 循環
- 改善
- 研究

等を抽象化する。

虫眼鏡＋人のような直接的すぎる研究所表現は必須ではない。

# 58. Header
基本背景：

Warm White / White

ロゴ：

Charcoal / Sage

Header自体を強い色面にしない。

コンテンツを主役にする。

# 59. Header Height
PC：

64〜72px程度

Mobile：

56〜64px程度

# 60. Navigation
Noto Sans JP Medium。

Navigationを過度に小さくしない。

HoverはSageを利用。

# 61. Footer
Headerより少しブランド感を強くしてよい。

候補：

Dark Sage background

または、

Warm White + Border

初期デザイン比較で決定可能とする。

# 62. Breadcrumb
視覚的には控えめ。

本文タイトルより目立たせない。

Mobileでは横スクロールまたは省略表現を許容する。

# 63. TOP Hero
TOP Heroでは写真を必須にしない。

むしろ、

人が減っても、

強くなる会社へ。

人手不足研究所

＋データ・グラフィック的な軽いビジュアルでも成立する。

# 64. TOP Heroの雰囲気
巨大なSaaSスクリーンショットや人物ストックフォトを置かない。

ブランドコピーと「研究・データ・人」の印象を優先する。

# 65. Theme Hub
Theme Hubでは色を使いすぎない。

テーマごとに別ブランドカラーを設定することは初期では行わない。

サイト全体のSage / Terracotta体系を維持する。

# 66. Industry Hub
業界別に色を変更しない。

業界識別は、

- Label
- Photo
- Industry Name

等で行う。

# 67. Article本文
本文では装飾を多用しない。

基本：

H2

Paragraph

List

Chart

Table

Quote

Key Finding

の組み合わせ。

# 68. H2 Decoration
大きな色ベタ見出しは避ける。

候補：

Sageの短い左Border

または、

下線

程度。

# 69. Report CTA
Report DL CTAは他CTAより強く表示可能。

Sage背景のCard＋Primary Button等を利用する。

ただし広告バナーのような派手な表現にしない。

# 70. Interview企業紹介
冒頭Compact Profile：

Pale Sage / White Card

末尾Detail Profile：

White + Border

等で差別化可能。

企業広告のように見せず、編集情報として扱う。

# 71. Company Link
外部リンクであることが分かるIconを付けてもよい。

公式サイト、採用ページ、求人媒体を明確に区別する。

# 72. CTA全体方針
コンテンツ閲覧を妨げない。

営業CTAより、

- Report
- 関連記事
- Interview
- 取材募集

等を自然に優先する。

# 73. Form
Formはシンプルにする。

LabelをInput内placeholderだけに依存させない。

Label

↓

Input

を基本とする。

# 74. Input
高さ：

44〜48px以上

Border：

Gray

Focus：

Sage

Error：

Semantic Error

# 75. Responsive Breakpoints
目安：

mobile: < 768px

tablet: 768px - 1023px

desktop: >= 1024px

wide: >= 1280px

コンテンツ都合で調整可能。

# 76. Mobile Layout
基本1 Column。

カード一覧：

Desktop: 3 Column

Tablet: 2 Column

Mobile: 1 Column

# 77. Mobile Typography
H1：

32〜40px程度

長いArticleタイトルでは28〜32pxまで縮小可能。

本文：

16px以上

を原則とする。

# 78. Mobile Padding
左右：

20px前後

極端に狭くしない。

# 79. Mobile Table
優先順位：

- レスポンシブ変換
- 横スクロール
- Card化

内容に応じて選択する。

文字縮小で無理に収めない。

# 80. Mobile Chart
凡例・軸ラベルが読めることを優先する。

必要ならDesktopとMobileでChartレイアウトを変更する。

# 81. Mobile CTA
Sticky CTAはPhase 1では原則使用しない。

Report CV等を確認したうえで将来検討する。

# 82. Animation
最小限。

使用可能：

- Fade
- Small Translate
- Hover
- Accordion

程度。

# 83. 禁止Animation
- 過度なParallax
- 長時間のIntro
- 常時動くBackground
- 無意味なCount-up
- 大きなScroll Animation

情報閲覧を優先する。

# 84. Hover
DesktopではCard / Button / Linkに軽いHoverを付与する。

例：

Border Color

Background

Small TranslateY

程度。

大きく浮かせない。

# 85. Accessibility
WCAGを意識し、最低限、

- Contrast
- Keyboard Navigation
- Focus State
- Alt
- Semantic HTML
- Form Label
- Button / Link distinction

を実装する。

# 86. Color Accessibility
Sage / Terracottaの薄い色面上に同系色の薄い文字を配置しない。

文字色とのコントラストを必ず確認する。

# 87. Focus
Keyboard Focusを消さない。

Sage系の明確なFocus Ringを表示する。

# 88. Image Alt
意味のある画像：

内容を説明するalt

装飾画像：

alt=""

を使用する。

# 89. Performance
Google Fontsは必要Weightのみロードする。

画像：

- AVIF
- WebP
- Responsive Image
- Lazy Loading

等を利用する。

# 90. Font Performance
Zen Maru Gothicは使用範囲が限定されるため、不要なWeightをロードしない。

初期候補：

Zen Maru Gothic

700

Noto Sans JP

400

500

700

# 91. Dark Mode
Phase 1では実装しない。

ブランド・コンテンツ制作を優先する。

# 92. Design Token
色・Font・Spacing・Radius等は直接値を各Componentへ書かず、Tokenとして管理する。

例：

:root {

  --color-primary: #547C73;

  --color-accent: #C96F55;

  --color-background: #FAF9F6;

  --color-surface: #FFFFFF;

  --color-text: #292D2B;

  --font-brand: "Zen Maru Gothic", sans-serif;

  --font-base: "Noto Sans JP", sans-serif;

  --radius-sm: 4px;

  --radius-md: 8px;

  --radius-lg: 12px;

}

# 93. Component Design
最低限以下を独立Component化する。

Button

ArticleCard

ReportCard

InterviewCard

ThemeCard

IndustryCard

CTA

StatCard

KeyFinding

Chart

Table

Quote

ResearchMethod

AuthorProfile

CompanyProfile

SourceList

Breadcrumb

# 94. コンポーネント再利用
同じUIをページごとに微妙に作り直さない。

ただし、

Article / Report / Interviewをすべて同じCardに統合する

ような過剰な共通化もしない。

# 95. Design Variant
必要なComponentでは、

size

variant

theme

等で差分を管理する。

例：

CTA

- report
- interview
- contact

# 96. デザイン品質の優先順位
実装判断で迷った場合は、

可読性

↓

情報理解

↓

信頼性

↓

ブランド一貫性

↓

装飾性

の順で優先する。

# 97. 「研究所感」の作り方
研究所感を、

- 白衣
- フラスコ
- 虫眼鏡
- 実験室

等の直接的モチーフで表現しない。

代わりに、

- Data
- Source
- Research Method
- Number
- Chart
- Report
- Editorial Structure

によって表現する。

# 98. 「人間味」の作り方
人間味を、

- Zen Maru Gothic
- Warm White
- Terracotta
- Interview写真
- 実際の言葉
- 現場写真

によって表現する。

かわいいイラストで表現しすぎない。

# 99. 「未来感」の作り方
未来感は、

- 余白
- 整理されたUI
- Data Visualization
- DXコンテンツ
- シンプルなIcon

等で自然に表現する。

ネオン・紫グラデーション等は不要。

# 100. 人手不足研究所らしい画面
理想的な画面を一言で表すと、

**データを見れば信頼でき、写真を見れば人が見え、文章を読めば現場が分かる。**

状態を目指す。

# 101. やってはいけないデザイン
以下を避ける。

### SaaS化
Blue Gradient

巨大な角丸

3D Illustration

Glow

大量のPill

### 官公庁化
文字だらけ

小さいFont

余白不足

リンク一覧中心

### 採用サイト化
笑顔の人物写真ばかり

キャッチコピー中心

会社紹介中心

### ニュースサイト化
最新記事

最新記事

ランキング

広告

人手不足研究所独自の情報体験を維持する。

# 102. 初期デザイン優先ページ
デザイン検証は以下の順で行う。

### 1
TOP

### 2
Article

### 3
Report

### 4
Interview

### 5
Theme Hub

### 6
Industry Hub

この6画面でブランドシステムの大半を確認できる。

# 103. デザイン検証用コンテンツ
ダミーテキストではなく、可能な限り実際のコンテンツを利用する。

特に、

建設業は本当に人手不足なのか

等の既存Articleを利用して検証する。

理由は、

- 長いタイトル
- 数字
- 表
- グラフ
- 出典
- CTA

を実データで確認できるため。

# 104. Desktop / Mobile同時検証
PCデザイン完成後にMobileを作らない。

各主要ページについて、

Desktop

+

Mobile

を同時に確認する。

# 105. 初期実装では固定しすぎないもの
以下は実際の画面を見ながら微調整可能とする。

- H1サイズ
- Section Gap
- Card Radius
- Exact Color Value
- Article Width
- Hero Height
- Chartサイズ

本設計書の思想を維持する範囲で調整してよい。

# 106. 06最重要原則
### 原則1
**Warm White × Sage Green × Terracotta × Charcoalをブランドカラーとする。**

### 原則2
**Zen Maru Gothicはブランド表現、Noto Sans JPは情報表現に使う。**

### 原則3
**研究所感はデータ・出典・調査構造によって作る。**

### 原則4
**人間味は写真・色・言葉・Typographyによって作る。**

### 原則5
**Article / Report / Interviewを視覚的に区別する。**

### 原則6
**独自グラフ・統計を主要なブランド資産として扱う。**

### 原則7
**ストックフォト依存を避ける。**

### 原則8
**過度なSaaSデザインにしない。**

### 原則9
**営業CTAより情報体験を優先する。**

### 原則10
**装飾より可読性・情報理解・信頼性を優先する。**

# 107. 07への引き継ぎ
06までで、

01 情報

↓

02 構造

↓

03 データ

↓

04 SEO / AIO

↓

05 ページ

↓

06 デザイン

まで定義された。

次の設計では、これらを実際の運用・CV・フォーム・問い合わせ・レポートDL等へ接続する。

特に、

- Report DL
- フォーム
- CTA
- 取材依頼
- 問い合わせ
- 将来的なサービス相談
- 計測

の関係を整理する。

# 108. 結論
人手不足研究所のビジュアルは、

**Warm White × Sage Green × Terracotta × Charcoal**

を基調とし、

**Zen Maru Gothic × Noto Sans JP**

によって、研究・データの信頼性と、人を扱うメディアとしての温度感を両立する。

目指すのは「かっこいいBtoBサイト」ではない。

**現場の人手不足について、本気で調べ、データを集め、人に会い、解決策を考えている研究メディア**

であることが画面から伝わるデザインとする。

そのため、独自データ、グラフ、実際の企業・人物写真、インタビュー、出典をデザインの中心に据える。

**「データを見れば信頼でき、写真を見れば人が見え、文章を読めば現場が分かる。」**

これを人手不足研究所のUI/ブランドデザインにおける最上位の判断基準とする。
