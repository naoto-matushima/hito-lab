export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
};

/** docs/08-technical-architecture.md §50: 特定サービスへ密結合しないアダプタ構造 */
export interface EmailAdapter {
  send(message: EmailMessage): Promise<void>;
}
