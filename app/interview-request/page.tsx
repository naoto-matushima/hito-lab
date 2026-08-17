import type { Metadata } from "next";
import { getFormIndustryOptions } from "@/lib/lead";
import { Breadcrumb, Container } from "@/components/ui";
import { InterviewRequestForm } from "@/components/form";

/** 11-open-issues.md B-1で確定したURL */
export const metadata: Metadata = {
  title: "取材にご協力いただける企業を募集しています",
  description: "人手不足研究所では、企業・経営者・働く方・専門家への取材を行っています。",
  alternates: { canonical: "/interview-request/" },
};

export default function InterviewRequestPage() {
  const industries = getFormIndustryOptions();

  return (
    <Container size="narrow" className="py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "取材応募" }]} />
      <h1 className="mt-4">取材にご協力いただける企業を募集しています</h1>
      <p className="mt-4 text-text-secondary">
        人手不足研究所では、企業・経営者・働く方・専門家への取材を行っています。取材費用はかかりません。公式サイト・採用ページ・募集中の求人情報をあわせてご紹介できます。
      </p>
      <div className="mt-8">
        <InterviewRequestForm industries={industries} />
      </div>
    </Container>
  );
}
