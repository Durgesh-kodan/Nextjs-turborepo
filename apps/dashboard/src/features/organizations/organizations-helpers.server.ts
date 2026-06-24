import { notFound } from "next/navigation";
import {
  retrieveActiveInviteByOrganizationIdFromDatabase,
  retrieveMembershipFromDatabase,
  retrieveMembershipsByOrganizationIdFromDatabase,
  retrieveOrganizationBySlugFromDatabase,
} from "@/features/organizations/organizations.model";
import { requireUserIsAuthenticated } from "../auth/auth-helpers.server";

export async function requireUserIsOrgMember(
  userId: string,
  organizationId: string,
) {
  const membership = await retrieveMembershipFromDatabase({
    organizationId,
    userId,
  });
  if (!membership) {
    throw new Error("You are not a member of this organization");
  }
  return { membership };
}

export async function requireUserIsOrgAdmin(
  userId: string,
  organizationId: string,
) {
  const { membership } = await requireUserIsOrgMember(organizationId, userId);
  if (membership.role !== "ADMIN") {
    throw new Error("You must be an admin to perform this action");
  }
  return { membership };
}

export async function requireOrganizationMembership(slug: string) {
  const { userId } = await requireUserIsAuthenticated();
  const organization = await retrieveOrganizationBySlugFromDatabase(slug);
  if (!organization) {
    return notFound();
  }
  const [members, currentMembership, activeInvite] = await Promise.all([
    retrieveMembershipsByOrganizationIdFromDatabase(organization.id),
    retrieveMembershipFromDatabase({ userId, organizationId: organization.id }),
    retrieveActiveInviteByOrganizationIdFromDatabase(organization.id),
  ]);
  if (!currentMembership) {
    return notFound();
  }
  return { organization, members, currentMembership, userId, activeInvite };
}

export function buildInviteUrl(token: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}/invite/${token}`;  
}
