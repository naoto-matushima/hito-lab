import type { Metadata } from "next";
import { Breadcrumb, Button, Card, Container } from "@/components/ui";
import { BrandPhilosophy, ThemeExplorer, IndustryExplorer } from "@/components/hub";

/**
 * docs/02-sitemap-url.md §36・docs/05-page-template.md §61-63。
 * 運営者情報の掲載範囲は11-open-issues.md C-8の決定に従う（個人名のみ、連絡先はフォーム経由）。
 */
export const metadata: Metadata = {
  title: "人手不足研究所について",
  description:
    "人手不足研究所は、建設・介護・物流・製造・宿泊など、人手不足に向き合う企業のための調査・実践メディアです。何を目指し、どう情報をつくっているかを紹介します。",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "人手不足研究所について" }]} />
      <h1 className="mt-4">人手不足研究所について</h1>

      <section className="mt-10 max-w-2xl">
        <h2>人手不足研究所とは</h2>
        <p className="mt-4 text-text-secondary">
          人手不足研究所は、建設・介護・物流・製造・宿泊など、人手不足の影響を強く受ける企業のための調査・実践メディアです。採用、組織・人事、業務改善、DX・IT活用など、「人」と「仕事」の両面からこれからの会社づくりを考えます。
        </p>
        <p className="mt-4 text-text-secondary">
          統計データの分析だけでなく、企業、働く人、採用・人事・ITなどの支援会社へのインタビューや独自調査を通じて、実際の企業経営に役立つ一次情報を提供することを目指しています。
        </p>
      </section>

      <section className="mt-10 max-w-2xl">
        <h2>私たちの問題意識</h2>
        <p className="mt-4 text-lg font-bold text-primary-dark">人が減っても、強くなる会社へ。</p>
        <p className="mt-4 text-text-secondary">
          人口減少や人手不足が進むなかでも、必要な仕事や事業を持続させ、さらに成長できる会社を増やしたいと考えています。人手不足は採用だけの問題ではなく、組織・業務・経営の全体に関わる循環する課題です。
        </p>
      </section>

      <BrandPhilosophy />
      <ThemeExplorer />
      <IndustryExplorer />

      <section className="my-16 max-w-2xl">
        <h2>情報の作り方</h2>
        <p className="mt-4 text-text-secondary">
          一般的な解説記事の量産ではなく、以下のような一次情報・独自分析を重視しています。
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-text-secondary">
          <li>企業・経営者・働く人へのインタビュー</li>
          <li>採用支援会社・社労士・IT/DX支援会社への取材</li>
          <li>独自アンケート・調査</li>
          <li>公的統計の分析</li>
          <li>企業の取り組み事例</li>
        </ul>
        <p className="mt-4 text-text-secondary">
          統計は大手の調査機関が既に数多く出しています。人手不足研究所が出すのは、その統計の下で実際に何が起きていて、中小企業が何を試したかです。成功事例だけでなく、試行錯誤している状態も記録の対象にしています。
        </p>
      </section>

      <section className="my-16 max-w-2xl">
        <h2>編集方針</h2>
        <p className="mt-4 text-text-secondary">
          記事の構成・執筆補助にはClaudeを活用していますが、取材の実施、事実確認、企業情報の掲載可否、公開判断は人が行います。AIが作成した原稿を確認なしに自動公開することはありません。統計・数値には必ず出典を明記し、出典が確認できない数値は掲載しません。
        </p>
      </section>

      <section className="my-16 max-w-2xl">
        <h2>運営者情報</h2>
        <Card>
          <p className="text-text-secondary">運営者：松嶋直人</p>
          <p className="mt-2 text-sm text-text-secondary">
            お問い合わせ・ご連絡は下記フォームより承っております。
          </p>
        </Card>
      </section>

      <section className="my-16 max-w-2xl">
        <h2>取材・お問い合わせ</h2>
        <p className="mt-4 text-text-secondary">
          企業・経営者・働く方・専門家への取材を随時募集しています。取材以外のご相談・お問い合わせもこちらから承ります。
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/interview-request/" variant="primary">
            取材に応募する
          </Button>
          <Button href="/contact/" variant="secondary">
            お問い合わせ
          </Button>
        </div>
      </section>
    </Container>
  );
}
