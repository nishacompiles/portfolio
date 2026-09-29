/**
 * Minimal in-memory sliding-window rate limiter (per key/IP).
 *
 * Suitable for a low-traffic personal portfolio single instance.
 *
 * Upgrade path for production: replace `rateLimit`'s body with a shared store
 * (e.g. Upstash Redis) so limits survive restarts and scale across instances.
 * The signature and return shape stay identical, so callers need no changes.
 *
 *   +------------------------------+
 *   | key            string        |  e.g. "chat:203.0.113.7"
 *   | max            number        |  max requests per window
 *   | windowMs       number        |  window length in ms
 *   +------------------------------+
 */

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const buckets = new Map<string, number[]>();
let lastCleanup = Date.now();

export function rateLimit(
  key: string,
  max: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Opportunistic cleanup so the map never grows unbounded.
  if (buckets.size > 500 || now - lastCleanup > windowMs) {
    for (const [entryKey, times] of buckets) {
      if (times[times.length - 1] <= windowStart) {
        buckets.delete(entryKey);
      }
    }
    lastCleanup = now;
  }

  const times = (buckets.get(key) ?? []).filter((t) => t > windowStart);

  if (times.length >= max) {
    const retryAfterMs = times[0] + windowMs - now;
    buckets.set(key, times);
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  times.push(now);
  buckets.set(key, times);
  return { ok: true, remaining: max - times.length, retryAfterSeconds: 0 };
}