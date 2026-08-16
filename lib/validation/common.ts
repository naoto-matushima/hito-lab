import { z } from "zod";

/**
 * docs/01-information-architecture.md §5, docs/11-open-issues.md A-1で確定したTheme ID。
 */
export const ThemeIdSchema = z.enum(["recruiting", "organization", "dx", "management"]);
export type ThemeId = z.infer<typeof ThemeIdSchema>;

/** docs/03-content-model.md §8 */
export const ContentStatusSchema = z.enum(["draft", "review", "published", "archived"]);
export type ContentStatus = z.infer<typeof ContentStatusSchema>;

/** docs/03-content-model.md §31 */
export const ArticleTypeSchema = z.enum(["analysis", "guide", "news", "case", "opinion"]);
export type ArticleType = z.infer<typeof ArticleTypeSchema>;

/** docs/03-content-model.md §10 */
export const LifecycleSchema = z.enum(["evergreen", "annual", "news", "temporary"]);

/** docs/03-content-model.md §6 */
export const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const SlugSchema = z
  .string()
  .regex(SLUG_PATTERN, "slugは英小文字のkebab-caseで指定してください");

/** docs/03-content-model.md §18 */
export const EyecatchSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  credit: z.string().optional(),
});

/** docs/03-content-model.md §65 */
export const SeoOverrideSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  canonical: z.string().optional(),
  noindex: z.boolean().optional(),
});

/** docs/03-content-model.md §29 */
export const RevisionSchema = z.object({
  date: z.string(),
  note: z.string(),
});

/** docs/03-content-model.md §49 */
export const LinkStatusSchema = z.enum(["active", "inactive", "unknown"]);
