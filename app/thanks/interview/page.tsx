import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "取材のお申し込みを受け付けました",
  robots: { index: false, follow: false },
};

/** docs/07-conversion-lead.md §25 */
export default function ThanksInterviewPage() {
  return (
    <Container size="narrow" className="py-16 text-center">
      <h1>取材のお申し込みを受け付けました</h1>
      <p className="mt-4 text-text-secondary">事務局より改めてご連絡いたします。今しばらくお待ちください。</p>
    </Container>
  );
}
