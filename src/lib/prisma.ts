import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Returns null when `DATABASE_URL` is unset so the rest of the app (Mongo DefiKids) still boots.
 */
export function getPrisma(): PrismaClient | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }
  return globalForPrisma.prisma;
}
