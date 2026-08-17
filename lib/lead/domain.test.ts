import { describe, expect, it } from "vitest";
import { normalizeCompanyDomain } from "./domain";

describe("normalizeCompanyDomain", () => {
  it("wwwを除去する", () => {
    expect(normalizeCompanyDomain("https://www.example.co.jp/about/")).toBe("example.co.jp");
  });

  it("wwwが無い場合はそのまま", () => {
    expect(normalizeCompanyDomain("https://example.com/")).toBe("example.com");
  });

  it("大文字小文字を正規化する", () => {
    expect(normalizeCompanyDomain("https://WWW.Example.COM/")).toBe("example.com");
  });

  it("パス・クエリを無視してホスト名のみ返す", () => {
    expect(normalizeCompanyDomain("https://example.com/careers?ref=top")).toBe("example.com");
  });
});
