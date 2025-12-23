export * from '../generated/client';
import { PrismaClient } from '../generated/client';

let prisma: PrismaClient | undefined;

/**
 * Returns a singleton Prisma client instance. This prevents opening
 * too many connections in hot-reload environments.
 */
export const getPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

export type DatabaseClient = PrismaClient;
