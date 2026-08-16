import type { Metadata } from "next";
import { Breadcrumb, Button, Card, Container } from "@/components/ui";

/** docs/09-implementation-claude-code.md §21: Productionでは非公開 */
export const metadata: Metadata = {
  title: "UI Style Guide",
  robots: { index: false, follow: false },
};

const COLOR_SWATCHES = [
  { label: "Primary", className: "bg-primary" },
  { label: "Primary Dark", className: "bg-primary-dark" },
  { label: "Primary Light", className: "bg-primary-light" },
  { label: "Primary Pale", className: "bg-primary-pale" },
  { label: "Accent", className: "bg-accent" },
  { label: "Accent Dark", className: "bg-accent-dark" },
  { label: "Accent Light", className: "bg-accent-light" },
  { label: "Accent Pale", className: "bg-accent-pale" },
  { label: "Background", className: "bg-background" },
  { label: "Surface", className: "bg-surface" },
  { label: "Surface Subtle", className: "bg-surface-subtle" },
  { label: "Text", className: "bg-text" },
  { label: "Text Secondary", className: "bg-text-secondary" },
  { label: "Text Muted", className: "bg-text-muted" },
  { label: "Border", className: "bg-border" },
];

export default function DevUiPage() {
  return (
    <Container className="flex flex-col gap-16 py-16">
      <section>
        <h1>Design System Style Guide</h1>
        <p className="mt-4 text-text-secondary">
          Phase 2で実装したDesign Token・Typography・共通コンポーネントの確認用ページです（Production非公開）。
        </p>
      </section>

      <section>
        <h2>Typography</h2>
        <div className="mt-6 flex flex-col gap-4">
          <h1>H1 見出し：建設業は本当に人手不足なのか</h1>
          <h2>H2 見出し：建設投資額と就業者数の推移</h2>
          <h3>H3 見出し：調査概要</h3>
          <p>
            本文テキストです。Noto Sans
            JPを基本フォントとし、読み物として十分な行間を確保します。人手不足研究所は、建設・介護・物流・製造・宿泊など人手不足の影響を受ける企業に向けた調査・実践メディアです。
          </p>
          <p className="text-sm text-text-muted">Small Text: 出典・キャプション等に利用します。</p>
        </div>
      </section>

      <section>
        <h2>Color</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {COLOR_SWATCHES.map((swatch) => (
            <div key={swatch.label} className="flex flex-col gap-2">
              <div className={`h-16 rounded-md border border-border ${swatch.className}`} />
              <p className="text-xs text-text-muted">{swatch.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Button</h2>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>
      </section>

      <section>
        <h2>Card</h2>
        <div className="mt-6 max-w-sm">
          <Card>
            <p className="font-medium text-text">Card Title</p>
            <p className="mt-2 text-sm text-text-secondary">
              汎用Cardコンポーネント。ArticleCard等のコンテンツ種別ごとのCardはPhase 3以降で実装します。
            </p>
          </Card>
        </div>
      </section>

      <section>
        <h2>Breadcrumb</h2>
        <div className="mt-6">
          <Breadcrumb
            items={[
              { label: "TOP", href: "/" },
              { label: "採用・人材確保", href: "/recruiting/" },
              { label: "建設業は本当に人手不足なのか" },
            ]}
          />
        </div>
      </section>
    </Container>
  );
}
