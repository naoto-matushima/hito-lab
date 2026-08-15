---
description: 原稿をArticleとしてcontent/articles/へ追加する。frontmatter・taxonomy・内部リンク・validationまで行う。
disable-model-invocation: true
allowed-tools: Bash(npm run validate) Bash(npm run build) Bash(npm run typecheck)
---

# Article 追加

`docs/03-content-model.md` §30・§83 のテンプレートに従ってください。

## 手順

1. `data/taxonomies/` を読み、使用するIDが全て存在することを確認する。存在しないIDが必要な場合、勝手に追加せず報告する
2. Content ID を発行する（`cnt_YYYYMMNNN` 形式。既存の最大値+1）
3. `content/articles/{slug}.mdx` を作成する
4. frontmatter を設定する
   - 必須：id / title / slug / description / contentType / status / publishedAt / updatedAt / primaryTheme / themes / industries / authors
   - primaryTheme は必ず themes にも含める
   - `status: draft` で保存する
5. MDX本文を作成する
   - 使用可能なコンポーネント：`<KeyFinding />` `<StatCard />` `<Chart />` `<DataTable />` `<Quote />` `<CTA />`
   - 著者プロフィール・企業紹介・CTA文言・出典一覧・関連記事は本文に書かない（自動生成される）
6. 出典を `data/sources/` に登録し、frontmatter の `sources` から参照する
7. 内部リンクを設定する — primaryThemeのテーマトップ、関連Report、公開済みなら業界ページ
8. `relatedContent` と `cta` を設定する
9. `npm run validate` を実行する
10. `npm run build` を実行する

## 報告

- 作成したファイルパス
- 設定した frontmatter
- 新規登録した source
- validation / build の結果
- 判断に迷った点

`status: draft` のままにしてください。公開は人間が行います。
