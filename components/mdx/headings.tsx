import type { ReactNode } from "react";
import { slugifyHeading } from "@/lib/content";

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    const withProps = node as { props?: { children?: ReactNode } };
    return getTextContent(withProps.props?.children);
  }
  return "";
}

/** docs/06-brand-ui.md §68: H2 Decorationは大きな色ベタ見出しを避け、Sageの短い左Borderとする */
export function MdxH2({ children }: { children: ReactNode }) {
  const id = slugifyHeading(getTextContent(children));
  return (
    <h2 id={id} className="scroll-mt-24 border-l-4 border-primary pl-4">
      {children}
    </h2>
  );
}

export function MdxH3({ children }: { children: ReactNode }) {
  const id = slugifyHeading(getTextContent(children));
  return (
    <h3 id={id} className="scroll-mt-24">
      {children}
    </h3>
  );
}
