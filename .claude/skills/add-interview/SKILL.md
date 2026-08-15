---
description: 取材原稿をInterviewとしてcontent/interviews/へ追加する。Company Master登録と採用導線の設定まで行う。
disable-model-invocation: true
allowed-tools: Bash(npm run validate) Bash(npm run build)
---

# Interview 追加

`docs/03-content-model.md` §44-52 と `docs/05-page-template.md` §48-53 に従ってください。

## 手順

1. `data/companies/` に取材企業が登録済みか確認する。無ければ登録する
   - name / slug / description / industry / location / website / recruitment（page・jobLinks）
   - 各リンクに `status: active | inactive | unknown` を設定する
   - 掲載を確認していないリンクを推測で書かない
2. `data/people/` に取材対象者を登録する（`intervieweeType` を設定）
3. Content ID を発行する（`interview_YYYYMMNNN`）
4. `content/interviews/{slug}.mdx` を作成する
5. `interview` を設定する — conductedAt / interviewees / companies
6. 本文を作成する
   - **企業紹介・所在地・事業内容・採用ページURLを本文へ書かない。** Company Masterから自動生成される
   - 冒頭の企業紹介は記事理解に必要な最低限のみ（会社名・業界・所在地・話者の肩書）
7. themes は横断してよい（採用・組織・DXなど複数）
8. `npm run validate` と `npm run build`

## 公開前

企業への事実確認が完了するまで `status: draft` のままにする。特に会社名・人名・数字・制度・採用情報・引用箇所。

確認前に published へ変更しないでください。
