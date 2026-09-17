import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

// ใช้ instance เดียวตลอด เพื่อไม่ให้ hot reload ตอน dev เปิด connection ใหม่เรื่อยๆ
// เก็บ class ไว้ด้วย: ถ้ารัน prisma generate ใหม่ (class เปลี่ยน) จะสร้าง client ใหม่ให้มี model ล่าสุด
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaClass?: typeof PrismaClient;
};

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
  return new PrismaClient({ adapter });
}

function getPrismaClient() {
  const cached = globalForPrisma.prisma;
  if (cached && globalForPrisma.prismaClass === PrismaClient) return cached;

  void cached?.$disconnect();
  const client = createPrismaClient();
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = client;
    globalForPrisma.prismaClass = PrismaClient;
  }
  return client;
}

export const prisma = getPrismaClient();
