import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { companies } from "./companies";

/**
 * docs/08-technical-architecture.md §40・§45: emailで重複判定。
 * marketingConsentは11-open-issues.md B-4（Report Downloadフォームのメール配信同意）を保持する。
 */
export const people = pgTable("people", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role"),
  phone: text("phone"),
  marketingConsent: boolean("marketing_consent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
