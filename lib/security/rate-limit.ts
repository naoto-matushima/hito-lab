type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

export type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
};

export const DEFAULT_RATE_LIMIT: RateLimitOptions = {
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
};

/**
 * docs/08-technical-architecture.md §83: Rate Limit（最低限）。
 * IPごとのインメモリ・スライディングウィンドウ。サーバーレス環境では複数インスタンス間で
 * メモリが共有されないため、この実装は単一インスタンス内での簡易的な保護に留まる。
 * 本番で厳密な保護が必要な場合はRedis等の外部ストアへの置き換えを検討する。
 */
export function isRateLimited(key: string, options: RateLimitOptions = DEFAULT_RATE_LIMIT, now = Date.now()): boolean {
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > options.windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;
  return bucket.count > options.maxRequests;
}

export function resetRateLimit(key: string): void {
  buckets.delete(key);
}
