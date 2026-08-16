import { describe, expect, it } from "vitest";
import { extractToc } from "./toc";

describe("extractToc", () => {
  it("H2とH3を抽出し、見出しレンダラーと同じ規則でidを付与する", () => {
    const body = `
本文冒頭。

## 建設業は本当に人手不足なのか

段落。

### 有効求人倍率で見る採用競争

段落。

## まとめ
`;
    const toc = extractToc(body);
    expect(toc).toEqual([
      { level: 2, text: "建設業は本当に人手不足なのか", id: "建設業は本当に人手不足なのか" },
      { level: 3, text: "有効求人倍率で見る採用競争", id: "有効求人倍率で見る採用競争" },
      { level: 2, text: "まとめ", id: "まとめ" },
    ]);
  });

  it("見出しがない場合は空配列を返す", () => {
    expect(extractToc("本文のみで見出しはありません。")).toHaveLength(0);
  });
});
