import { z } from "zod";

/** docs/03-content-model.md §19-22 */
export const PersonRoleSchema = z.enum(["author", "editor", "reviewer"]);

/** docs/03-content-model.md §45 */
export const IntervieweeTypeSchema = z.enum([
  "executive",
  "hr",
  "employee",
  "recruitment-support",
  "hr-consultant",
  "it-vendor",
  "expert",
  "other",
]);

export const PersonSchema = z.object({
  id: z.string().regex(/^person_/, "PersonのIDはperson_で始めてください"),
  name: z.string(),
  slug: z.string(),
  role: z.array(PersonRoleSchema).default([]),
  intervieweeType: z.array(IntervieweeTypeSchema).default([]),
  position: z.string().optional(),
  organization: z.string().optional(),
  profile: z.string().optional(),
  image: z.string().optional(),
  website: z.string().optional(),
  social: z.record(z.string(), z.string()).optional(),
});
export type Person = z.infer<typeof PersonSchema>;
