---
description: 公開前のQAチェック。設計書09の§60-66に沿って機能・コンテンツ・SEO・レスポンシブを確認する。
disable-model-invocation: true
allowed-tools: Bash(npm run *) Bash(npx *)
---

# 公開前QA

`docs/09-implementation-claude-code.md` §59-66 に沿って確認してください。

## ビルド

```
npm run typecheck
npm run lint
npm run validate
npm run build
```

## 自動で確認できるもの

- 内部リンク切れ
- slug / ID の重複
- draft が公開対象に含まれていないか
- sitemap に thanks / search / preview が含まれていないか
- canonical の自己参照
- title / description の欠落
- 構造化データと表示内容の不一致
- 出典未設定の統計記述
- Empty Section（関連Reportが無いのにセクションだけ出ている等）

各項目について、確認方法と結果を報告してください。確認していない項目を「問題なし」と書かないでください。

## 人間が確認する項目（リストのみ出力）

以下は自動確認できないため、チェックリストとして出力してください。

- 誤字・事実誤認
- 企業情報・求人リンクの現況
- Mobile表示（Header / Table / Chart / Form / Interview / Report）
- フォーム送信 → Lead保存 → Email → PDF取得の一連
- GA4のイベント発火
- Privacy Policy と運営者情報の掲載
