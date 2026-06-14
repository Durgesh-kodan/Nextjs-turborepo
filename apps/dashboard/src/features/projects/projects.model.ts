import type { Prisma, Role } from "@repo/db";
import { prisma } from "@repo/db";

export async function saveProjectToDatabase(data: Prisma.ProjectCreateInput) {
  return prisma.project.create({ data });
}

export async function retrieveProjectFromDatabase(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function retrieveProjectsByOrganizationIdFromDatabase(
  organizationId: string,
) {
  return prisma.project.findMany({
    where: {
      organizationId,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteProjectFromDatabase(id: string) {
  return prisma.project.delete({ where: { id } });
}

export async function updateProjectInDatabase(
  id: string,
  data: Prisma.ProjectUpdateInput,
) {
  return prisma.organizationMembership.update({
    where: { id },
    data,
  });
}
