import type { MDXComponents } from "mdx/types";
import { KeyFinding } from "./key-finding";
import { StatCard, StatCardGroup } from "./stat-card";
import { Chart } from "./chart";
import { DataTable } from "./data-table";
import { CTA } from "./cta";
import { MdxH2, MdxH3 } from "./headings";

/** .claude/skills/add-article/SKILL.md で列挙されている使用可能コンポーネント一覧 */
export const mdxComponents: MDXComponents = {
  h2: MdxH2,
  h3: MdxH3,
  KeyFinding,
  StatCard,
  StatCardGroup,
  Chart,
  DataTable,
  CTA,
};

export { KeyFinding, StatCard, StatCardGroup, Chart, DataTable, CTA, MdxH2, MdxH3 };
