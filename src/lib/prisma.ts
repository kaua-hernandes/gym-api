import { env } from "@/env";
import { PrismaClient } from "@prisma/client";

export const prism = new PrismaClient({
    log: env.NODE_ENV === 'dev' ? ['query'] : [],
});