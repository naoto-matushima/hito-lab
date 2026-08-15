# 人手不足研究所｜07 CV・導線・リード設計書 v1.0
**文書名:** 07-conversion-lead.md
**対象サイト:** 人手不足研究所
**位置づけ:** 00〜06で定義したブランド、情報設計、SEO/AIO、コンテンツモデル、ページ設計、UI設計を、具体的なCV・フォーム・リード管理・企業DB化へ接続する設計書
**目的:** 人手不足研究所のコンテンツ閲覧から、レポートDL・取材・問い合わせ・サービス相談までを自然につなぎ、その接点情報を将来的な企業・人物・行動データベースとして蓄積できる構造を定義する。

# 1. 本設計書の目的
人手不足研究所では、SEO流入や記事閲覧そのものを最終成果としない。

サイトを通じて、

- 企業との接点をつくる
- 読者の関心テーマを把握する
- 取材候補企業を増やす
- レポート読者を蓄積する
- 将来的なサービス相談につなげる
- 企業情報を継続的に蓄積する

ことを目指す。

そのため、CVを単なる「フォーム送信」として扱わず、

**Company × Person × Activity**

として継続的に蓄積する。

# 2. CVの基本方針
初期段階では、CVを以下の4種類に分ける。

1. Report Download

2. Interview / 取材

3. General Contact

4. Service Lead

目的・温度感が異なるため、一つの「お問い合わせ」へ統合しない。

# 3. CV Type
内部ID候補：

report-download

interview-request

contact

service-lead

全CVはleadTypeとして識別可能にする。

# 4. CVの優先順位
初期フェーズでは以下の優先順位とする。

### Primary CV
**Report Download**

人手不足研究所の最重要CV。

独自レポートを通じて企業との最初の接点をつくる。

### Secondary CV
**Interview / 取材**

一次情報の獲得と企業との関係構築を目的とする。

### Third CV
**General Contact**

メディア、引用、協業、その他問い合わせを受ける。

### Fourth CV
**Service Lead**

採用・人事・業務改善・DX・IT・Web等の具体的な相談を受ける。

初期段階では前面に出しすぎず、文脈に応じて自然に提示する。

# 5. CVごとの役割
## Report Download
目的：

- リード獲得
- 関心テーマ把握
- 企業情報取得
- 次のコンテンツ接点形成

## Interview Request
目的：

- 一次情報取得
- 企業との関係構築
- Company Master拡充
- 将来的なInterview / Report素材取得

## Contact
目的：

- メディア問い合わせ
- 引用
- 協業
- その他連絡

## Service Lead
目的：

- 採用
- 組織・人事
- 業務改善
- DX
- Excel整理
- ファイル整理
- IT支援
- システム開発
- Web制作
- 予約サイト
- その他経営改善

等の具体相談取得。

# 6. 共通フォーム項目
4CV共通で以下を基本入力項目とする。

## 必須
会社名

メールアドレス

氏名

役職

会社URL

業界

## 任意
電話番号

課題・相談内容

# 7. 会社URLを必須とする理由
会社URLは単なる連絡先ではなく、将来的な企業DB構築の起点として利用する。

URLから将来的に、

- 会社情報
- 所在地
- 事業内容
- 業界
- 採用ページ
- 求人情報
- Webサイト状況
- 提供サービス
- IT活用状況
- 人材募集状況

等を追加調査できる。

そのため、会社URLを初期から必須情報とする。

# 8. 業界
業界はIndustry Masterから生成する。フォーム側で独自の業界リストを持たない。

選択肢は Industry Master の `status: active` と `status: planned` の両方を対象とする（03 §59）。コンテンツで使用可能な業界と、問い合わせを受け付ける業界は範囲が異なるため。

初期の選択肢：

建設

介護

物流

製造

宿泊

飲食

小売

警備

清掃

設備・メンテナンス

その他

フォーム上はSelect形式を基本とする。

# 9. Common Lead Fields
データ上は、共通入力項目を一つのモデルとして扱う。

概念例：

companyName:

companyUrl:

personName:

email:

role:

industry:

phone:

issue:

4フォームで同じ入力UI・validationを再利用する。

# 10. Report Download Form
基本入力：

### 必須
- 会社名
- 会社URL
- 氏名
- メールアドレス
- 役職
- 業界

### 任意
- 電話番号
- 現在の課題

# 11. Report Download固有情報
フォーム送信時にユーザー入力とは別に自動記録する。

leadType: report-download

reportId:

sourceContentId:

landingPage:

これにより、

どのReportを、どの記事・ページ経由で取得したのか

を記録できる。

# 12. Interview Request Form
基本情報に加えて、以下を追加可能とする。

### 任意 / 必要に応じて
取材対象者

取材可能なテーマ

企業として紹介したい取り組み

例：

- 採用
- 定着
- 評価制度
- 業務改善
- DX
- IT活用
- 経営改善
- 人材育成

# 13. Interview Requestの入力負荷
取材応募フォームで大量入力を要求しない。

まず、

誰に・何について話を聞けるか

が分かれば十分。

詳細は後のやり取りで取得する。

# 14. General Contact Form
共通項目に加えて、

問い合わせ種別

問い合わせ内容

を持つ。

問い合わせ種別候補：

- メディア掲載
- 引用・転載
- 協業
- レポート
- 取材
- その他

# 15. Service Lead Form
共通項目＋、

相談カテゴリ

課題・相談内容

電話番号

を持つ。

課題・電話番号は任意とする。

# 16. Service Category
初期候補：

採用・人材確保

組織・人事・定着

業務改善

Excel整理

ファイル整理

DX・IT活用

システム開発

Webサイト

採用サイト

予約サイト

その他

サイト運用後、実際の相談内容を見ながら調整可能とする。

# 17. Service Leadの見せ方
初期段階では、

サービス一覧を見る

を強く押し出さない。

Articleの文脈に合わせて、

採用について相談する

業務改善について相談する

Excel業務について相談する

IT活用について相談する

のように自然なCTAを設置する。

裏側ではすべてservice-leadとして管理する。

# 18. ページ別CTA
## TOP
Primary：

最新レポートを見る

Secondary：

記事を探す

サービス相談を最優先にはしない。

## Article
優先：

関連Report

次点：

関連コンテンツ

文脈が強い場合のみ：

このテーマについて相談する

## Report
Primary：

レポートをダウンロード

## Interview
優先：

企業公式サイト

採用ページ

求人情報

次点：

取材を希望する

必要に応じて関連Report。

## Theme Hub
Primary：

主要Report

必要に応じて：

このテーマについて相談する

## Industry Hub
Primary：

業界Report

Secondary：

Interview

必要に応じて：

この業界の課題について相談する

## About
取材について

お問い合わせ

# 19. CTA Masterとの連携
03で定義したCTA Masterを利用する。

例：

id: cta_construction-report

type: report-download

id: cta_dx-consultation

type: service-lead

記事ごとにCTA文言をベタ書きしない。

# 20. CTA優先順位
複数CTAが存在する場合、

コンテンツ価値

↓

関連Report

↓

取材

↓

相談

を原則とする。

営業CTAをコンテンツ閲覧より優先しない。

# 21. Report CTA配置
05で定義した通り、ReportにはCTAを3箇所まで配置可能とする。

### 上部
「無料でレポートをダウンロード」

### 中部
主要データ閲覧後

「詳細データを見る」

### 下部
Download Form

フォームそのものは原則1つ。

# 22. Thank You Page
CV Typeごとに別のThank You体験を設計する。

一律の、

送信ありがとうございました

だけで終わらせない。

# 23. Report Download Thank You
基本構成：

DL完了メッセージ

↓

PDF取得

↓

関連Article

↓

関連Interview

↓

同業界のReport

↓

必要に応じて相談

# 24. PDF取得方法
送信後、

- Thank Youページから取得
- メールでも取得リンク送付

の両方を検討する。

初期では最低限どちらか一方を実装する。

# 25. Interview Thank You
基本：

受付完了

↓

今後の流れ

↓

事務局から連絡する旨

↓

過去Interview

# 26. Contact Thank You
基本：

受付完了

↓

返信について

↓

TOP / About等への導線

シンプルにする。

# 27. Service Lead Thank You
基本：

相談受付

↓

今後の連絡

↓

関連Article

↓

関連Report

営業LPのように追い込みすぎない。

# 28. Leadデータモデル
フォーム送信は単純なメール送信だけで終わらせない。

概念的に以下を保持する。

id:

leadType:

companyId:

personId:

companyName:

companyUrl:

industry:

personName:

email:

role:

phone:

issue:

sourceContentId:

reportId:

landingPage:

utmSource:

utmMedium:

utmCampaign:

utmContent:

utmTerm:

createdAt:

# 29. Company / Person / Activity
長期的には、

Company

   ↓

Person

   ↓

Activity

として管理する。

# 30. Company
企業単位の情報。

例：

companyId:

companyName:

companyUrl:

industry:

将来的に、

- 所在地
- 従業員規模
- 事業内容
- 採用情報
- 求人
- IT状況

等を追加可能とする。

# 31. Person
企業に属する人物。

personId:

companyId:

name:

email:

role:

phone:

同一人物による複数CVを一元管理する。

# 32. Activity
各接点を履歴として保存する。

例：

activityId:

companyId:

personId:

type: report-download

contentId:

reportId:

createdAt:

# 33. Activity例
同一企業・人物が、

4月

建設業Report DL

6月

別Report DL

8月

Interview応募

10月

サービス相談

した場合、4Leadとしてバラバラに扱わず、

一企業・一人物の4つのActivity

として記録できる設計を目指す。

# 34. Company Masterとの関係
03で定義したCompany Masterは、初期では主にInterview企業向け。

将来的には、

メディアと接点を持った企業全体

へ拡張可能な構造とする。

ただしPhase 1でCompany MasterとLead DBを無理に完全統合する必要はない。

将来統合しやすいID設計にする。

# 35. Company重複判定
会社URLは企業識別の強いシグナルとして利用する。

ただしURLだけを唯一のPrimary Keyにはしない。

理由：

- ドメイン変更
- 複数ドメイン
- 採用専用ドメイン
- グループ会社

等が存在するため。

内部companyIdを正式な識別子とする。

# 36. Person重複判定
Emailを主要な重複判定シグナルとする。

ただし、メール変更等を考慮し、正式識別子はpersonIdとする。

# 37. Source Tracking
各CVについて、

どこから来たのか

を記録する。

最低限：

landingPage:

sourceContentId:

# 38. UTM
外部流入ではUTMを取得可能にする。

utm_source

utm_medium

utm_campaign

utm_content

utm_term

SNS・広告・メール等との連携時に利用する。

# 39. UTM例
utm_source=instagram

utm_medium=social

utm_campaign=construction_report_2026

# 40. sourceContentId
例えば、

Google

↓

建設業人手不足Article

↓

Report

↓

Download

の場合、可能であれば、

sourceContentId: cnt_construction_labor_shortage

reportId: report_construction_2026

を記録する。

# 41. 計測イベント
最低限以下を計測する。

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

# 42. イベント共通パラメータ
可能であれば、

content_id

content_type

primary_theme

industry

cta_id

report_id

company_id

等を付与する。

# 43. Report分析
将来的に、

どの記事がReport DLにつながったか

を確認できるようにする。

例：

Article

↓

Report CTA

↓

Form

↓

DL

# 44. Interview分析
Interviewについては、

Interview View

↓

Company Site Click

↓

Recruitment Page Click

↓

Job Link Click

を計測する。

取材企業側へ、

掲載後どれくらいクリックされたか

を将来的に共有できる可能性もある。

# 45. Service Lead分析
確認したいこと：

- どの記事から相談が発生したか
- どのThemeか
- どのIndustryか
- 過去にReportをDLしていたか

# 46. リードスコア
Phase 1では高度なLead Scoringを実装しない。

ただし将来的に、

Report DL

Interview

複数Report DL

Service Lead

などから温度感を判定可能なデータを残す。

# 47. リード深掘り
会社URLを基に、運営側で後から企業情報を補完できる設計とする。

例：

会社概要

所在地

従業員数

採用ページ

求人媒体

採用職種

Webサイト状況

DX状況

等。

初期段階では手動でもよい。

# 48. 企業DB化
将来的には、

メディア接点

+

Interview

+

Report DL

+

企業調査

+

求人情報

+

サービス相談

を企業単位で統合する。

これにより人手不足研究所自体が、

人手不足企業に関する独自企業DB

を形成する可能性を持つ。

# 49. Privacy
フォームでは個人情報利用目的を明示する。

最低限、

- 入力情報の利用目的
- 問い合わせ対応
- Report提供
- 必要な案内
- Privacy Policyへのリンク

を表示する。

# 50. 同意
フォーム送信前に、

プライバシーポリシーに同意する

等の明確な同意UIを設ける。

実際の法務表現は公開前に確認する。

# 51. Marketing Communication
Report DLを理由に、無制限に営業連絡する前提にはしない。

メール配信・マーケティング案内を行う場合は、利用目的・配信方針を明確にする。

必要に応じて、

人手不足研究所から関連情報を受け取る

等の別同意を検討する。

# 52. 配信停止
メールマーケティングを開始する場合は、配信停止導線を提供する。

Phase 1でメール配信を実施しない場合は後回し可能。

# 53. Form UX
フォームは入力負荷を抑える。

基本順序候補：

会社名

会社URL

業界

氏名

役職

メール

電話番号（任意）

課題（任意）

# 54. Role
役職はSelectまたは自由入力を検討する。

候補：

経営者・役員

経営企画

人事・採用

管理部門

IT・DX

現場責任者

営業

その他

自由入力だけでもPhase 1では可。

# 55. URL Input
会社URLは、

https://

形式でvalidationする。

ただし入力ミスでCVを過度に阻害しないよう、実装時に適切な補助を検討する。

# 56. Error Message
エラーは、

正しいURLを入力してください

等、具体的に表示する。

単に「入力エラー」としない。

# 57. Form Completion
送信時は、

- 二重送信防止
- Loading
- 成功表示
- エラー時の再送

を適切に実装する。

# 58. Spam対策
初期から最低限のSpam対策を実装する。

候補：

- Honeypot
- Rate Limit
- Bot Protection

CAPTCHAはUXへの影響を見ながら検討する。

# 59. Interview取材メリット
取材募集ページでは、企業側のメリットを明示する。

例：

- 企業の取り組みを紹介
- 公式サイトへのリンク
- 採用ページ掲載
- 求人情報掲載
- Report等で取り組みを紹介する可能性
- 自社の知見を発信

# 60. Interview募集ページ
将来的に専用ページを作る。

候補URL：

/interview-request/

または、

/interviews/apply/

02のURL設計と整合させて決定する。

# 61. Interview募集ページ構成
人手不足研究所の取材について

↓

どんな企業・人を取材するか

↓

取材テーマ

↓

掲載内容

↓

企業側のメリット

↓

取材の流れ

↓

フォーム

# 62. Service Leadページ
将来的に、

/consultation/

等の共通相談ページを作成可能とする。

初期では/contact/内に統合してもよい。

# 63. Service Lead文脈引き継ぎ
Article等からService Leadへ遷移する際、

theme:

contentId:

serviceCategory:

を事前設定可能にする。

例：

Excel記事から相談すると、

相談カテゴリ：

業務改善 / Excel

が最初から選ばれている状態。

# 64. Report Lead文脈
ReportフォームではユーザーにReport名を再入力させない。

reportIdを自動取得する。

# 65. Form Masterとの連携
03のForm Masterを使用する。

例：

id: form_report_download

type: report-download

provider: internal

status: active

# 66. Form Provider
フォームの保存・送信基盤は08技術設計で決定する。

03 / 07では特定サービスへ密結合しない。

将来的な候補：

- 内製
- CRM
- Form Service
- Marketing Automation

# 67. 初期保存
Phase 1では、少なくともフォーム送信情報が失われない状態を作る。

メール通知だけで終わらせず、可能なら構造化データとして保存する。

# 68. CRM移行
将来CRMを導入する場合、

Company

Person

Activity

Lead Type

Source Content

UTM

が移行できる構造とする。

# 69. Thank You URL
CV TypeごとにThank Youページを分けてもよい。

例：

/thanks/report/

/thanks/interview/

/thanks/contact/

/thanks/consultation/

または動的な一枚ページでも可。

詳細は08で決定する。

# 70. Thank Youのindex
Thank Youページは原則noindex。

sitemapにも含めない。

# 71. CVにしない行動
以下は重要行動ではあるがPrimary CVとは分ける。

記事閲覧

関連記事クリック

企業公式サイトクリック

採用ページクリック

求人リンククリック

Micro Conversion / Engagementとして計測する。

# 72. Micro Conversion
候補：

report_page_view

article_to_report_click

interview_company_click

recruitment_click

job_click

scroll_depth

# 73. KPI
初期主要KPI：

### Report
Report Page Views

CTA Click

Form Start

Form Submit

Download

CVR

### Interview
Interview View

Company Site Click

Recruitment Click

Interview Request

### Service
Service CTA Click

Service Lead

# 74. リード品質KPI
件数だけでなく、

対象業界比率

会社URL取得率

役職

Service Lead化率

複数接点率

等も将来的に確認する。

# 75. Content Contribution
コンテンツ単位で、

何件CVに貢献したか

を追える状態を目指す。

単純なLast Clickだけでなく、将来的に複数接点も分析可能な構造にする。

# 76. 取材企業DBとの連携
Interview企業はCompany Masterに登録する。

同じ企業が過去にReport DL等をしていた場合、将来的には同一Companyとして統合可能にする。

# 77. 企業情報の公開範囲
Lead DBの情報を自動的にサイト上で公開しない。

Company Masterとして公開するのは、

- 取材許可
- 公開可能情報

を確認した企業のみ。

# 78. データと公開情報の分離
重要原則：

Internal Company Data

≠

Public Company Profile

内部リード情報とInterview公開情報を混同しない。

# 79. セキュリティ
フォーム・Lead DBには個人情報を含むため、

- アクセス制御
- 不要な公開禁止
- ログ管理
- Secret管理

等を08で設計する。

# 80. データ保持
個人情報の保持期間・削除方針は運用開始前に定める。

必要以上に無期限保存しない。

詳細はPrivacy / 運用設計で確定する。

# 81. 07と03の関係
03：

コンテンツ・Company・CTA等のデータ構造。

07：

そのコンテンツから生まれる接点・Lead情報。

将来的にはCompany IDを通じて関連可能とする。

# 82. 07と05の関係
05：

CTAをどこに表示するか。

07：

そのCTAで何を取得し、送信後どう扱うか。

# 83. 07と06の関係
06：

CTA / Formの見た目。

07：

CTA / Formの目的と情報構造。

# 84. 07と08の関係
08技術設計では、

- Form送信
- DB保存
- Email
- Validation
- Analytics
- Event Tracking
- UTM
- Company / Person ID
- Security

等の実装方法を決定する。

# 85. 初期実装必須項目
Phase 1で最低限実装する。

### CV
- Report Download
- Interview Request
- Contact
- Service Lead

### Common Fields
- 会社名
- URL
- 業界
- 氏名
- 役職
- Email
- Phone任意
- 課題任意

### Tracking
- leadType
- sourceContentId
- reportId
- landingPage
- UTM
- createdAt

# 86. Phase 1で後回し可能
- 高度なCRM
- Lead Scoring
- Company自動調査
- Email Nurturing
- MA
- 自動営業
- 詳細Attribution
- Interviewクリックレポート提供
- リンク自動監視
- 外部企業データ連携

# 87. Phase 2候補
コンテンツ・Lead増加後に、

Company DB

Person DB

Activity History

Company Enrichment

Lead Scoring

CRM

を強化する。

# 88. Phase 3候補
さらに進んだ場合、

企業属性別分析

業界別リード分析

取材候補抽出

企業課題データベース

サービス需要分析

へ発展可能。

# 89. 人手不足研究所にとってのLeadの意味
リードを、

営業先リスト

としてだけ扱わない。

企業との接点を通じて、

- どんな会社が何に困っているか
- どんなReportに興味があるか
- どの業界でどんな課題が多いか
- どんな取材テーマがあるか

を知るための情報資産として扱う。

# 90. 企業DBの将来的価値
蓄積した企業情報は、

- コンテンツ企画
- アンケート
- Interview
- Report
- 新規サービス
- 営業
- 市場調査

の基盤になる可能性がある。

# 91. CVと編集活動の循環
理想的には、

Article / Report

↓

Lead

↓

企業理解

↓

Interview

↓

一次情報

↓

新しいReport

↓

新しいLead

という循環を作る。

# 92. CVとサービス開発の循環
同様に、

Content

↓

Service Lead

↓

課題把握

↓

支援

↓

Case / Interview

↓

Content

へ発展可能。

# 93. CV設計で避けること
以下を避ける。

- 全ページに問い合わせボタンを大量配置
- Form項目の過剰取得
- Phone必須
- Report DLで詳細な営業アンケートを必須にする
- 同じユーザーを毎回別Leadとして扱う
- source情報を保存しない
- Thank Youを行き止まりにする
- Report送信後に即営業だけを行う
- 取材企業情報と内部Lead情報を混同する
- 同意なく個人情報を外部公開する

# 94. 07最重要原則
### 原則1
**CVをReport / Interview / Contact / Serviceの4種類に分ける。**

### 原則2
**会社URLを企業DB形成の重要情報として必須取得する。**

### 原則3
**電話番号・課題は任意とし、入力負荷を抑える。**

### 原則4
**Company × Person × Activityとして将来的に管理できる構造にする。**

### 原則5
**どのコンテンツからCVしたかを記録する。**

### 原則6
**Thank You後もコンテンツ回遊を継続する。**

### 原則7
**サービス相談はコンテンツ文脈に沿って提示する。**

### 原則8
**取材を重要なCVとして扱う。**

### 原則9
**Leadを営業リストではなく、企業課題を理解する情報資産として扱う。**

### 原則10
**将来的にコンテンツDB・企業DB・Lead DBが接続できる構造を目指す。**

# 95. 08への引き継ぎ事項
08 技術設計書では、本設計を実装へ落とす。

主な論点：

- Next.js構成
- Vercel
- GitHub
- MDX
- Form API
- Lead保存先
- Company / Person / Activity ID
- Email送信
- PDF配布
- Analytics
- Event Tracking
- UTM取得
- Cookie
- Security
- Spam対策
- Sitemap
- Build / Deploy
- CI
- Environment Variables

# 96. 結論
人手不足研究所のCV設計は、

**コンテンツから案件を取るためのフォーム設計**

だけを目的としない。

レポート・取材・問い合わせ・サービス相談という4種類の接点から、

Company

+

Person

+

Activity

を継続的に蓄積し、

**どの企業が、何に関心を持ち、どの情報に接触し、どのような課題を抱えているか**

を徐々に理解できる情報基盤を作る。

将来的には、

Content DB

+

Company DB

+

Person DB

+

Activity DB

を接続することで、人手不足研究所そのものを、

**人手不足企業の課題・動向・取り組みを継続的に理解するための独自情報基盤**

へ発展させることを目指す。
