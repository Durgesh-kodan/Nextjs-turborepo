import type { Prisma, Role } from "@repo/db";
import { prisma } from "@repo/db";

export async function saveInviteToDatabase(data: Prisma.InviteCreateInput) {
  return prisma.invite.create({
    data,
  });
}

export async function retrieveInviteByTokenFromDatabase(token: string) {
  return prisma.invite.findUnique({
    where: { token },
    include: { organization: true },
  });
}

export async function deleteInviteFromDatabase(id: string) {
  return prisma.invite.delete({ where: { id } });
}

export async function deleteInvitesByOrganizationIdFromDatabase(
  organizationId: string,
) {
  return prisma.invite.deleteMany({
    where: { organizationId },
  });
}
