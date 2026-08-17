import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "ご相談を受け付けました",
  robots: { index: false, follow: false },
};

/** docs/07-conversion-lead.md §27 */
export default function ThanksConsultationPage() {
  return (
    <Container size="narrow" className="py-16 text-center">
      <h1>ご相談を受け付けました</h1>
      <p className="mt-4 text-text-secondary">内容を確認の上、担当者よりご連絡いたします。</p>
    </Container>
  );
}
