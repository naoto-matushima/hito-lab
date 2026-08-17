import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { people } from "./people";

/** docs/08-technical-architecture.md §42 */
export const activityTypeEnum = pgEnum("activity_type", [
  "report_download",
  "interview_request",
  "contact",
  "service_lead",
]);

/** docs/08-technical-architecture.md §41・docs/07-conversion-lead.md §28-37 */
export const activities = pgTable("activities", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
  personId: uuid("person_id")
    .notNull()
    .references(() => people.id),
  type: activityTypeEnum("type").notNull(),
  contentId: text("content_id"),
  reportId: text("report_id"),
  landingPage: text("landing_page"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  issue: text("issue"),
  serviceCategory: text("service_category"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
