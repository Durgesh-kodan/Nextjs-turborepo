import { retrieveProjectFromDatabase } from "./projects.model";
import { retrieveMembershipFromDatabase } from "@/features/organizations/organizations.model";

export async function requireUserCanDeleteProject({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  const project = await retrieveProjectFromDatabase(projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  const membership = await retrieveMembershipFromDatabase({
    userId,
    organizationId: project.organizationId,
  });
  if (!membership) {
    throw new Error("Project not found");
  }

  const isCreator = project.createdById === userId;
  const isAdminOrModerator =
    membership.role === "ADMIN" || membership.role === "MODERATOR";

  if (!isCreator && !isAdminOrModerator) {
    throw new Error(
      "Only admins, moderators or the project creator can delete projects",
    );
  }
  return {project , membership}
}
