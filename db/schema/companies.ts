import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/** docs/08-technical-architecture.md §39・§43-44: domainで重複判定。IDはUUID */
export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  websiteUrl: text("website_url"),
  industry: text("industry"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
