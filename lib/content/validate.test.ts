import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllArticles } from "./loader";
import { loadMasters } from "./masters";
import { findDuplicateSlugs, validateTaxonomyReferences } from "./validate";
import type { Masters } from "./masters";

const FIXTURES_DIR = path.join(process.cwd(), "test", "fixtures");

const emptyMasters: Masters = {
  themes: [],
  industries: [],
  jobs: [],
  areas: [],
  tags: [],
  people: [],
  companies: [],
  sources: [],
  ctas: [],
};

describe("findDuplicateSlugs", () => {
  it("同一slugの記事を検出する", () => {
    const articles = getAllArticles(path.join(FIXTURES_DIR, "duplicate-slug"));
    const issues = findDuplicateSlugs(articles);
    expect(issues).toHaveLength(1);
    expect(issues[0].message).toContain("test-duplicate-article");
  });

  it("slugが一意な場合はエラーを返さない", () => {
    const articles = getAllArticles(path.join(FIXTURES_DIR, "valid"));
    expect(findDuplicateSlugs(articles)).toHaveLength(0);
  });

  it("実際のcontent/articlesにslug重複がない", () => {
    expect(findDuplicateSlugs(getAllArticles())).toHaveLength(0);
  });
});

describe("validateTaxonomyReferences", () => {
  const partialMasters: Masters = {
    ...emptyMasters,
    industries: [{ id: "construction", label: "建設", status: "active" }],
  };

  it("Masterに存在しないtaxonomy IDのみを検出する", () => {
    const articles = getAllArticles(path.join(FIXTURES_DIR, "invalid-taxonomy"));
    const issues = validateTaxonomyReferences(articles, partialMasters);
    const messages = issues.map((issue) => issue.message);
    expect(messages.some((message) => message.includes("nonexistent-industry-xyz"))).toBe(true);
    expect(messages.some((message) => message.includes('"construction"'))).toBe(false);
  });

  it("すべてのIDがMasterに存在する場合はエラーを返さない", () => {
    const articles = getAllArticles(path.join(FIXTURES_DIR, "valid"));
    expect(validateTaxonomyReferences(articles, emptyMasters)).toHaveLength(0);
  });

  it("実際のcontent/articlesとdata/taxonomiesが整合している", () => {
    const masters = loadMasters();
    const articles = getAllArticles();
    expect(validateTaxonomyReferences(articles, masters)).toHaveLength(0);
  });
});
