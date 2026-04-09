import "dotenv/config";

/**
 * מי «מותר» לדבר עם השרת מהדפדפן: ‎CORS_ORIGINS‎ ב־‎.env‎ → ‎getCorsOrigins()‎ → ‎index.ts‎ (מידלוור ‎cors‎).
 * לאן הקליינט שולח בקשות: בצד לקוח ‎VITE_API_BASE_URL‎ ב־‎client/.env‎ או ב־Vercel → ‎client/src/api.ts‎ (‎apiUrl‎).
 */

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function requireNumberEnv(name: string): number {
  const raw = requireEnv(name);
  const n = Number(raw);
  if (!Number.isFinite(n)) {
    throw new Error(`Env var ${name} must be a number, got: ${raw}`);
  }
  return n;
}

export const PORT = requireNumberEnv("PORT");

export const MONGODB_URI =
  process.env.MONGODB_URI?.trim() || process.env.MONGO_URI?.trim() || "";
if (!MONGODB_URI) {
  throw new Error("Missing required env var: MONGODB_URI (or MONGO_URI)");
}

export const JWT_SECRET = requireEnv("JWT_SECRET");

export const JWT_EXPIRES_DAYS = requireNumberEnv("JWT_EXPIRES_DAYS");

/** חובה להגדיר דומיין/ים מורשים ב־CORS_ORIGINS (מופרדים בפסיק). */
export function getCorsOrigins(): string[] {
  const raw = requireEnv("CORS_ORIGINS");
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean);
  if (!list.length) {
    throw new Error("Env var CORS_ORIGINS must include at least one origin");
  }
  return list;
}

export function getAdminCredentials(): { username: string; password: string } {
  return {
    username: requireEnv("ADMIN_USERNAME"),
    password: requireEnv("ADMIN_PASSWORD"),
  };
}


export const ATTEMPT_EXPIRE_AFTER_SECONDS = Math.max(
  0,
  requireNumberEnv("ATTEMPT_EXPIRE_AFTER_SECONDS")
);
