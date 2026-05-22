import { prism } from "@/lib/prisma";
import { Prisma } from '@prisma/client'
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    async findByEmail(email: string) {
        const user = await prism.user.findUnique({
            where: {
                email,
            }
        });

        return user;
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prism.user.create({
            data,
        });

        return user;
    }
}