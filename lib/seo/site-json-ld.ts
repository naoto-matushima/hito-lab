import { getSiteUrl, SITE_NAME } from "./site";

/**
 * docs/08-technical-architecture.md §64: Organization/WebSite構造化データ。
 * .claude/rules/seo.md: ページ上に表示されていない内容は出力しない
 * （name/urlはHeader・Footerに実際に表示されているため対象とする。
 * logo/sameAsは対応するロゴ画像・SNSリンクが無いため含めない）。
 */
export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
  };
}
