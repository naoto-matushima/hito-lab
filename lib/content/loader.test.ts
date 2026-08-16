import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllArticles, getArticleBySlug, getPublishedArticles } from "./loader";

const FIXTURES_DIR = path.join(process.cwd(), "test", "fixtures");

describe("getAllArticles", () => {
  it("MDXファイルを読み込み、frontmatterをparseできる", () => {
    const articles = getAllArticles(path.join(FIXTURES_DIR, "valid"));
    expect(articles).toHaveLength(2);
    const slugs = articles.map((article) => article.frontmatter.slug).sort();
    expect(slugs).toEqual(["test-draft-article", "test-published-article"]);
  });

  it("不正なfrontmatterのMDXがあるとエラーを投げる", () => {
    expect(() => getAllArticles(path.join(FIXTURES_DIR, "invalid-frontmatter"))).toThrow();
  });

  it("実際のcontent/articlesが読み込める", () => {
    expect(() => getAllArticles()).not.toThrow();
    expect(getAllArticles().length).toBeGreaterThan(0);
  });
});

describe("getPublishedArticles", () => {
  it("statusがdraftの記事を除外する", () => {
    const published = getPublishedArticles(path.join(FIXTURES_DIR, "valid"));
    expect(published).toHaveLength(1);
    expect(published[0].frontmatter.status).toBe("published");
    expect(published[0].frontmatter.slug).toBe("test-published-article");
  });

  it("実際のcontent/articlesではdraftのサンプル記事が除外される", () => {
    const published = getPublishedArticles();
    expect(published.every((article) => article.frontmatter.status === "published")).toBe(true);
  });
});

describe("getArticleBySlug", () => {
  it("slugで記事を取得できる", () => {
    const article = getArticleBySlug("test-draft-article", path.join(FIXTURES_DIR, "valid"));
    expect(article?.frontmatter.title).toBe("テスト記事（下書き）");
  });

  it("存在しないslugの場合はundefinedを返す", () => {
    const article = getArticleBySlug("does-not-exist", path.join(FIXTURES_DIR, "valid"));
    expect(article).toBeUndefined();
  });
});
