import type { Metadata } from "next";
import { getFormIndustryOptions } from "@/lib/lead";
import { Breadcrumb, Container } from "@/components/ui";
import { ServiceLeadForm } from "@/components/form";

/**
 * 11-open-issues.md B-1で確定したURL。
 * docs/02-sitemap-url.md §「/consultation/はnoindex。sitemapにも含めない」に従う。
 */
export const metadata: Metadata = {
  title: "サービス相談",
  description: "採用・組織・業務改善・DX・経営改善に関するご相談を承っています。",
  alternates: { canonical: "/consultation/" },
  robots: { index: false, follow: false },
};

export default function ConsultationPage() {
  const industries = getFormIndustryOptions();

  return (
    <Container size="narrow" className="py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "サービス相談" }]} />
      <h1 className="mt-4">サービス相談</h1>
      <p className="mt-4 text-text-secondary">
        採用・組織・人事・業務改善・DX・経営改善など、人手不足に関わるお困りごとについてご相談を承っています。
      </p>
      <div className="mt-8">
        <ServiceLeadForm industries={industries} />
      </div>
    </Container>
  );
}
