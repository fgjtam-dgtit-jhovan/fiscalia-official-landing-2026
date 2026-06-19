import crypto from "crypto";

const fallbackKey = crypto.createHash("sha256").update("development-only-fiscalia-landing-key").digest();

function getEncryptionKey() {
  const configuredKey = process.env.ENCRYPTION_KEY;
  if (!configuredKey) return fallbackKey;
  return crypto.createHash("sha256").update(configuredKey).digest();
}

export function encryptSensitiveValue(value: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [iv.toString("hex"), tag.toString("hex"), encrypted.toString("hex")].join(":");
}

export function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, "").trim().slice(0, 500);
}

const requestBuckets = new Map<string, { count: number; expiresAt: number }>();

export function rateLimit(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const current = requestBuckets.get(key);
  if (!current || current.expiresAt < now) {
    requestBuckets.set(key, { count: 1, expiresAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (current.count >= limit) return { ok: false, remaining: 0 };

  current.count += 1;
  return { ok: true, remaining: limit - current.count };
}
