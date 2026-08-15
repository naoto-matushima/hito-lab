---
paths:
  - "app/**"
  - "lib/seo/**"
  - "content/**"
---

# URL

詳細は `docs/02-sitemap-url.md`。

## 体系

```
/{primaryTheme}/{slug}/    通常記事
/reports/{slug}/           Report
/interviews/{slug}/        Interview
/industries/{industry}/    業界ハブ
```

テーマトップは `/recruiting/` `/organization/` `/dx/` `/management/`。

## 禁止

- 業界・地域・職種をURLに含める
- URLに日付を含める（年次Reportの年号は例外）
- 公開後にslugやprimaryThemeを変更する
- タグ・職種・地域から一覧URLを自動生成する
- フィルタ結果URL（`/search/?...`）をindex対象にする

## URL体系の変更

人間の承認事項。変更が必要と判断した場合は実装せず、理由・影響範囲・301の要否を報告する。
