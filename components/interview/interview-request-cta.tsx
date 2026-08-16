import { Button, Card } from "@/components/ui";

/**
 * docs/05-page-template.md §53: 取材募集CTA。
 * 11-open-issues.md B-1（取材募集ページURL）は未決のため、既決定URLの/contact/を暫定使用する。
 */
export function InterviewRequestCta() {
  return (
    <Card className="my-8 border-primary bg-primary-pale text-center">
      <p className="font-bold text-text">取材にご協力いただける企業を募集しています</p>
      <p className="mt-2 text-sm text-text-secondary">
        人手不足研究所では、企業・経営者・働く方・専門家への取材を行っています。
      </p>
      <div className="mt-4">
        <Button href="/contact/" variant="primary">
          取材について相談する
        </Button>
      </div>
    </Card>
  );
}
