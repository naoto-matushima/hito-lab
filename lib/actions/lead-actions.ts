"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  ContactFormSchema,
  InterviewRequestFormSchema,
  ReportDownloadFormSchema,
  ServiceLeadFormSchema,
  type LeadType,
} from "@/lib/validation";
import { HONEYPOT_FIELD_NAME, isHoneypotTriggered } from "@/lib/security/honeypot";
import { isRateLimited } from "@/lib/security/rate-limit";
import { saveLead } from "@/lib/db/queries";
import { buildLeadConfirmationEmail, getEmailAdapter } from "@/lib/email";
import type { LeadActionState } from "./lead-action-state";

/** docs/02-sitemap-url.md: /thanks/*はnoindex・sitemap除外 */
const THANK_YOU_PATHS: Record<LeadType, string> = {
  report_download: "/thanks/report/",
  interview_request: "/thanks/interview/",
  contact: "/thanks/contact/",
  service_lead: "/thanks/consultation/",
};

function getString(value: FormDataEntryValue | null): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function toBoolean(value: FormDataEntryValue | null): boolean {
  return getString(value) === "true";
}

function fieldErrorsFromIssues(issues: { path: PropertyKey[]; message: string }[]): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

/**
 * 4フォーム共通の送信処理。
 * Honeypot/Rate Limitチェック → Zod validation → Company/Person判定 → Activity保存 →
 * Email通知 → Thank Youへredirect、の順（docs/09-implementation-claude-code.md §46）。
 * 実DB未接続のため、DB保存に失敗した場合はエラーメッセージを返す（クラッシュさせない）。
 */
export async function submitLeadAction(
  leadType: LeadType,
  _prevState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  if (isHoneypotTriggered(formData.get(HONEYPOT_FIELD_NAME))) {
    // botには成功したフリをして静かに破棄する
    return { status: "success" };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`${leadType}:${ip}`)) {
    return {
      status: "error",
      message: "送信回数が多すぎます。しばらく時間をおいて再度お試しください。",
    };
  }

  const raw = {
    companyName: getString(formData.get("companyName")),
    companyUrl: getString(formData.get("companyUrl")),
    personName: getString(formData.get("personName")),
    email: getString(formData.get("email")),
    role: getString(formData.get("role")),
    industry: getString(formData.get("industry")),
    phone: getString(formData.get("phone")),
    issue: getString(formData.get("issue")),
    privacyPolicyAgreed: toBoolean(formData.get("privacyPolicyAgreed")),
    reportId: getString(formData.get("reportId")),
    marketingConsent: toBoolean(formData.get("marketingConsent")),
    serviceCategory: getString(formData.get("serviceCategory")),
  };

  const tracking = {
    contentId: getString(formData.get("contentId")),
    landingPage: getString(formData.get("landingPage")),
    utmSource: getString(formData.get("utm_source")),
    utmMedium: getString(formData.get("utm_medium")),
    utmCampaign: getString(formData.get("utm_campaign")),
    utmContent: getString(formData.get("utm_content")),
    utmTerm: getString(formData.get("utm_term")),
  };

  let common: {
    companyName: string;
    companyUrl: string;
    personName: string;
    email: string;
    role: string;
    industry: string;
    phone?: string;
    issue?: string;
  };
  let marketingConsent: boolean | undefined;
  let reportId: string | undefined;
  let serviceCategory: string | undefined;

  switch (leadType) {
    case "report_download": {
      const result = ReportDownloadFormSchema.safeParse(raw);
      if (!result.success) {
        return { status: "error", message: "入力内容をご確認ください。", fieldErrors: fieldErrorsFromIssues(result.error.issues) };
      }
      common = result.data;
      marketingConsent = result.data.marketingConsent;
      reportId = result.data.reportId;
      break;
    }
    case "interview_request": {
      const result = InterviewRequestFormSchema.safeParse(raw);
      if (!result.success) {
        return { status: "error", message: "入力内容をご確認ください。", fieldErrors: fieldErrorsFromIssues(result.error.issues) };
      }
      common = result.data;
      break;
    }
    case "contact": {
      const result = ContactFormSchema.safeParse(raw);
      if (!result.success) {
        return { status: "error", message: "入力内容をご確認ください。", fieldErrors: fieldErrorsFromIssues(result.error.issues) };
      }
      common = result.data;
      break;
    }
    case "service_lead": {
      const result = ServiceLeadFormSchema.safeParse(raw);
      if (!result.success) {
        return { status: "error", message: "入力内容をご確認ください。", fieldErrors: fieldErrorsFromIssues(result.error.issues) };
      }
      common = result.data;
      serviceCategory = result.data.serviceCategory;
      break;
    }
  }

  try {
    await saveLead({
      leadType,
      companyName: common.companyName,
      companyUrl: common.companyUrl,
      industry: common.industry,
      personName: common.personName,
      email: common.email,
      role: common.role,
      phone: common.phone,
      issue: common.issue,
      marketingConsent,
      reportId,
      serviceCategory,
      contentId: tracking.contentId,
      landingPage: tracking.landingPage,
      utmSource: tracking.utmSource,
      utmMedium: tracking.utmMedium,
      utmCampaign: tracking.utmCampaign,
      utmContent: tracking.utmContent,
      utmTerm: tracking.utmTerm,
    });

    const email = buildLeadConfirmationEmail(leadType, {
      personName: common.personName,
      companyName: common.companyName,
    });
    await getEmailAdapter().send({ to: common.email, subject: email.subject, text: email.text });
  } catch (error) {
    console.error("Lead保存に失敗しました:", error instanceof Error ? error.message : error);
    return {
      status: "error",
      message: "送信に失敗しました。時間をおいて再度お試しいただくか、直接お問い合わせください。",
    };
  }

  redirect(THANK_YOU_PATHS[leadType]);
}

export async function submitReportDownload(prevState: LeadActionState, formData: FormData) {
  return submitLeadAction("report_download", prevState, formData);
}

export async function submitInterviewRequest(prevState: LeadActionState, formData: FormData) {
  return submitLeadAction("interview_request", prevState, formData);
}

export async function submitContact(prevState: LeadActionState, formData: FormData) {
  return submitLeadAction("contact", prevState, formData);
}

export async function submitServiceLead(prevState: LeadActionState, formData: FormData) {
  return submitLeadAction("service_lead", prevState, formData);
}
