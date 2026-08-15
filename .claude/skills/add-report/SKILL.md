---
description: 調査レポートをReportとしてcontent/reports/へ追加する。research情報・DL設定・関連付けまで行う。
disable-model-invocation: true
allowed-tools: Bash(npm run validate) Bash(npm run build)
---

# Report 追加

`docs/03-content-model.md` §33・§84 と `docs/05-page-template.md` §40-47 に従ってください。

## 手順

1. PDFがある場合、`data/assets/` に Asset を登録する（`id` / `type: pdf` / `title` / `status: active`）。PDFのURLを本文へ直書きしない
2. `data/forms/` の Form ID を確認する
3. Content ID を発行する（`report_YYYYMMNNN`）
4. `content/reports/{slug}.mdx` を作成する
5. `research` を埋める — year / types / period / targetPopulation / sampleSize / methodology
   - 該当しない項目は省略する。空欄を無理に埋めない
   - サンプル数を誇張しない。小規模調査はその範囲で得られる示唆として書く
6. `download` を設定する — enabled / assetId / formId
7. 本文を作成する。**PDFを取得しなくてもページ単体で読者の疑問に答える内容にする**
   - 調査概要 → 結論・重要な発見 → 主要データ → 解説 → 調査方法 → 出典
   - 重要な発見は3〜5点、数字を具体的に
   - グラフを載せる場合、重要数値と結論はテキストでも書く
8. 出典を `data/sources/` に登録する
9. 関連するArticle / Interview を `relatedContent` に設定し、**相互に**リンクする
10. `npm run validate` と `npm run build`

## 禁止

- Reportページをダウンロードフォームだけのページにする
- 実施していない調査、確認していない数値を書く
