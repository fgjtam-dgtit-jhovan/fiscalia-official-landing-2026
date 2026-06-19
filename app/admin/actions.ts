"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authenticateAdmin, clearAdminSession, hashPassword, requireAdmin, setAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encryptSensitiveValue, sanitizeText } from "@/lib/security";

const text = (max = 240) => z.string().min(1).max(max).transform(sanitizeText);

export async function loginAction(formData: FormData) {
  const credentials = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(120)
  }).safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!credentials.success) redirect("/admin/login?error=invalid");

  const admin = await authenticateAdmin(credentials.data.email, credentials.data.password);
  if (!admin) redirect("/admin/login?error=auth");

  setAdminSession(admin);
  redirect("/admin");
}

export async function logoutAction() {
  clearAdminSession();
  redirect("/admin/login");
}

export async function createAdminUserAction(formData: FormData) {
  requireAdmin();
  const parsed = z.object({
    name: text(),
    email: z.string().email().max(160),
    password: z.string().min(8).max(120),
    role: z.enum(["SUPER_ADMIN", "EDITOR", "AUDITOR"])
  }).parse(Object.fromEntries(formData));

  await prisma.adminUser.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      passwordHash: hashPassword(parsed.password),
      role: parsed.role
    }
  });

  await audit("admin.user.created", { email: parsed.email, role: parsed.role });
  revalidatePath("/admin");
  redirect("/admin?created=user");
}

export async function createBulletinAction(formData: FormData) {
  requireAdmin();
  const parsed = z.object({
    publicCode: text(40),
    displayName: text(),
    age: z.coerce.number().int().min(0).max(120),
    lastSeenDate: z.coerce.date(),
    lastSeenLocation: text(),
    summary: text(900),
    imageUrl: z.string().max(500).optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
  }).parse(Object.fromEntries(formData));

  await prisma.missingPersonBulletin.create({
    data: {
      ...parsed,
      imageUrl: parsed.imageUrl || "/assets/person-placeholder-1.svg",
      encryptedNotes: encryptSensitiveValue("Registro administrativo ficticio"),
      isFictional: true
    }
  });

  await audit("admin.bulletin.created", { publicCode: parsed.publicCode });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?created=bulletin");
}

export async function createRewardAction(formData: FormData) {
  requireAdmin();
  const parsed = z.object({
    title: text(),
    rewardText: text(),
    phone: text(60),
    imageUrl: z.string().max(500).optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
  }).parse(Object.fromEntries(formData));

  await prisma.rewardBulletin.create({ data: { ...parsed, imageUrl: parsed.imageUrl || "/assets/campaign-fraud.svg", isFictional: true } });
  await audit("admin.reward.created", { title: parsed.title });
  revalidatePath("/admin");
  redirect("/admin?created=reward");
}

export async function createPressAction(formData: FormData) {
  requireAdmin();
  const parsed = z.object({
    title: text(),
    publishedAt: z.coerce.date(),
    excerpt: text(900),
    imageUrl: z.string().url().max(500),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
  }).parse(Object.fromEntries(formData));

  await prisma.pressRelease.create({ data: parsed });
  await audit("admin.press.created", { title: parsed.title });
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?created=press");
}

export async function createWantedAction(formData: FormData) {
  requireAdmin();
  const parsed = z.object({
    displayName: text(),
    alias: z.string().max(160).optional(),
    rewardText: text(),
    caseCode: text(40),
    imageUrl: z.string().max(500).optional(),
    statusLabel: text(80),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
  }).parse(Object.fromEntries(formData));

  await prisma.wantedPerson.create({ data: { ...parsed, imageUrl: parsed.imageUrl || "/assets/wanted-placeholder-1.svg", isFictional: true } });
  await audit("admin.wanted.created", { caseCode: parsed.caseCode });
  revalidatePath("/admin");
  redirect("/admin?created=wanted");
}

async function audit(action: string, metadata: Record<string, string>) {
  const session = requireAdmin();
  await prisma.auditLog.create({
    data: {
      action,
      ipHash: "server-action",
      metadata: { ...metadata, adminId: session.id }
    }
  });
}
