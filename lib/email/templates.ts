import type { LeadType } from "@/lib/validation";

export type EmailTemplateInput = {
  personName: string;
  companyName: string;
};

export type EmailTemplate = {
  subject: string;
  text: string;
};

/** docs/07-conversion-lead.md §22-27, docs/08-technical-architecture.md §51: 4種のメールテンプレート */
export function buildLeadConfirmationEmail(leadType: LeadType, input: EmailTemplateInput): EmailTemplate {
  const greeting = `${input.companyName} ${input.personName}様`;
  const signature = "人手不足研究所編集部";

  switch (leadType) {
    case "report_download":
      return {
        subject: "【人手不足研究所】レポートダウンロードのご案内",
        text: `${greeting}\n\nこの度はレポートをダウンロードいただきありがとうございます。\n\n${signature}`,
      };
    case "interview_request":
      return {
        subject: "【人手不足研究所】取材申し込みを受け付けました",
        text: `${greeting}\n\n取材のお申し込みを受け付けました。事務局より改めてご連絡いたします。\n\n${signature}`,
      };
    case "contact":
      return {
        subject: "【人手不足研究所】お問い合わせを受け付けました",
        text: `${greeting}\n\nお問い合わせを受け付けました。内容を確認の上、担当よりご連絡いたします。\n\n${signature}`,
      };
    case "service_lead":
      return {
        subject: "【人手不足研究所】ご相談を受け付けました",
        text: `${greeting}\n\nご相談を受け付けました。内容を確認の上、担当よりご連絡いたします。\n\n${signature}`,
      };
  }
}
