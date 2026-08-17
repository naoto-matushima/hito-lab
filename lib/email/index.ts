import { consoleEmailAdapter } from "./console-adapter";
import type { EmailAdapter } from "./types";

export * from "./types";
export * from "./console-adapter";
export * from "./templates";
export * from "./mask";

/**
 * 実プロバイダ（Resend等）はEMAIL_API_KEY等の環境変数で差し替える設計とするが、
 * 現時点ではAPIキーが無いため常にconsoleEmailAdapterを返す。
 */
export function getEmailAdapter(): EmailAdapter {
  return consoleEmailAdapter;
}
