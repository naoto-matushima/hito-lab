import { z } from "zod";

/** docs/03-content-model.md §26 */
export const SourceTypeSchema = z.enum([
  "government",
  "academic",
  "industry",
  "company",
  "media",
  "survey",
  "other",
]);

export const SourceSchema = z.object({
  id: z.string().regex(/^source_/, "SourceのIDはsource_で始めてください"),
  title: z.string(),
  publisher: z.string(),
  url: z.string().optional(),
  publishedAt: z.string().optional(),
  accessedAt: z.string().optional(),
  sourceType: SourceTypeSchema,
});
export type Source = z.infer<typeof SourceSchema>;
