/**
 * ドメイン確定前の暫定値。`NEXT_PUBLIC_SITE_URL`が設定されていればそちらを使う。
 * Launch前（Phase 9）に確定ドメインへ更新する。
 */
export const SITE_NAME = "人手不足研究所";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
