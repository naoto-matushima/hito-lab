import { describe, expect, it } from "vitest";
import {
  CommonLeadFieldsSchema,
  ContactFormSchema,
  ReportDownloadFormSchema,
  ServiceLeadFormSchema,
} from "./lead";

const validCommon = {
  companyName: "株式会社サンプル",
  companyUrl: "https://example.com/",
  personName: "サンプル太郎",
  email: "taro@example.com",
  role: "担当者",
  industry: "construction",
  privacyPolicyAgreed: true as const,
};

describe("CommonLeadFieldsSchema", () => {
  it("必須項目が揃っていれば通る", () => {
    expect(CommonLeadFieldsSchema.safeParse(validCommon).success).toBe(true);
  });

  it("電話番号は任意項目である（.claude/rules/leads.md: 電話番号を必須にしない）", () => {
    expect(CommonLeadFieldsSchema.safeParse(validCommon).success).toBe(true);
  });

  it.each(["companyName", "companyUrl", "personName", "email", "role", "industry"])(
    "%sが欠けているとエラーになる",
    (field) => {
      const invalid = { ...validCommon, [field]: "" };
      expect(CommonLeadFieldsSchema.safeParse(invalid).success).toBe(false);
    },
  );

  it("会社URLが不正な形式だとエラーになる", () => {
    expect(CommonLeadFieldsSchema.safeParse({ ...validCommon, companyUrl: "not-a-url" }).success).toBe(false);
  });

  it("メールアドレスが不正な形式だとエラーになる", () => {
    expect(CommonLeadFieldsSchema.safeParse({ ...validCommon, email: "not-an-email" }).success).toBe(false);
  });

  it("プライバシーポリシー未同意はエラーになる（.claude/rules/leads.md: 同意UI必須）", () => {
    expect(CommonLeadFieldsSchema.safeParse({ ...validCommon, privacyPolicyAgreed: false }).success).toBe(false);
  });
});

describe("ReportDownloadFormSchema", () => {
  it("reportIdが必須", () => {
    expect(ReportDownloadFormSchema.safeParse(validCommon).success).toBe(false);
    expect(
      ReportDownloadFormSchema.safeParse({ ...validCommon, reportId: "report_202608001" }).success,
    ).toBe(true);
  });

  it("marketingConsentは未指定ならfalse扱い（11-open-issues.md B-4: 任意項目）", () => {
    const result = ReportDownloadFormSchema.safeParse({ ...validCommon, reportId: "report_1" });
    expect(result.success && result.data.marketingConsent).toBe(false);
  });
});

describe("ServiceLeadFormSchema", () => {
  it("serviceCategoryが未定義の値だとエラーになる", () => {
    expect(ServiceLeadFormSchema.safeParse({ ...validCommon, serviceCategory: "存在しないカテゴリ" }).success).toBe(
      false,
    );
  });

  it("定義済みのserviceCategoryなら通る", () => {
    expect(ServiceLeadFormSchema.safeParse({ ...validCommon, serviceCategory: "DX・IT活用" }).success).toBe(true);
  });
});

describe("ContactFormSchema", () => {
  it("共通項目のみで通る", () => {
    expect(ContactFormSchema.safeParse(validCommon).success).toBe(true);
  });
});
