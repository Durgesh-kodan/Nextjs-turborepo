import type { Prisma, Role } from "@repo/db";
import { prisma } from "@repo/db";

export async function saveOrganizationToDatabase(
  data: Prisma.OrganizationCreateInput,
) {
  return prisma.organization.create({ data });
}

export async function retrieveOrganizationFromDatabase(id: string) {
  return prisma.organization.findUnique({ where: { id } });
}

export async function retrieveOrganizationBySlugFromDatabase(slug: string) {
  return prisma.organization.findUnique({ where: { slug } });
}

export async function retrieveOrganizationsByUserIdFromDatabase(
  userId: string,
) {
  return prisma.organization.findMany({
    where: {
      memberships: {
        some: { userId },
      },
    },
  });
}

export async function deleteOrganizationFromDatabase(id: string) {
  return prisma.organization.delete({ where: { id } });
}

export async function saveMembershipToDatabase(
  data: Prisma.OrganizationMembershipCreateInput,
) {
  return prisma.organizationMembership.create({ data });
}

export async function retrieveMembershipFromDatabase({
  userId,
  organizationId,
}: {
  userId: string;
  organizationId: string;
}) {
  return prisma.organizationMembership.findUnique({
    where: {
      userId_organizationId: { userId, organizationId },
    },
  });
}

export async function retrieveMembershipsByOrganizationIdFromDatabase(
  organizationId: string,
) {
  return prisma.organizationMembership.findMany({
    where: { organizationId },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
}

export async function updateMembershipRoleInDatabase(id: string, role: Role) {
  return prisma.organizationMembership.update({
    where: { id },
    data: { role },
  });
}

export async function deleteMembershipFromDatabase(id: string) {
  return prisma.organizationMembership.delete({
    where: { id },
  });
}
export async function retrieveActiveInviteByOrganizationIdFromDatabase(
  organizationId: string,
) {
  return prisma.invite.findFirst({
    where: {
      organizationId,
      expiresAt: {
        gt: new Date(),
      },
    },
  });
}
