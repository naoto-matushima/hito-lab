import Link from "next/link";
import type { Metadata } from "next";
import { Button, Container } from "@/components/ui";
import {
  ArticleFeed,
  BrandPhilosophy,
  IndustryExplorer,
  InterviewFeed,
  ReportFeed,
  ThemeExplorer,
} from "@/components/hub";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** docs/05-page-template.md §6: TOPページ基本構成 */
export default function Home() {
  return (
    <>
      {/* 01 Hero / FV（05 §7-8） */}
      <div className="border-b border-border bg-primary-pale">
        <Container className="py-20 text-center">
          <h1>人手不足研究所</h1>
          <p className="mt-4 text-xl font-bold text-primary-dark">人が減っても、強くなる会社へ。</p>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            建設・介護・物流・製造・宿泊など、人手不足の影響を受ける企業に向けた調査・実践メディアです。人を「採る」、人を「活かす」、業務の負担を「減らす」、会社を「強くする」——人手不足への一連の対応を、データと一次情報で支えます。
          </p>
          <div className="mt-8">
            <Button href="#themes" variant="primary">
              テーマから探す
            </Button>
          </div>
        </Container>
      </div>

      <Container>
        {/* 02 注目レポート（05 §9） */}
        <ReportFeed title="注目レポート" limit={1} />

        {/* 03 テーマから探す（05 §10） */}
        <ThemeExplorer id="themes" />

        {/* 04 業界から探す（05 §11） */}
        <IndustryExplorer />

        {/* 05 最新の調査・データ（05 §12） */}
        <ReportFeed title="最新の調査・データ" limit={3} />

        {/* 06 企業・専門家インタビュー（05 §13） */}
        <InterviewFeed />

        {/* 07 人手不足研究所の考え方（05 §14） */}
        <BrandPhilosophy />

        {/* 08 最新記事（05 §15） */}
        <ArticleFeed limit={6} />

        {/* 09 人手不足研究所について（05 §16） */}
        <section className="my-16 border-t border-border pt-12">
          <h2>人手不足研究所について</h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            人手不足研究所は、人手不足に直面する企業に向けて、独自調査と企業取材から一次情報を積み上げる調査・実践メディアです。
          </p>
          <div className="mt-6">
            <Link href="/about/" className="font-medium text-primary hover:underline">
              人手不足研究所について詳しく見る
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
