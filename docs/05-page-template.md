# 人手不足研究所｜05 ページテンプレート設計書 v1.0
**文書名:** 05-page-template.md
**対象サイト:** 人手不足研究所
**位置づけ:** 00 基本設計書、01 情報設計書、02 サイトマップ・URL設計書、03 コンテンツモデル仕様書、04 SEO・AIO設計書の下位設計書
**目的:** 人手不足研究所における各ページの役割、情報の優先順位、基本構成、共通UI、CTA配置、モバイル表示方針を定義し、Claude Codeによる実装時のページ構造を統一する。本書はページ実装時の参照元とし、`.claude/rules/pages.md` から本ファイルを参照する。

# 1. 本設計書の目的
人手不足研究所では、すべてのページを同じ「記事テンプレート」で表示しない。

ページごとに役割を明確に分ける。

### TOP
人手不足研究所が何を扱うメディアなのかを理解し、興味のあるテーマ・業界・調査へ進む。

### Theme Hub
採用・組織・DX等のテーマを体系的に理解する。

### Industry Hub
建設・介護・物流等の業界について、人手不足を横断的に理解する。

### Article
特定の疑問・課題について深く理解する。

### Report
人手不足研究所独自の調査・分析を読み、必要に応じて詳細資料を取得する。

### Interview
企業・経営者・働く人・専門家等の一次情報から学ぶ。

### List
Report・Interview等を探索する。

### About
人手不足研究所の目的・編集思想・信頼性を理解する。

# 2. ページ設計の基本思想
すべてのページで、

何のページか分かる

↓

重要な情報が分かる

↓

詳しく理解できる

↓

関連情報へ進める

↓

必要なら次の行動を取れる

という基本構造を意識する。

# 3. 「記事一覧サイト」にしない
人手不足研究所はニュースメディアではない。

そのため、

最新記事

最新記事

最新記事

を中心としたUIにはしない。

優先順位は、

独自調査

↓

テーマ

↓

業界

↓

一次情報

↓

最新情報

を基本とする。

# 4. SEOとページUIの関係
04で定義した、

一次情報を積み上げ、テーマの代表的な情報源になる

という戦略をUIにも反映する。

特にTheme Hub / Industry Hubは、記事カードだけを並べたアーカイブページではなく、編集された独立コンテンツとして設計する。

# 5. TOPページの役割
TOPページの目的は、

人手不足研究所とは何かを理解してもらい、ユーザーが自分に関係するテーマ・業界・独自情報へ進めること

とする。

最新記事を読むことだけを目的としない。

# 6. TOPページ基本構成
基本順序：

01 Hero / FV

↓

02 注目レポート

↓

03 テーマから探す

↓

04 業界から探す

↓

05 最新の調査・データ

↓

06 企業・専門家インタビュー

↓

07 人手不足研究所の考え方

↓

08 最新記事

↓

09 人手不足研究所について

↓

10 Footer

# 7. TOP：Hero / FV
FVでは、

- サイト名
- ブランドメッセージ
- メディアの短い説明
- 主要探索導線

を表示する。

ブランドメッセージ候補：

**人が減っても、強くなる会社へ。**

説明文では、

- 人を採る
- 人を活かす
- 業務負担を減らす
- 会社を強くする

という人手不足研究所の対象領域が理解できるようにする。

ただしFVに情報を詰め込みすぎない。

# 8. TOP：FV CTA
FVでは強い営業CTAを置かない。

候補：

最新レポートを見る

記事を探す

程度。

初回訪問者に「相談してください」を最優先で求めない。

# 9. TOP：注目レポート
FV直後に配置する。

初期では建設業等の主要レポートを大きく表示する。

表示項目：

- アイキャッチ
- Reportタイトル
- 短い説明
- 調査年
- 対象業界
- 「レポートを見る」

必要に応じて「無料ダウンロード可能」等を表示する。

# 10. TOP：テーマから探す
Theme Masterを利用する。

初期候補：

採用・人材確保

組織・人事

業務改善・DX

経営改善・IT活用

各テーマには、

- テーマ名
- 1〜2行の説明
- テーマページへのリンク

を表示する。

# 11. TOP：業界から探す
Industry Masterを利用する。

初期候補：

建設

介護

物流

製造

宿泊

公開可能なコンテンツが一定量存在する業界を優先表示する。

業界ハブ未公開の場合は、検索・フィルタ結果等への代替導線も検討する。

# 12. TOP：最新の調査・データ
通常記事とは分離して表示する。

対象：

- 独自アンケート
- 統計分析
- Report
- 独自グラフ
- 調査結果

「人手不足研究所＝調査・一次情報」という認識形成に利用する。

# 13. TOP：企業・専門家インタビュー
Interviewを表示する。

カードでは、

- 写真
- タイトル
- 企業名
- 人物
- 業界
- テーマ

等から必要な情報を表示する。

単なる「最新インタビュー」ではなく、興味を引くテーマを前面に出す。

# 14. TOP：人手不足研究所の考え方
ブランド思想を簡潔に説明する。

基本概念：

採る

↓

活かす

↓

負担を減らす

↓

会社を強くする

採用・組織・DX・IT活用が独立した話ではなく、人手不足への一連の対応であることを伝える。

# 15. TOP：最新記事
最新Articleを表示する。

ただしTOP上部には置かない。

表示件数は初期3〜6件程度を想定する。

「すべての記事を見る」等の導線を用意する。

# 16. TOP：About導線
ページ後半で、

人手不足研究所について

を簡潔に説明する。

詳細は/about/へリンクする。

# 17. Theme Hubの役割
例：

/recruiting/

/organization/

/dx/

/management/

Theme Hubは、

そのテーマについて最初に読むべき総合ページ

として設計する。

記事一覧ではない。

# 18. Theme Hub基本構成
01 Breadcrumb

↓

02 H1 + テーマ概要

↓

03 現在起きていること

↓

04 重要データ

↓

05 主要課題・論点

↓

06 注目Report

↓

07 業界別に見る

↓

08 Interview

↓

09 おすすめArticle

↓

10 最新Article

↓

11 関連テーマ

# 19. Theme Hub：H1・概要
例：

# 採用・人材確保
そのテーマと人手不足との関係を説明する。

単なるSEO説明文ではなく、ユーザーがテーマ全体を理解する導入とする。

# 20. Theme Hub：現在起きていること
テーマ全体の現状を短く説明する。

例えば採用なら、

- 労働人口
- 求人倍率
- 業界差
- 若年人口
- 採用競争

等から重要な論点を編集して掲載する。

# 21. Theme Hub：重要データ
人手不足研究所の独自データまたは信頼できる統計から、テーマを理解するために重要な数字を表示する。

カード・グラフ等を利用可能とする。

# 22. Theme Hub：主要課題
そのテーマを構成する論点を整理する。

例：採用

採用市場を知る

求人を届ける

会社を知ってもらう

応募につなげる

選考する

入社につなげる

各論点からArticle等へリンク可能とする。

# 23. Theme Hub：注目Report
テーマに関連する主要Reportを優先表示する。

最新Reportだけでなく、編集上重要なReportを表示可能とする。

# 24. Theme Hub：業界別導線
例：

建設の採用

介護の採用

物流の採用

製造の採用

宿泊の採用

関連コンテンツが十分存在する業界のみ表示する。

# 25. Theme Hub：Interview
そのテーマに関する企業・専門家・働く人のInterviewを表示する。

一般論だけではなく一次情報へ接続する。

# 26. Theme Hub：固定領域と動的領域
上部：

テーマ概要

現状

重要データ

主要論点

は編集された固定領域。

下部：

Report

Interview

おすすめArticle

最新Article

はCMS/MDXデータから動的生成する。

# 27. Industry Hubの役割
例：

/industries/construction/

Industry Hubは、

その業界の人手不足について横断的に理解する総合ページ

とする。

# 28. Industry Hub基本構成
01 Breadcrumb

↓

02 H1 + 業界概要

↓

03 人手不足の現状

↓

04 主要統計

↓

05 採用・人材確保

↓

06 組織・人材定着

↓

07 業務改善・DX

↓

08 経営改善・IT活用

↓

09 注目Report

↓

10 Interview

↓

11 おすすめArticle

↓

12 最新Article

# 29. Theme Hubとの違い
Theme Hub：

一つの課題を複数業界から見る。

Industry Hub：

一つの業界を複数課題から見る。

この違いをページ構造にも反映する。

# 30. Industry Hub：人手不足の現状
業界固有の、

- 就業者数
- 年齢構成
- 求人状況
- 市場規模
- 将来予測

等から重要情報を掲載する。

# 31. Industry Hub：テーマ別セクション
03のTheme Masterを利用し、

採用

組織

DX

経営・IT

へ横断できるようにする。

各テーマでは概要＋主要Articleを表示する。

# 32. Industry Hub：Report
業界別Reportを重要コンテンツとして大きく扱う。

例えば建設なら、

建設業人手不足レポート2026

を主要コンテンツとして配置する。

# 33. Articleページの役割
Articleは、

特定の疑問・課題について、読者が十分に理解できるページ

とする。

検索流入だけでなく、Report・Interview・Theme Hub等へ接続する役割を持つ。

# 34. Article基本構成
初期推奨：

01 Breadcrumb

↓

02 Category / Metadata

↓

03 H1

↓

04 Description

↓

05 Published / Updated / Author

↓

06 Eyecatch

↓

07 要点

↓

08 目次

↓

09 本文

↓

10 関連Report / 主要CTA

↓

11 関連コンテンツ

↓

12 執筆・編集・監修

↓

13 参考資料・出典

↓

14 更新履歴

# 35. Article末尾について
Article末尾の、

CTA

関連記事

Author

Sources

Revision

の最終順序については、運用開始後のUX・CV・記事タイプによって調整可能とする。

v1.0では上記を初期推奨とする。

テンプレート実装では順序変更が容易なコンポーネント構造とする。

# 36. Article：要点
長文Articleでは、

この記事で分かること

または、

要点

を設置可能とする。

必須ではない。

短い記事では省略する。

# 37. Article：目次
H2/H3から自動生成する。

長文の場合のみ表示する。

モバイルでは折りたたみ可能とする。

# 38. Article：本文
本文はMDXで管理する。

対応要素：

- H2
- H3
- paragraph
- list
- table
- image
- figure
- quote
- note
- data highlight
- CTA

等。

# 39. Article：関連Report
記事と強く関連するReportがある場合、通常の関連記事より強く表示する。

例：

このテーマを詳しくまとめたレポート

としてカード表示する。

# 40. Reportページの役割
Reportは、

SEOページ

+

調査成果物

+

ダウンロードページ

の3役を持つ。

PDFを取得しなければ価値が分からないページにはしない。

# 41. Report基本構成
01 Breadcrumb

↓

02 Report Label

↓

03 H1

↓

04 Description

↓

05 調査概要

↓

06 Primary Download CTA

↓

07 重要な発見

↓

08 主要データ・図表

↓

09 分析・考察

↓

10 Secondary Download CTA

↓

11 調査方法

↓

12 関連Article / Interview

↓

13 Download Form

↓

14 執筆・編集・監修

↓

15 参考資料・出典

↓

16 更新履歴

# 42. Report：調査概要
03のResearch Dataから自動生成する。

表示候補：

- 調査名
- 調査主体
- 調査期間
- 調査対象
- 回答数
- 調査方法
- 公開日
- 更新日

存在する情報のみ表示する。

# 43. Report：重要な発見
ページ上部で、

この調査から分かったこと

を3〜5点程度表示可能とする。

数字・結論を具体的にする。

# 44. Report：主要データ
Reportの価値をWeb上でも十分公開する。

例：

- グラフ
- 比較表
- 重要数値
- インタビュー結果
- アンケート結果

PDFだけに情報を閉じ込めない。

# 45. Report：Download CTA
基本3箇所を想定する。

### CTA 1
ページ上部。

レポートを無料でダウンロード

### CTA 2
主要データ閲覧後。

詳細データ・分析を見る

### CTA 3
ページ後半。

Download Form。

# 46. Report：フォーム
フォーム自体を3回表示しない。

原則ページ後半に1フォームを配置する。

上部・中部CTAはフォーム位置へスクロールするか、将来的にモーダル表示を検討する。

# 47. Report：WebとPDFの価値分担
Web：

- 主要結論
- 主要データ
- 概要
- 一部分析

PDF：

- 詳細データ
- 全グラフ
- 詳細考察
- インタビュー詳細
- 保存・共有用途

等を基本とする。

PDFを取得しなくてもページ単体で検索ユーザーの疑問に答える。

# 48. Interviewページの役割
Interviewは、

実際の企業・人の経験を通じて、人手不足に対する具体的な知見を得る

ページとする。

同時に取材企業にとっての紹介機会にもする。

# 49. Interview基本構成
01 Breadcrumb

↓

02 Interview Label / Theme

↓

03 H1

↓

04 Description

↓

05 取材企業・人物 Compact Profile

↓

06 Published / Interview Date / Author

↓

07 Eyecatch / Interview Photo

↓

08 Interview本文

↓

09 取材企業 Detail Profile

↓

10 公式サイト・採用ページ・求人情報

↓

11 関連Report

↓

12 関連Article / Interview

↓

13 取材募集CTA

↓

14 執筆・編集

# 50. Interview：冒頭企業紹介
冒頭ではコンパクトにする。

例：

### 今回お話を聞いた会社
**株式会社○○**

建設業｜石川県
○○工事を中心に展開。

**○○ ○○さん**
代表取締役

記事理解に必要な最低限の情報のみ。

# 51. Interview：末尾企業紹介
記事末尾では詳細情報を表示する。

03のCompany Masterから自動生成する。

例：

## 株式会社○○について
企業説明……

**所在地**
石川県○○市

**事業内容**
○○

公式サイト →

採用ページ →

Indeedで募集中の求人を見る →

# 52. Interview：企業リンク
Company Masterに存在するもののみ表示する。

優先順位：

公式サイト

↓

公式採用ページ

↓

求人情報

↓

関連サービス等

status: inactiveのリンクは表示しない。

# 53. Interview：取材募集CTA
記事末尾では、

人手不足研究所では、企業・経営者・働く方・専門家への取材を行っています。

等の導線を設置可能とする。

取材依頼ページまたは問い合わせへ接続する。

# 54. Report一覧ページ
URL：

/reports/

単純なカード一覧ではなく、

人手不足に関する調査・レポートを探す場所

として設計する。

# 55. Report一覧基本構成
H1

↓

説明

↓

注目Report

↓

テーマから探す

↓

業界から探す

↓

Report一覧

↓

必要に応じてPagination

# 56. Reportカード
表示候補：

- Eyecatch
- Report名
- 年
- 業界
- テーマ
- Description
- DL可能表示

通常Articleカードとの差別化を行う。

# 57. 将来のテーマ別Reportページ
Report数が増えた場合、

/reports/recruiting/

/reports/dx/

等を検討可能。

ただし02・04で定義したSEOページ追加基準を満たす場合のみindexする。

# 58. Interview一覧ページ
URL：

/interviews/

基本構成：

H1

↓

説明

↓

注目Interview

↓

業界から探す

↓

テーマから探す

↓

Interview一覧

# 59. Interviewカード
写真を比較的大きく扱う。

表示候補：

- 人物 / 現場写真
- タイトル
- 企業名
- 人物名
- 業界
- テーマ

Reportより人物性を感じるUIにする。

# 60. Aboutページ
URL：

/about/

単なる運営会社紹介ではなく、

人手不足研究所がなぜ存在するのか

を説明するページとする。

# 61. About基本構成
H1

↓

人手不足研究所とは

↓

問題意識

↓

採る・活かす・減らす・強くする

↓

扱うテーマ

↓

扱う業界

↓

情報の作り方

↓

一次情報・調査方針

↓

編集方針

↓

運営者

↓

取材・問い合わせ

# 62. About：情報の作り方
以下を明示する。

- インタビュー
- アンケート
- 公的統計
- 独自分析
- 企業事例
- 専門家取材

「どこから情報を得ているメディアなのか」を説明する。

# 63. About：営業色
サービス販売ページにはしない。

人手不足研究所への信頼形成を優先する。

必要に応じて問い合わせ・相談へのリンクを設置する。

# 64. CTA基本方針
CTAはページ閲覧を妨げない。

初回訪問時から、

問い合わせ
相談
商談

を過度に要求しない。

コンテンツ文脈に合ったCTAを優先する。

# 65. CTA優先順位
初期：

### Report
レポートDL。

### Article
関連Report。

### Interview
取材企業へのリンク / 関連Report / 取材募集。

### Theme / Industry Hub
主要Report / 関連コンテンツ。

# 66. サービス相談CTA
将来的に、

- 採用支援
- 業務改善
- Excel整理
- ファイル整理
- システム開発
- Web制作

等へ接続可能とする。

ただしメディア立ち上げ初期は、コンテンツ価値・信頼形成を優先する。

# 67. CTAコンポーネント
03のCTA Masterから生成する。

共通構造：

Title

Description

Button

CTA Typeに応じて見た目を変えられるようにする。

# 68. Header
Headerには最低限、

Logo / Site Name

Theme

Industry

Reports

Interviews

About

Search

を想定する。

ただし最終的なナビゲーション数は06 UI設計で調整する。

# 69. グローバルナビ
初期候補：

テーマから探す

業界から探す

レポート

インタビュー

人手不足研究所について

「記事一覧」を最重要ナビにはしない。

# 70. Search
初期は簡易検索または未実装でもよい。

実装する場合はヘッダーからアクセス可能とする。

将来的に、

- Keyword
- Theme
- Industry
- Job
- Area
- Content Type

で探索可能にする。

# 71. Breadcrumb
Article / Report / Interview / Hubで表示する。

モバイルでは省スペース化可能。

02のパンくず仕様に従う。

# 72. Footer
最低限：

人手不足研究所

About

テーマ

業界

Reports

Interviews

お問い合わせ

運営者情報

Privacy Policy

等を配置する。

# 73. コンテンツカード
用途に応じてカードを分ける。

### Article Card
情報中心。

### Report Card
調査・資料感。

### Interview Card
人物・企業中心。

### Theme Card
課題探索。

### Industry Card
業界探索。

一つのカードUIを全用途で使い回さない。

# 74. Article Card
候補：

Eyecatch

Theme

Title

Description

PublishedAt

情報量は一覧種類によって調整する。

# 75. Report Card
候補：

Eyecatch

Report Label

Year

Title

Description

Industry

Download Available

# 76. Interview Card
候補：

Photo

Interview Label

Title

Company

Person

Industry

# 77. データ・グラフUI
独自調査を強く見せるため、共通コンポーネントを用意する。

候補：

### Stat Card
92万人減

2005 → 2025

### Chart
グラフ＋Caption＋Source。

### Key Finding
重要な発見。

### Comparison
Before / After等。

# 78. Source表示
03のSource Masterから生成。

記事末尾では統一UIにする。

本文内で必要な場合はインラインSource表示も可能とする。

# 79. Author UI
03のPeople Masterから生成。

表示候補：

- 氏名
- 写真
- 肩書
- 短いプロフィール

Article末尾では必要に応じて詳細表示する。

# 80. Reviewer UI
監修者が存在する場合のみ表示。

著者と監修者の役割が分かるようにする。

# 81. Tag表示
Tagはユーザーに有益な場合のみ表示する。

すべての内部Taxonomyを画面に表示する必要はない。

タグ大量表示を避ける。

# 82. シェア機能
Article / Report / InterviewにSNS共有機能を設置可能とする。

初期実装の優先度は低い。

外部チャネル設計時に詳細を決定する。

# 83. モバイルファースト
各ページはスマートフォンでの閲覧を前提に設計する。

特に、

- 長文
- Report
- Interview
- SNS流入

でモバイル閲覧が発生することを想定する。

# 84. モバイル：FV
TOPのFVは情報を詰め込みすぎない。

基本：

Brand

↓

Message

↓

Short Description

↓

Primary CTA

程度にする。

# 85. モバイル：目次
Article / Reportの目次は折りたたみ可能とする。

長い目次を常時展開しない。

# 86. モバイル：Table
横幅を超える表は、

- 横スクロール
- カード変換

等を内容に応じて使う。

文字を極端に小さくしない。

# 87. モバイル：Chart
Chartはスマートフォン幅で理解可能な形にする。

必要ならPC用とモバイル用でレイアウトを変更する。

# 88. モバイル：CTA
画面を大きく占有する常時固定CTAは初期では原則使用しない。

Report等で必要性が確認された場合に検討する。

# 89. モバイル：関連コンテンツ
カードを縦方向に表示する。

表示件数を増やしすぎない。

# 90. モバイル：Interview
冒頭プロフィールは、

Photo

↓

Company

↓

Person

↓

Short Profile

等の縦配置を基本とする。

# 91. アクセシビリティ
最低限以下を考慮する。

- 適切な見出し階層
- alt
- 十分な文字サイズ
- 十分なコントラスト
- Keyboard操作
- Link / Buttonの区別
- Form Label
- Focus表示

詳細は06で定義する。

# 92. ページ速度
過度なアニメーションや巨大画像を避ける。

特にReport・Interviewでは画像数が増えるため、

- image optimization
- lazy loading
- 適切なサイズ
- WebP/AVIF等

を技術設計で検討する。

# 93. Empty State
関連Report等が存在しない場合に、

関連レポートはありません

のような空セクションを表示しない。

データがないセクション自体を非表示にする。

# 94. 自動生成と編集指定
原則：

### 自動
- 最新記事
- Taxonomy
- Author
- Sources
- Company情報

### 編集指定優先
- 注目Report
- おすすめArticle
- relatedContent
- CTA
- TOP特集

とする。

編集意図を自動ロジックより優先する。

# 95. TOP更新負荷
TOPを更新するたびコード変更が必要な設計にしない。

可能な限り、

featured

publishedAt

contentType

等から自動生成する。

ただしHero Report等の重要枠は編集指定可能にする。

# 96. Hub更新負荷
Theme / Industry Hubも、

固定Editorial Content

+

自動Content Feed

で構成する。

新しい記事公開のたびにHub本文を手動更新しなくても関連コンテンツが追加されるようにする。

# 97. 05と06の境界
05では、

何をどこに配置するか

を定義する。

06では、

どう見せるか

を定義する。

したがって05では、

- 色
- Font
- Radius
- Shadow
- 詳細Spacing
- Animation

等は原則確定しない。

# 98. 05と03の関係
03：

どんなデータを持つか。

05：

そのデータをどこに表示するか。

例：

03 Company Master

↓

05 Interview冒頭Compact Profile

↓

05 Interview末尾Detail Profile

という関係。

# 99. 05と04の関係
04：

SEO/AIO上どんなページを強くするか。

05：

そのページをユーザーにとって価値のあるページとしてどう構成するか。

特にTheme / Industry / Reportでは04の方針を優先する。

# 100. 初期実装優先順位
Phase 1：

### 必須
- TOP
- Theme Hub
- Article
- Report
- Interview
- Report List
- Interview List
- About
- Header
- Footer
- Breadcrumb
- Article Card
- Report Card
- Interview Card
- CTA
- Source
- Author
- Company Profile

### コンテンツ量に応じて実装
- Industry Hub
- Search
- Job Hub
- Area Hub
- Theme別Report List

# 101. 初期段階で作り込みすぎないもの
- 高度な検索UI
- パーソナライズ
- 人気ランキング
- 複雑なRecommendation
- 常時固定CTA
- SNS埋め込み
- 動画専用UI
- 高度なAuthorページ
- Company Database UI

必要性が発生した段階で追加する。

# 102. ページごとの最重要目的
| **ページ** | **最重要目的** |
| --- | --- |
| TOP | ブランド理解・探索 |
| Theme Hub | テーマの体系的理解 |
| Industry Hub | 業界の体系的理解 |
| Article | 疑問・課題の解決 |
| Report | 独自情報の提供・DL |
| Interview | 一次情報・企業理解 |
| Report List | 調査探索 |
| Interview List | 一次情報探索 |
| About | 信頼形成 |

# 103. ページ間の基本導線
サイト全体として、

TOP

↓

Theme / Industry

↓

Article / Report / Interview

↓

関連Article / Report / Interview

↓

Theme / Industry

と回遊できるようにする。

どのページも完全な行き止まりにしない。

# 104. 初期ユーザージャーニー例
### 検索ユーザー
Google

↓

「建設業は本当に人手不足なのか」

↓

Article

↓

建設業人手不足Report

↓

Download

### TOP訪問
TOP

↓

建設

↓

Industry Hub

↓

Report

↓

Interview

### SNSユーザー
SNS

↓

Interview

↓

Company

↓

関連Article

↓

Report

外部チャネルの詳細設計は後続設計書で行う。

# 105. 本設計の最重要原則
### 原則1
**TOPを最新記事一覧にしない。**

### 原則2
**Theme Hubを独立したSEO・編集コンテンツとして作る。**

### 原則3
**Industry Hubでは業界をテーマ横断で理解できるようにする。**

### 原則4
**ReportはWeb上でも十分な情報を公開する。**

### 原則5
**Reportのフォームは原則1つ、CTAは複数配置可能とする。**

### 原則6
**Interviewでは冒頭と末尾で企業情報を表示し、それぞれ役割を変える。**

### 原則7
**企業公式サイト・採用ページ・求人情報への導線を提供する。**

### 原則8
**Article / Report / Interviewを相互接続する。**

### 原則9
**固定編集コンテンツと自動生成コンテンツを組み合わせる。**

### 原則10
**コンテンツ価値を優先し、初期段階で営業CTAを強くしすぎない。**

# 106. 06への引き継ぎ事項
次の06では、本設計をもとに、

- ブランドトーン
- カラー
- Typography
- Grid
- Spacing
- Header
- Card
- Button
- Report表現
- Interview表現
- Chart
- CTA
- Responsive Design

等のビジュアル・UIルールを定義する。

特に、

**「研究所としての信頼感」と「中小企業経営者にも読みやすい親しみやすさ」をどう両立するか**

を主要デザイン課題とする。

# 107. 結論
人手不足研究所のページ設計では、

**記事を並べるのではなく、調査・テーマ・業界・企業・人をつないで、ユーザーが人手不足という問題を理解していく情報体験を作る。**

ことを基本とする。

TOPで世界観と主要情報を提示し、

Theme

Industry

↓

Article

Report

Interview

へユーザーを導く。

Reportでは独自情報を提供し、Interviewでは現場の一次情報を蓄積する。

これらを相互接続することで、

**検索して1記事だけ読むメディアから、人手不足について継続的に調べるための情報基盤へ**

発展できるページ構造を目指す。
