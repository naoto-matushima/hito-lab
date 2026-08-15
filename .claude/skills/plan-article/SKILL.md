---
description: 新規記事の企画。既存コンテンツとの検索意図の重複を確認し、primaryThemeと構成案を出す。
disable-model-invocation: true
argument-hint: [記事のテーマ]
---

# 記事企画：$ARGUMENTS

## 既存コンテンツ

```!
find content -name "*.mdx" -exec grep -H -m1 "^title:" {} \; 2>/dev/null | sed 's|content/||'
```

## 確認すること

`docs/04-seo-aio.md` の §66-67 に従い、以下を確認してください。

1. **カニバリ確認** — 上記の既存記事に、同じ検索意図のものがないか。あれば新規作成ではなく既存記事への追記を提案してください。
2. **一次情報の有無** — この記事に載せられる独自情報（インタビュー、独自集計、独自分析）があるか。無い場合、一般的なまとめ記事にならないための工夫を提案してください。
3. **既存Reportとの関係** — 関連するReportがあれば、相互リンクの設計を含めてください。
4. **primaryTheme** — `recruiting` / `organization` / `dx` / `management` のどれか。複数テーマにまたがる場合、最も主要な検索意図で1つ選んでください。

## 出力

- 想定検索意図（1つ）
- primaryTheme と themes
- industries / jobs / areas / tags の案
- H2レベルの構成案
- 必要な出典（`data/sources/` に既存があれば ID、無ければ何を当たるべきか）
- 関連付けるべき既存コンテンツ

執筆はまだ行いません。
