import type { Metadata } from "next";
import { getFormIndustryOptions } from "@/lib/lead";
import { Breadcrumb, Container } from "@/components/ui";
import { ContactForm } from "@/components/form";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "人手不足研究所へのお問い合わせはこちらから。",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const industries = getFormIndustryOptions();

  return (
    <Container size="narrow" className="py-12">
      <Breadcrumb items={[{ label: "TOP", href: "/" }, { label: "お問い合わせ" }]} />
      <h1 className="mt-4">お問い合わせ</h1>
      <p className="mt-4 text-text-secondary">
        メディアに関するお問い合わせ、引用・協業のご相談等はこちらからご連絡ください。
      </p>
      <div className="mt-8">
        <ContactForm industries={industries} />
      </div>
    </Container>
  );
}
