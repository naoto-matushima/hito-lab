import { z } from "zod";
import { ThemeIdSchema } from "./common";

/** docs/06-brand-ui.md §42相当。Hub上の重要データ・主要統計に使う */
export const HubStatSchema = z.object({
  value: z.string(),
  label: z.string(),
  context: z.string().optional(),
});
export type HubStat = z.infer<typeof HubStatSchema>;

/** docs/05-page-template.md §22: Theme Hubの主要課題・論点 */
export const HubTopicSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export type HubTopic = z.infer<typeof HubTopicSchema>;

/** docs/05-page-template.md §18-26: Theme Hubの固定Editorial Content */
export const ThemeHubContentSchema = z.object({
  themeId: ThemeIdSchema,
  metaDescription: z.string(),
  overview: z.string(),
  currentSituation: z.string(),
  keyStats: z.array(HubStatSchema).min(1),
  keyTopics: z.array(HubTopicSchema).min(1),
  sources: z.array(z.string()).default([]),
});
export type ThemeHubContent = z.infer<typeof ThemeHubContentSchema>;

/** docs/05-page-template.md §28-32: Industry Hubの固定Editorial Content */
export const IndustryHubContentSchema = z.object({
  industryId: z.string(),
  metaDescription: z.string(),
  overview: z.string(),
  currentSituation: z.string(),
  keyStats: z.array(HubStatSchema).min(1),
  sources: z.array(z.string()).default([]),
});
export type IndustryHubContent = z.infer<typeof IndustryHubContentSchema>;
