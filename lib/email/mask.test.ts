import { describe, expect, it } from "vitest";
import { maskEmail } from "./mask";

describe("maskEmail", () => {
  it("ローカル部を部分マスクする", () => {
    expect(maskEmail("taro@example.com")).toBe("t***o@example.com");
  });

  it("ローカル部が短い場合は全体をマスクする", () => {
    expect(maskEmail("ab@example.com")).toBe("**@example.com");
  });

  it("不正な形式はマスク済みプレースホルダを返す", () => {
    expect(maskEmail("not-an-email")).toBe("***");
  });
});
