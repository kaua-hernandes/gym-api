import { GetUserMetricsUseCase } from "../get-user-metrics";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeFetchUserCheckInsHistoryUseCase() {
    const prismaCheckInsRepository = new PrismaCheckInsRepository();
    const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository);

    return useCase;
}