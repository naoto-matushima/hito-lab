import { z } from "zod";
import {
  ArticleTypeSchema,
  ContentStatusSchema,
  EyecatchSchema,
  LifecycleSchema,
  RevisionSchema,
  SeoOverrideSchema,
  SlugSchema,
  ThemeIdSchema,
} from "./common";

/**
 * Article / Report / Interview共通のコンテンツモデル。
 * docs/03-content-model.md §3
 */
const BaseContentFields = z.object({
  id: z.string(),
  title: z.string().min(1),
  slug: SlugSchema,
  description: z.string().min(1),
  status: ContentStatusSchema,
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  primaryTheme: ThemeIdSchema,
  themes: z.array(ThemeIdSchema).min(1),
  industries: z.array(z.string()).default([]),
  jobs: z.array(z.string()).default([]),
  areas: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  authors: z.array(z.string()).default([]),
  editors: z.array(z.string()).default([]),
  reviewers: z.array(z.string()).default([]),
  sources: z.array(z.string()).default([]),
  eyecatch: EyecatchSchema.optional(),
  featured: z.boolean().default(false),
  relatedContent: z.array(z.string()).default([]),
  cta: z.array(z.string()).default([]),
  seo: SeoOverrideSchema.optional(),
  lifecycle: LifecycleSchema.optional(),
  revisions: z.array(RevisionSchema).optional(),
});

/** docs/03-content-model.md §11・§12: primaryThemeは必ずthemesに含まれる */
function primaryThemeIncludedInThemes(data: { primaryTheme: string; themes: string[] }) {
  return data.themes.includes(data.primaryTheme);
}

const PRIMARY_THEME_ISSUE = {
  message: "primaryThemeはthemesに含めてください",
  path: ["themes"] as string[],
};

/**
 * Articleモデル。docs/03-content-model.md §30-31
 * 11-open-issues.md A-3: contentType: article + articleTypeの2階層。
 */
export const ArticleFrontmatterSchema = BaseContentFields.extend({
  contentType: z.literal("article"),
  articleType: ArticleTypeSchema,
}).refine(primaryThemeIncludedInThemes, PRIMARY_THEME_ISSUE);
export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;

/** Reportモデル。docs/03-content-model.md §32-42 */
export const ResearchSchema = z.object({
  year: z.number().optional(),
  types: z.array(z.string()).default([]),
  period: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
  targetPopulation: z.string().optional(),
  sampleSize: z.number().optional(),
  methodology: z.string().optional(),
  notes: z.string().optional(),
});

export type Research = z.infer<typeof ResearchSchema>;

export const ReportDownloadSchema = z.object({
  enabled: z.boolean(),
  assetId: z.string().optional(),
  formId: z.string().optional(),
});
export type ReportDownload = z.infer<typeof ReportDownloadSchema>;

export const ReportFrontmatterSchema = BaseContentFields.extend({
  contentType: z.literal("report"),
  research: ResearchSchema,
  download: ReportDownloadSchema.optional(),
}).refine(primaryThemeIncludedInThemes, PRIMARY_THEME_ISSUE);
export type ReportFrontmatter = z.infer<typeof ReportFrontmatterSchema>;

/** Interviewモデル。docs/03-content-model.md §43-45 */
export const InterviewDetailSchema = z.object({
  conductedAt: z.string().optional(),
  interviewees: z.array(z.string()).default([]),
  companies: z.array(z.string()).default([]),
});
export type InterviewDetail = z.infer<typeof InterviewDetailSchema>;

export const InterviewFrontmatterSchema = BaseContentFields.extend({
  contentType: z.literal("interview"),
  interview: InterviewDetailSchema,
}).refine(primaryThemeIncludedInThemes, PRIMARY_THEME_ISSUE);
export type InterviewFrontmatter = z.infer<typeof InterviewFrontmatterSchema>;
