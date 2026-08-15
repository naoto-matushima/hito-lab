---
paths:
  - "app/**/contact/**"
  - "app/**/thanks/**"
  - "lib/db/**"
  - "lib/email/**"
  - "components/forms/**"
  - "db/**"
---

# Lead / 個人情報

詳細は `docs/07-conversion-lead.md`。

## 構造

Lead は Company × Person × Activity として保存する。同じ人物の複数回のCVを別Leadとして扱わない。

フォーム送信時は Company検索 → なければ作成 → Person検索 → なければ作成 → Activity追加 の順。

正式な識別子は内部ID（companyId / personId）。ドメインとメールアドレスは重複判定のシグナルとして使い、Primary Keyにはしない。

## 禁止

- Lead DBの情報をサイト上に公開する。公開用のCompany Masterと内部Lead DBは別物
- ブラウザからDBへ直接アクセスさせる
- 個人情報の全文をログへ出力する
- ユーザー入力値をメールのFromへ使う（Reply-Toを使う）
- 電話番号を必須項目にする

## 必ず実装するもの

- Server側でのZod validation（Client validationだけを信用しない）
- Honeypot と Rate Limit
- 二重送信防止
- プライバシーポリシーへのリンクと同意UI
- utm_* / landingPage / sourceContentId / reportId の保存
