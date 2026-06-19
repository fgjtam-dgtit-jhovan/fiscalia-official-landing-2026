import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashIp, sanitizeText } from "@/lib/security";

const sessionCookie = "fgj_admin_session";
const demoEmail = process.env.ADMIN_EMAIL ?? "admin@fgj.example";
const demoPassword = process.env.ADMIN_PASSWORD ?? "Admin2026!";

type SessionPayload = {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "EDITOR" | "AUDITOR";
  exp: number;
};

function sessionSecret() {
  return process.env.SESSION_SECRET ?? "development-only-session-secret-change-me";
}

function sign(value: string) {
  return crypto.createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

function timingSafeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function hashPassword(password: string, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 120_000, 32, "sha256").toString("hex");
  return `pbkdf2_sha256$120000$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterations, salt, hash] = storedHash.split("$");
  if (algorithm !== "pbkdf2_sha256" || !iterations || !salt || !hash) return false;
  const candidate = crypto.pbkdf2Sync(password, salt, Number(iterations), 32, "sha256").toString("hex");
  return timingSafeEqual(candidate, hash);
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 1000 * 60 * 60 * 8 })).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readSessionToken(token?: string) {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature || !timingSafeEqual(sign(body), signature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getAdminSession() {
  return readSessionToken(cookies().get(sessionCookie)?.value);
}

export function requireAdmin() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export function setAdminSession(payload: Omit<SessionPayload, "exp">) {
  cookies().set(sessionCookie, createSessionToken(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export function clearAdminSession() {
  cookies().delete(sessionCookie);
}

export async function authenticateAdmin(emailInput: string, password: string, ip = "127.0.0.1") {
  const email = sanitizeText(emailInput).toLowerCase();

  try {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (user?.isActive && verifyPassword(password, user.passwordHash)) {
      await prisma.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
      await prisma.auditLog.create({
        data: { action: "admin.login.success", ipHash: hashIp(ip), metadata: { adminId: user.id } }
      });
      return { id: user.id, email: user.email, name: user.name, role: user.role };
    }
  } catch {
    // The demo fallback keeps the admin UI testable before MySQL is running.
  }

  if (email === demoEmail && password === demoPassword) {
    return { id: "demo-admin", email: demoEmail, name: "Administrador Demo", role: "SUPER_ADMIN" as const };
  }

  return null;
}
