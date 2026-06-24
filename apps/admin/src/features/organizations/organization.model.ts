import type { Prisma, Role } from "@repo/db";
import { prisma } from "@repo/db";

export async function retrieveAllOrganizationsFromDatabase() {
  return prisma.organization.findMany({
    include: {
      _count: {
        select: {
          memberships: true,
          projects: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function retrieveOrganizationWithMembersAndProjectsFromDatabase(
  id: string,
) {
  return prisma.organization.findUnique({
    where: { id },
    include: {
      memberships: {
        include: {
          user: { select: { id: true, email: true, name: true } },
        },
      },
      projects: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
