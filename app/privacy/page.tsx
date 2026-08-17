import type { Metadata } from "next";
import { Breadcrumb, Container } from "@/components/ui";

/**
 * docs/02-sitemap-url.md §36隣接・§41、docs/07-conversion-lead.md §49-52・§79-80。
 * 記載内容はlib/validation/lead.tsで実装済みの取得項目に厳密に基づく（未実装の取得項目は書かない）。
 * 保持期間は11-open-issues.md B-5の決定（削除依頼があるまで保持）に従う。
 * 公開前に法務観点での最終確認を人が行うこと。
 */
export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "人手不足研究所における個人情報の取り扱いについて説明します。",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <Container size="narrow" className="py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "プライバシーポリシー" }]} />
      <h1 className="mt-4">プライバシーポリシー</h1>
      <p className="mt-4 text-text-secondary">
        人手不足研究所（以下「当メディア」）は、お問い合わせ・レポートダウンロード・取材応募・サービス相談等でお預かりする個人情報を、以下の方針に基づき取り扱います。
      </p>

      <section className="mt-10">
        <h2>事業者情報</h2>
        <p className="mt-4 text-text-secondary">運営者：松嶋直人（以下「運営者」）</p>
      </section>

      <section className="mt-10">
        <h2>取得する情報</h2>
        <p className="mt-4 text-text-secondary">
          お問い合わせ・レポートダウンロード・取材応募・サービス相談の各フォームから、以下の情報を取得します。
        </p>
        <ul className="mt-4 list-inside list-disc space-y-2 text-text-secondary">
          <li>会社名・会社URL</li>
          <li>氏名・メールアドレス・役職</li>
          <li>業界</li>
          <li>電話番号（任意）</li>
          <li>ご相談内容・お困りごと（任意）</li>
        </ul>
        <p className="mt-4 text-text-secondary">
          レポートダウンロードフォームでは、上記に加えて「関連情報の配信を希望するか」の同意有無を取得します。また、どのページ・どのコンテンツ経由でお問い合わせいただいたか（参照ページ、流入経路等）を自動的に記録します。
        </p>
        <p className="mt-4 text-text-secondary">
          このほか、サイトの利用状況を把握するため、アクセス解析ツールを用いて閲覧ページ等の情報を取得する場合があります。
        </p>
      </section>

      <section className="mt-10">
        <h2>利用目的</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-text-secondary">
          <li>お問い合わせへの回答</li>
          <li>レポートのご提供</li>
          <li>取材に関するご連絡・調整</li>
          <li>サービス相談への対応</li>
          <li>配信への同意をいただいた方への関連情報のご案内</li>
          <li>サイトの改善・利用状況の把握</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2>第三者提供</h2>
        <p className="mt-4 text-text-secondary">
          法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。メール配信・データ保存等の実施にあたり、業務委託先（メール配信サービス、サーバー・データベース提供事業者等）を利用する場合がありますが、目的の範囲内でのみ取り扱います。
        </p>
      </section>

      <section className="mt-10">
        <h2>保存期間</h2>
        <p className="mt-4 text-text-secondary">
          取得した個人情報は、ご本人から削除のご依頼をいただくまでの間、適切に保管します。
        </p>
      </section>

      <section className="mt-10">
        <h2>開示・訂正・削除について</h2>
        <p className="mt-4 text-text-secondary">
          ご自身の個人情報の開示・訂正・削除をご希望の場合は、お問い合わせフォームよりご連絡ください。内容を確認のうえ、合理的な範囲で対応いたします。
        </p>
      </section>

      <section className="mt-10">
        <h2>お問い合わせ窓口</h2>
        <p className="mt-4 text-text-secondary">
          個人情報の取り扱いに関するお問い合わせは、運営者（松嶋直人）宛にお問い合わせフォームからご連絡ください。
        </p>
      </section>

      <section className="mt-10">
        <h2>改定について</h2>
        <p className="mt-4 text-text-secondary">
          本ポリシーの内容は、事業内容の変更等に応じて改定することがあります。重要な変更がある場合は、当サイト上でお知らせします。
        </p>
      </section>
    </Container>
  );
}
