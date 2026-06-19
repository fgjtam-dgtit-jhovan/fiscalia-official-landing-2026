import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";
import { encryptSensitiveValue } from "../lib/security";

const prisma = new PrismaClient();

async function main() {
  await prisma.adminUser.upsert({
    where: { email: "admin@fgj.example" },
    update: {},
    create: {
      name: "Administrador Demo",
      email: "admin@fgj.example",
      passwordHash: hashPassword("Admin2026!"),
      role: "SUPER_ADMIN"
    }
  });

  await prisma.missingPersonBulletin.createMany({
    skipDuplicates: true,
    data: Array.from({ length: 6 }).map((_, index) => ({
      publicCode: `FICT-${String(index + 1).padStart(3, "0")}`,
      displayName: `Persona Desaparecida #${String(index + 1).padStart(3, "0")}`,
      age: 20 + index * 4,
      lastSeenDate: new Date(`2024-0${(index % 5) + 1}-15T12:00:00.000Z`),
      lastSeenLocation: `Zona de referencia ${index + 1}`,
      summary: "Registro ficticio utilizado unicamente para pruebas de interfaz.",
      imageUrl: `/assets/person-placeholder-${(index % 3) + 1}.svg`,
      status: "PUBLISHED",
      encryptedNotes: encryptSensitiveValue(`Nota interna ficticia ${index + 1}`),
      isFictional: true
    }))
  });

  await prisma.pressRelease.createMany({
    skipDuplicates: true,
    data: Array.from({ length: 6 }).map((_, index) => ({
      title: `Comunicado de Prensa #${String(index + 1).padStart(3, "0")}`,
      publishedAt: new Date("2024-06-09T12:00:00.000Z"),
      excerpt: "Texto demostrativo para la sala de prensa institucional. No contiene datos operativos reales.",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      status: "PUBLISHED"
    }))
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
