import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";

/** docs/08-technical-architecture.md §83: 非表示のトラップ入力欄 */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD_NAME}>会社FAX番号</label>
      <input id={HONEYPOT_FIELD_NAME} name={HONEYPOT_FIELD_NAME} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
