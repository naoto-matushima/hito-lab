import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | undefined;

/**
 * DATABASE_URL未設定時は例外を投げる。モジュール読み込み時ではなく呼び出し時に評価するため、
 * DATABASE_URLが無い状態でも npm run build は失敗しない。
 * docs/08-technical-architecture.md: 本番DBのURLはVercel Environment Variables側にのみ保持する。
 */
export function getDb() {
  if (cachedDb) return cachedDb;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URLが設定されていません。フォーム送信を保存するにはPostgreSQL接続が必要です。");
  }

  const client = postgres(connectionString);
  cachedDb = drizzle(client, { schema });
  return cachedDb;
}
