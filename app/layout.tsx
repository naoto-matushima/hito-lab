import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Maru_Gothic } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { getSiteUrl } from "@/lib/seo/site";
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${zenMaruGothic.variable} ${notoSansJP.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
