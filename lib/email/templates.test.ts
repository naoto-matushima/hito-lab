import { describe, expect, it } from "vitest";
import { buildLeadConfirmationEmail } from "./templates";

const input = { personName: "サンプル太郎", companyName: "株式会社サンプル建設" };

describe("buildLeadConfirmationEmail", () => {
  it("report_download用の件名・本文を生成する", () => {
    const email = buildLeadConfirmationEmail("report_download", input);
    expect(email.subject).toContain("レポートダウンロード");
    expect(email.text).toContain(input.companyName);
    expect(email.text).toContain(input.personName);
  });

  it("interview_request用の件名を生成する", () => {
    expect(buildLeadConfirmationEmail("interview_request", input).subject).toContain("取材");
  });

  it("contact用の件名を生成する", () => {
    expect(buildLeadConfirmationEmail("contact", input).subject).toContain("お問い合わせ");
  });

  it("service_lead用の件名を生成する", () => {
    expect(buildLeadConfirmationEmail("service_lead", input).subject).toContain("ご相談");
  });
});
