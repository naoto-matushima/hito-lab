---
paths:
  - "components/**"
  - "app/**/*.css"
  - "app/**/*.tsx"
  - "tailwind.config.*"
---

# ブランド / UI

詳細は `docs/06-brand-ui.md`。

## Design Token

色・フォント・Spacing・Radiusは必ずTokenを経由する。コンポーネントに直値を書かない。
Tailwindの標準色をそのまま使わない。

```
--color-primary: #547C73;   Sage。ブランド・Primary Button・Link
--color-accent:  #C96F55;   Terracotta。強調・比較・グラフの注目系列
--color-background: #FAF9F6;
--color-surface: #FFFFFF;
--color-text: #292D2B;
--font-brand: "Zen Maru Gothic";   Logo・H1・ブランドコピーのみ
--font-base:  "Noto Sans JP";      本文・UI・データ
```

`#000000` は使わない。Terracottaを Primary CTA 色に使わない。

## 判断に迷ったとき

可読性 → 情報理解 → 信頼性 → ブランド一貫性 → 装飾性 の順で優先する。

## 避ける方向

- SaaS的表現（青系グラデーション、24px以上の角丸、3Dイラスト、Glow）
- 官公庁的表現（小さい文字、余白不足、リンク一覧中心）
- ニュースサイト的表現（最新記事の羅列、ランキング）

Shadowより Border を優先する。カードを浮かせない。

## Article / Report / Interview

同じカードUIで統一しない。Reportは資料感、Interviewは人物性を出す。
