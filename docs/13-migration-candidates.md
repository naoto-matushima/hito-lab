# 人手不足研究所｜13 既存記事移行候補一覧 v1.0

**文書名:** 13-migration-candidates.md
**対象サイト:** 人手不足研究所
**位置づけ:** `docs/12-media-strategy.md` §6-2 手順1「移行対象記事の一覧を作る」に対応する調査結果
**目的:** bizdev-note.com（新規事業開発ノート）に公開済みの記事のうち、建設業の採用・人手不足を主題とする移行候補を一覧化する。実際の移行・301設定はここでは行わず、人間の確認後に着手する。

## 調査方法・限界

- bizdev-note.comのトップページ・`/category/human-resources/`カテゴリページ・サイト内検索（`?s=建設` `?s=建設業` `?s=人手不足`）をWebFetchで調査
- `sitemap.xml` `sitemap_index.xml` `wp-sitemap.xml` はいずれも404で、機械可読なsitemapは発見できなかった
- カテゴリページのページネーション2ページ目も404で、該当カテゴリは1ページ分のみと推測される
- 被リンクの有無はWebFetchでは判定不可能（Search Console等が必要。今回は対象外）
- 公開日はページ表示から読み取ったものであり、meta tagやCMS側の値では未検証。人間による確認を推奨

## 候補一覧

| 旧URL | タイトル | 公開日（未検証） | 建設・人手不足との関連 | 提案する新URL |
| --- | --- | --- | --- | --- |
| `https://bizdev-note.com/human-resources/recruitment-career/construction-recruitment-market/` | 建設業の人手不足はなぜ？20年のデータで見る現状と採用ターゲット・採用方法 | 2026-08-09（要確認） | 建設業の人手不足統計20年分の推移と、未経験者を含めた採用ターゲット・採用手法を扱う。建設×採用×人手不足そのもの | `/recruiting/construction-recruitment-market/`（旧URLのslugがtypoなくkebab-caseのため流用可） |

## 重要な既知事項：この記事は新サイト側で既に執筆済み

上記候補記事と**同一タイトル**の記事が、Phase 3（Article Vertical Slice）で既に新サイトへ執筆済みです。

- ファイル: `content/articles/construction-labor-shortage.mdx`
- 新URL: `/recruiting/construction-labor-shortage/`（上記調査で提案したslug `construction-recruitment-market` とは異なる。Phase 3時点で別途決定されたもの）
- ステータス: `status: draft`（人間の承認待ち）

`docs/12-media-strategy.md` §6-2の手順のうち、新サイト側の工程は実質的に完了しています。

| 手順（12 §6-2） | 状態 |
| --- | --- |
| 1. 移行対象記事の一覧を作る | ✅ 本書で完了 |
| 2. 新URLを決める | ✅ 完了（`/recruiting/construction-labor-shortage/`） |
| 3. Content Model（03）に合わせてfrontmatterを付け直す | ✅ 完了 |
| 4. 本文を人手不足研究所の文脈に合わせて調整する | ✅ 完了（新規執筆のため、新規事業開発ノート固有の言及なし） |
| 5. 新サイトで公開する | ❌ 未着手。`status: draft`のまま。**人間がpublishedへ変更する必要がある**（`CLAUDE.md`によりClaude Codeは変更しない） |
| 6. 旧サイトで301リダイレクトを設定する | ❌ 未着手。旧サイト（bizdev-note.com）側の作業でこのリポジトリの範囲外 |
| 7. 旧サイトのsitemapから削除する | ❌ 未着手。同上 |
| 8. 旧サイト内の内部リンクを新URLへ張り替える | ❌ 未着手。同上 |
| 9. Search Consoleで両ドメインを確認する | ❌ 未着手 |

## 次のアクション（人間が判断・実施）

1. `content/articles/construction-labor-shortage.mdx` の内容を確認し、問題なければ `status: published` へ変更する
2. bizdev-note.com側で `https://bizdev-note.com/human-resources/recruitment-career/construction-recruitment-market/` から `{人手不足研究所ドメイン}/recruiting/construction-labor-shortage/` への301リダイレクトを設定する
3. bizdev-note.comのsitemapから該当記事を削除する
4. bizdev-note.com内で該当記事への内部リンクがあれば新URLへ張り替える
5. 今回の調査で候補が1件のみだったため、将来的に対象記事が追加された場合は本書に追記する
