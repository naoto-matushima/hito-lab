import { defineConfig } from "drizzle-kit";

/**
 * Migrationは生成のみ行い、適用（push/migrate）は人間が実行する。
 * .claude/settings.json でも drizzle-kit push/migrate・psql を deny している。
 */
export default defineConfig({
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgres://placeholder",
  },
});
