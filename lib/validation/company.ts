import { z } from "zod";
import { LinkStatusSchema } from "./common";

/** docs/03-content-model.md §46-49 */
export const JobLinkSchema = z.object({
  label: z.string(),
  url: z.string().optional(),
  status: LinkStatusSchema,
});

export const CompanySchema = z.object({
  id: z.string().regex(/^company_/, "CompanyのIDはcompany_で始めてください"),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  industry: z.array(z.string()).default([]),
  location: z
    .object({
      prefecture: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
  website: z
    .object({
      url: z.string().optional(),
      status: LinkStatusSchema,
    })
    .optional(),
  recruitment: z
    .object({
      page: z
        .object({
          url: z.string().optional(),
          status: LinkStatusSchema,
        })
        .optional(),
      jobLinks: z.array(JobLinkSchema).default([]),
    })
    .optional(),
  logo: z.string().optional(),
});
export type Company = z.infer<typeof CompanySchema>;
