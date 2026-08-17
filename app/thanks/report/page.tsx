import type { Metadata } from "next";
import { Container } from "@/components/ui";

/** docs/02-sitemap-url.md: /thanks/*はnoindex・sitemap除外 */
export const metadata: Metadata = {
  title: "お申し込みありがとうございました",
  robots: { index: false, follow: false },
};

/** docs/07-conversion-lead.md §23-24 */
export default function ThanksReportPage() {
  return (
    <Container size="narrow" className="py-16 text-center">
      <h1>お申し込みありがとうございました</h1>
      <p className="mt-4 text-text-secondary">
        ご入力いただいたメールアドレス宛に、レポートの入手方法をお送りしました。
      </p>
      <p className="mt-2 text-sm text-text-muted">
        ※現在PDF配布の仕組みを準備中です。届かない場合はお問い合わせください。
      </p>
    </Container>
  );
}
