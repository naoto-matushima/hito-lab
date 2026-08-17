import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { getSiteUrl } from "@/lib/seo/site";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/site-json-ld";
import "./globals.css";

// docs/06-brand-ui.md §90: Zen Maru Gothicはweight 700のみロードする
const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-base",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "人手不足研究所",
  description: "建設・介護・物流・製造・宿泊など、人手不足の影響を受ける企業に向けた調査・実践メディア。",
  // docs/08-technical-architecture.md §58: 各ページで最低限twitterも生成する
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = buildOrganizationJsonLd();
  const webSiteJsonLd = buildWebSiteJsonLd();

  return (
    <html lang="ja" className={`${zenMaruGothic.variable} ${notoSansJP.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd).replace(/</g, "\\u003c") }}
        />
        <GoogleAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
