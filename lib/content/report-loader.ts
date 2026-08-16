import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ReportFrontmatterSchema, type ReportFrontmatter } from "@/lib/validation";

const REPORTS_DIR = path.join(process.cwd(), "content", "reports");

export interface ReportContent {
  frontmatter: ReportFrontmatter;
  body: string;
  filePath: string;
}

/**
 * docs/03-content-model.md §32-42のReport Schemaを用いたContent Loader。
 * lib/content/loader.ts（Article）と同じパターン。content/reports/は
 * Phase 4時点では空だが、Phase 5でファイルが追加されれば自動的に反映される。
 */
export function getAllReports(reportsDir: string = REPORTS_DIR): ReportContent[] {
  if (!fs.existsSync(reportsDir)) return [];
  return fs
    .readdirSync(reportsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(reportsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const result = ReportFrontmatterSchema.safeParse(data);
      if (!result.success) {
        throw new Error(`${filePath} のfrontmatter validationに失敗しました: ${result.error.message}`);
      }
      return { frontmatter: result.data, body: content, filePath };
    });
}

export function getPublishedReports(reportsDir: string = REPORTS_DIR): ReportContent[] {
  return getAllReports(reportsDir).filter((report) => report.frontmatter.status === "published");
}
