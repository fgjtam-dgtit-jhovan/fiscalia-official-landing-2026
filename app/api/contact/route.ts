import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashIp, rateLimit, sanitizeText } from "@/lib/security";

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  message: z.string().min(10).max(500)
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
  const limited = rateLimit(hashIp(ip));

  if (!limited.ok) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta mas tarde." }, { status: 429 });
  }

  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Solicitud invalida." }, { status: 400 });
  }

  const payload = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeText(parsed.data.email),
    message: sanitizeText(parsed.data.message)
  };

  await prisma.auditLog.create({
    data: {
      action: "contact.form.submitted",
      ipHash: hashIp(ip),
      userAgent: request.headers.get("user-agent"),
      metadata: { emailDomain: payload.email.split("@")[1], messageLength: payload.message.length }
    }
  });

  return NextResponse.json({ ok: true, remaining: limited.remaining });
}
