import { describe, expect, it } from "vitest";
import { ArticleFrontmatterSchema } from "@/lib/validation";
import { findRelatedArticles } from "./related";
import type { ArticleContent } from "./loader";

function makeArticle(overrides: Record<string, unknown>): ArticleContent {
  const frontmatter = ArticleFrontmatterSchema.parse({
    id: "cnt_test",
    title: "テスト",
    slug: "test",
    description: "説明",
    contentType: "article",
    articleType: "analysis",
    status: "published",
    primaryTheme: "recruiting",
    themes: ["recruiting"],
    industries: [],
    jobs: [],
    areas: [],
    tags: [],
    relatedContent: [],
    ...overrides,
  });
  return { frontmatter, body: "", filePath: `test/${frontmatter.id}.mdx` };
}

describe("findRelatedArticles", () => {
  it("自分自身は候補から除外する", () => {
    const target = makeArticle({ id: "cnt_a", slug: "a" });
    const result = findRelatedArticles(target, [target]);
    expect(result).toHaveLength(0);
  });

  it("draft記事は候補から除外する", () => {
    const target = makeArticle({ id: "cnt_a", slug: "a", industries: ["construction"] });
    const draftCandidate = makeArticle({ id: "cnt_b", slug: "b", status: "draft", industries: ["construction"] });
    const result = findRelatedArticles(target, [target, draftCandidate]);
    expect(result).toHaveLength(0);
  });

  it("手動指定のrelatedContentを優先する", () => {
    const manual = makeArticle({ id: "cnt_manual", slug: "manual", industries: [] });
    const scored = makeArticle({ id: "cnt_scored", slug: "scored", industries: ["construction"] });
    const target = makeArticle({
      id: "cnt_a",
      slug: "a",
      industries: ["construction"],
      relatedContent: ["cnt_manual"],
    });
    const result = findRelatedArticles(target, [target, manual, scored]);
    expect(result[0].frontmatter.id).toBe("cnt_manual");
  });

  it("同一primaryTheme/industry/tagのスコアが高い順に並ぶ", () => {
    const target = makeArticle({
      id: "cnt_a",
      slug: "a",
      industries: ["construction"],
      tags: ["labor-shortage"],
    });
    const highScore = makeArticle({
      id: "cnt_high",
      slug: "high",
      industries: ["construction"],
      tags: ["labor-shortage"],
    });
    const lowScore = makeArticle({
      id: "cnt_low",
      slug: "low",
      primaryTheme: "dx",
      themes: ["dx"],
      industries: [],
      tags: ["labor-shortage"],
    });
    const noMatch = makeArticle({ id: "cnt_none", slug: "none", primaryTheme: "management", themes: ["management"] });

    const result = findRelatedArticles(target, [target, lowScore, highScore, noMatch]);
    expect(result.map((article) => article.frontmatter.id)).toEqual(["cnt_high", "cnt_low"]);
  });

  it("limitで件数を絞る", () => {
    const target = makeArticle({ id: "cnt_a", slug: "a", industries: ["construction"] });
    const candidates = Array.from({ length: 5 }, (_, i) =>
      makeArticle({ id: `cnt_c${i}`, slug: `c${i}`, industries: ["construction"] }),
    );
    const result = findRelatedArticles(target, [target, ...candidates], 2);
    expect(result).toHaveLength(2);
  });
});
