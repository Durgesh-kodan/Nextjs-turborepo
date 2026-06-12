import type { Prisma } from "@repo/db";
import { prisma } from "@repo/db";

export async function saveUserToDatabase(data: Prisma.UserCreateInput) {
  return prisma.user.create({ data });
}

export async function retrieveUserFromDatabaseByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
