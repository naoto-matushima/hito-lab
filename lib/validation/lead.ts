import { z } from "zod";

/**
 * docs/07-conversion-lead.md §6・§9: 4CV共通の入力項目。
 * .claude/rules/leads.md: 電話番号は必須にしない。プライバシーポリシー同意UIを必ず用意する。
 */
export const CommonLeadFieldsSchema = z.object({
  companyName: z.string().min(1, "会社名を入力してください"),
  companyUrl: z.string().url("正しいURLを入力してください"),
  personName: z.string().min(1, "氏名を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  role: z.string().min(1, "役職を入力してください"),
  industry: z.string().min(1, "業界を選択してください"),
  phone: z.string().optional(),
  issue: z.string().optional(),
  privacyPolicyAgreed: z.literal(true, {
    error: "プライバシーポリシーへの同意が必要です",
  }),
});
export type CommonLeadFields = z.infer<typeof CommonLeadFieldsSchema>;

/** docs/07-conversion-lead.md §10-11。11-open-issues.md B-4: メール配信同意を追加 */
export const ReportDownloadFormSchema = CommonLeadFieldsSchema.extend({
  reportId: z.string().min(1),
  marketingConsent: z.boolean().default(false),
});
export type ReportDownloadFormValues = z.infer<typeof ReportDownloadFormSchema>;

/** docs/07-conversion-lead.md §12-13 */
export const InterviewRequestFormSchema = CommonLeadFieldsSchema;
export type InterviewRequestFormValues = z.infer<typeof InterviewRequestFormSchema>;

/** docs/07-conversion-lead.md §14 */
export const ContactFormSchema = CommonLeadFieldsSchema;
export type ContactFormValues = z.infer<typeof ContactFormSchema>;

/** docs/07-conversion-lead.md §16: Service Category初期候補 */
export const ServiceCategorySchema = z.enum([
  "採用・人材確保",
  "組織・人事・定着",
  "業務改善",
  "Excel整理",
  "ファイル整理",
  "DX・IT活用",
  "システム開発",
  "Webサイト",
  "採用サイト",
  "予約サイト",
  "その他",
]);

/** docs/07-conversion-lead.md §15 */
export const ServiceLeadFormSchema = CommonLeadFieldsSchema.extend({
  serviceCategory: ServiceCategorySchema,
});
export type ServiceLeadFormValues = z.infer<typeof ServiceLeadFormSchema>;

export type LeadType = "report_download" | "interview_request" | "contact" | "service_lead";
