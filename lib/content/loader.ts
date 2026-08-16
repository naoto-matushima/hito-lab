import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ArticleFrontmatterSchema, type ArticleFrontmatter } from "@/lib/validation";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleContent {
  frontmatter: ArticleFrontmatter;
  body: string;
  filePath: string;
}

/** contentDirを差し替えられるようにして、テストからfixtureディレクトリを渡せるようにする */
export function getAllArticles(articlesDir: string = ARTICLES_DIR): ArticleContent[] {
  if (!fs.existsSync(articlesDir)) return [];
  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(articlesDir, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const result = ArticleFrontmatterSchema.safeParse(data);
      if (!result.success) {
        throw new Error(`${filePath} のfrontmatter validationに失敗しました: ${result.error.message}`);
      }
      return { frontmatter: result.data, body: content, filePath };
    });
}

/** docs/03-content-model.md §8: statusがpublishedのもののみ本番対象とする */
export function getPublishedArticles(articlesDir: string = ARTICLES_DIR): ArticleContent[] {
  return getAllArticles(articlesDir).filter((article) => article.frontmatter.status === "published");
}

export function getArticleBySlug(slug: string, articlesDir: string = ARTICLES_DIR): ArticleContent | undefined {
  return getAllArticles(articlesDir).find((article) => article.frontmatter.slug === slug);
}
