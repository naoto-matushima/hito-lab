import { z } from "zod";

/** docs/03-content-model.md §54 */
export const CtaTypeSchema = z.enum([
  "report-download",
  "contact",
  "consultation",
  "interview-request",
  "newsletter",
  "external",
]);

export const CtaStatusSchema = z.enum(["active", "inactive"]);

export const CtaSchema = z.object({
  id: z.string().regex(/^cta_/, "CTAのIDはcta_で始めてください"),
  type: CtaTypeSchema,
  title: z.string(),
  description: z.string().optional(),
  label: z.string(),
  target: z.object({
    type: z.enum(["report", "article", "interview", "form", "external"]),
    id: z.string().optional(),
    url: z.string().optional(),
  }),
  status: CtaStatusSchema,
});
export type Cta = z.infer<typeof CtaSchema>;
