/**
 * Signed admin session cookie. Uses Web Crypto so it works in middleware (edge) and in Node.
 * Token format: "<expiresAtMs>.<base64url HMAC-SHA256>".
 * The signing key includes the admin password, so changing ADMIN_PASSWORD logs out every session.
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_S = 60 * 60 * 24 * 7; // 7 days

const enc = new TextEncoder();

/** Names (never values) of admin env vars that are missing or invalid at runtime. */
export const adminConfigProblems = () => {
  const problems: string[] = [];
  if (!process.env.ADMIN_USERNAME) problems.push("ADMIN_USERNAME is missing");
  if (!process.env.ADMIN_PASSWORD) problems.push("ADMIN_PASSWORD is missing");
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  if (!secret) problems.push("ADMIN_SESSION_SECRET is missing");
  else if (secret.length < 32) problems.push(`ADMIN_SESSION_SECRET is too short (${secret.length} characters, needs 32+)`);
  return problems;
};

/** True when the env vars needed for the admin panel are present. */
export const adminConfigured = () => adminConfigProblems().length === 0;

const toBase64Url = (buf: ArrayBuffer) => {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(`${process.env.ADMIN_SESSION_SECRET}:${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", key, enc.encode(payload)));
}

/** Constant-time string comparison. */
const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

export async function createSessionToken() {
  const expires = String(Date.now() + SESSION_MAX_AGE_S * 1000);
  return `${expires}.${await sign(expires)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig || !/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  return safeEqual(sig, await sign(expires));
}

/** Compares submitted credentials without leaking timing info about which part was wrong. */
export async function credentialsMatch(username: string, password: string) {
  if (!adminConfigured()) return false;
  const [a, b] = await Promise.all([sign(`login:${username}:${password}`), sign(`login:${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`)]);
  return safeEqual(a, b);
}
