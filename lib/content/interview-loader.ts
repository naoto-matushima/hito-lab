import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { InterviewFrontmatterSchema, type InterviewFrontmatter } from "@/lib/validation";

const INTERVIEWS_DIR = path.join(process.cwd(), "content", "interviews");

export interface InterviewContent {
  frontmatter: InterviewFrontmatter;
  body: string;
  filePath: string;
}

/**
 * docs/03-content-model.md §43-45のInterview Schemaを用いたContent Loader。
 * lib/content/loader.ts（Article）と同じパターン。content/interviews/は
 * Phase 4時点では空だが、Phase 5でファイルが追加されれば自動的に反映される。
 */
export function getAllInterviews(interviewsDir: string = INTERVIEWS_DIR): InterviewContent[] {
  if (!fs.existsSync(interviewsDir)) return [];
  return fs
    .readdirSync(interviewsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(interviewsDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const result = InterviewFrontmatterSchema.safeParse(data);
      if (!result.success) {
        throw new Error(`${filePath} のfrontmatter validationに失敗しました: ${result.error.message}`);
      }
      return { frontmatter: result.data, body: content, filePath };
    });
}

export function getPublishedInterviews(interviewsDir: string = INTERVIEWS_DIR): InterviewContent[] {
  return getAllInterviews(interviewsDir).filter((interview) => interview.frontmatter.status === "published");
}
