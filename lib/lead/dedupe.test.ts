import { describe, expect, it } from "vitest";
import { findExistingCompany, findExistingPerson } from "./dedupe";

describe("findExistingCompany", () => {
  const companies = [
    { id: "company_1", domain: "example.com" },
    { id: "company_2", domain: "example.co.jp" },
  ];

  it("domainが一致するCompanyを返す", () => {
    expect(findExistingCompany("example.com", companies)?.id).toBe("company_1");
  });

  it("大文字小文字を無視して一致判定する", () => {
    expect(findExistingCompany("EXAMPLE.COM", companies)?.id).toBe("company_1");
  });

  it("一致しない場合はundefinedを返す", () => {
    expect(findExistingCompany("other.com", companies)).toBeUndefined();
  });
});

describe("findExistingPerson", () => {
  const people = [
    { id: "person_1", email: "taro@example.com" },
    { id: "person_2", email: "hanako@example.com" },
  ];

  it("emailが一致するPersonを返す", () => {
    expect(findExistingPerson("taro@example.com", people)?.id).toBe("person_1");
  });

  it("大文字小文字を無視して一致判定する", () => {
    expect(findExistingPerson("TARO@EXAMPLE.COM", people)?.id).toBe("person_1");
  });

  it("一致しない場合はundefinedを返す", () => {
    expect(findExistingPerson("nobody@example.com", people)).toBeUndefined();
  });
});
