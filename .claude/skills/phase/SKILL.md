---
description: 実装フェーズに着手する。フェーズ番号を引数に取る。計画→承認→実装→検証の順で進める。
disable-model-invocation: true
argument-hint: [フェーズ番号]
---

# Phase $ARGUMENTS の実装

`docs/09-implementation-claude-code.md` の Phase $ARGUMENTS を読み、以下を確認してください。

- 実装対象
- Acceptance Criteria
- 参照すべき設計書

あわせて `docs/11-open-issues.md` を確認し、このフェーズに関わる未決事項があれば実装前に指摘してください。未決事項について勝手に一方を採用しないでください。

## 進め方

1. **まず計画を提示してください。実装はまだ行いません。**
   - 今回作るもの
   - 今回作らないもの
   - Acceptance Criteria の各項目にどう対応するか
   - 未決事項があればその一覧
2. 承認後に実装してください。
3. 完了後に以下を実行し、結果を報告してください。

```
npm run typecheck
npm run lint
npm run validate
npm run build
```

4. Acceptance Criteria を1項目ずつ、満たしたかどうかを report してください。「おそらく満たしている」ではなく、確認した方法とあわせて書いてください。

## 設計変更が必要な場合

実装せず、以下を報告してください。

1. 問題
2. 現仕様
3. なぜ実装が難しいか
4. 推奨変更
5. 影響範囲

設計書を先に修正してからコードを変更します。逆順にしないでください。
