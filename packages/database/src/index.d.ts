export * from './generated/client';
import { PrismaClient } from './generated/client';
export declare const getPrismaClient: () => PrismaClient<import("./generated/client").Prisma.PrismaClientOptions, never, import("@soniarose/database/src/generated/client/runtime/library").DefaultArgs>;
export type DatabaseClient = PrismaClient;
