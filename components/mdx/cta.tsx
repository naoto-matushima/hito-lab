import { loadCtas } from "@/lib/content";
import { Button, Card } from "@/components/ui";

/** docs/03-content-model.md §53-56: CTA本文を直書きせずCTA Masterを参照する */
export type CTAProps = {
  id: string;
};

export function CTA({ id }: CTAProps) {
  const cta = loadCtas().find((entry) => entry.id === id);
  if (!cta || cta.status !== "active") return null;

  const href = cta.target.url ?? (cta.target.type === "report" ? "/reports/" : "/contact/");

  return (
    <Card className="not-prose my-8 border-primary bg-primary-pale">
      <p className="text-lg font-bold text-text">{cta.title}</p>
      {cta.description && <p className="mt-2 text-sm text-text-secondary">{cta.description}</p>}
      <Button href={href} variant="primary" className="mt-4">
        {cta.label}
      </Button>
    </Card>
  );
}
