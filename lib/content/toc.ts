import { slugifyHeading } from "./slugify";

export type TocItem = {
  level: 2 | 3;
  text: string;
  id: string;
};

const HEADING_PATTERN = /^(#{2,3})\s+(.+)$/gm;

/**
 * 生のMDX本文からH2/H3を抽出しTOCを生成する。
 * idはcomponents/mdx/headings.tsxの見出しレンダラーと同じslugifyHeadingで一致させる。
 * docs/05-page-template.md §37
 */
export function extractToc(mdxBody: string): TocItem[] {
  const items: TocItem[] = [];
  for (const match of mdxBody.matchAll(HEADING_PATTERN)) {
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    items.push({ level, text, id: slugifyHeading(text) });
  }
  return items;
}
