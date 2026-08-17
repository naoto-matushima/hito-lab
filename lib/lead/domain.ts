/**
 * docs/08-technical-architecture.md §43: 会社URLからdomainを正規化する。
 * 例: https://www.example.co.jp/about/ → example.co.jp
 */
export function normalizeCompanyDomain(companyUrl: string): string {
  const url = new URL(companyUrl);
  return url.hostname.replace(/^www\./, "").toLowerCase();
}
