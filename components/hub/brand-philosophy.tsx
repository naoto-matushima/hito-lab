/** docs/00-basic-design.md §2-1: ブランドビジョンと4つの基本思想 */
const STEPS = [
  { label: "採る", description: "必要な人材に選ばれる会社をつくる。" },
  { label: "活かす", description: "人が力を発揮し、長く働ける組織をつくる。" },
  { label: "減らす", description: "業務を見直し、ITや仕組みによって仕事の負担を減らす。" },
  { label: "強くする", description: "生まれた余力を、人・顧客・事業へ再投資し、企業としての魅力や競争力を高める。" },
];

export function BrandPhilosophy() {
  return (
    <section className="my-16">
      <h2>人手不足研究所の考え方</h2>
      <p className="mt-4 text-text-secondary">
        採用・組織・DX・経営改善は、それぞれ独立した課題ではなく、人手不足への一連の対応です。人が減っても、強くなる会社へ。
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {STEPS.map((step, index) => (
          <div key={step.label} className="rounded-lg border border-border bg-surface-subtle p-5 text-center">
            <p className="text-sm text-text-muted">STEP {index + 1}</p>
            <p className="mt-2 text-xl font-bold text-primary-dark">{step.label}</p>
            <p className="mt-2 text-sm text-text-secondary">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
