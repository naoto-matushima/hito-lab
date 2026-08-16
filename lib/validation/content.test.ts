import { describe, expect, it } from "vitest";
import { ArticleFrontmatterSchema } from "./content";

const baseArticle = {
  id: "cnt_test",
  title: "テスト",
  slug: "test-article",
  description: "説明",
  contentType: "article" as const,
  articleType: "analysis" as const,
  status: "draft" as const,
  primaryTheme: "recruiting" as const,
  themes: ["recruiting"] as const,
};

describe("ArticleFrontmatterSchema", () => {
  it("正しいfrontmatterをparseできる", () => {
    expect(() => ArticleFrontmatterSchema.parse(baseArticle)).not.toThrow();
  });

  it("primaryThemeがthemesに含まれない場合はエラーになる", () => {
    const invalid = { ...baseArticle, primaryTheme: "dx" as const };
    expect(() => ArticleFrontmatterSchema.parse(invalid)).toThrow();
  });

  it("slugがkebab-case以外の場合はエラーになる", () => {
    const invalid = { ...baseArticle, slug: "Test_Article" };
    expect(() => ArticleFrontmatterSchema.parse(invalid)).toThrow();
  });

  it("必須フィールド(description)が欠けている場合はエラーになる", () => {
    const rest: Partial<typeof baseArticle> = { ...baseArticle };
    delete rest.description;
    expect(() => ArticleFrontmatterSchema.parse(rest)).toThrow();
  });
});
