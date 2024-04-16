import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

// in case of NextJs hot reload
// in production prisma will be initialized like this: const db = new PrismaClient()
// but in development we will use the global variable of db, initialized once at start and not every time by hot reload
// global is not affected by hot reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db