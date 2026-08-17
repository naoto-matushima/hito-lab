/**
 * docs/08-technical-architecture.md §83: Honeypot。
 * 非表示のトラップ入力欄に値が入っていればbotとみなし、成功したフリをして静かに破棄する。
 */
export const HONEYPOT_FIELD_NAME = "company_fax";

export function isHoneypotTriggered(value: FormDataEntryValue | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
