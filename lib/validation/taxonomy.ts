import { z } from "zod";
import { ThemeIdSchema } from "./common";

/** docs/03-content-model.md §58 */
export const ThemeMasterEntrySchema = z.object({
  id: ThemeIdSchema,
  label: z.string(),
  shortLabel: z.string().optional(),
  brandLabel: z.string().optional(),
  description: z.string().optional(),
  url: z.string(),
});
export type ThemeMasterEntry = z.infer<typeof ThemeMasterEntrySchema>;

/** docs/03-content-model.md §59, docs/11-open-issues.md A-7 */
export const IndustryStatusSchema = z.enum(["active", "planned"]);

export const IndustryMasterEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  status: IndustryStatusSchema,
});
export type IndustryMasterEntry = z.infer<typeof IndustryMasterEntrySchema>;

/** docs/03-content-model.md §60 */
export const JobMasterEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  relatedIndustries: z.array(z.string()).default([]),
});
export type JobMasterEntry = z.infer<typeof JobMasterEntrySchema>;

/** docs/03-content-model.md §61 */
export const AreaTypeSchema = z.enum(["nationwide", "region", "prefecture"]);

export const AreaMasterEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  type: AreaTypeSchema,
  parent: z.string().optional(),
});
export type AreaMasterEntry = z.infer<typeof AreaMasterEntrySchema>;

/** docs/03-content-model.md §62 */
export const TagMasterEntrySchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
});
export type TagMasterEntry = z.infer<typeof TagMasterEntrySchema>;

export const ThemeMasterFileSchema = z.array(ThemeMasterEntrySchema);
export const IndustryMasterFileSchema = z.array(IndustryMasterEntrySchema);
export const JobMasterFileSchema = z.array(JobMasterEntrySchema);
export const AreaMasterFileSchema = z.array(AreaMasterEntrySchema);
export const TagMasterFileSchema = z.array(TagMasterEntrySchema);
