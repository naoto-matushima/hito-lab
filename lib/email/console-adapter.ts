import type { EmailAdapter, EmailMessage } from "./types";
import { maskEmail } from "./mask";

/**
 * 開発用アダプタ。実送信はせずログのみ出力する。
 * EMAIL_API_KEYが無い現時点ではこれがデフォルトのアダプタになる。
 */
export const consoleEmailAdapter: EmailAdapter = {
  async send(message: EmailMessage) {
    console.log(`[Email] to=${maskEmail(message.to)} subject="${message.subject}"`);
  },
};
