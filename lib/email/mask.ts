/** .claude/rules/leads.md: 個人情報の全文をログへ出力しない */
export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const maskedLocal = local.length <= 2 ? "*".repeat(local.length) : `${local[0]}***${local[local.length - 1]}`;
  return `${maskedLocal}@${domain}`;
}
