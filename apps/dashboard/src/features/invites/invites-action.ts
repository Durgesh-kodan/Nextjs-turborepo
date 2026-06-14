"use server";

import { redirect } from "next/navigation";
import { invitesServerSchema } from "./invites-schema.server";

import {
  saveInviteToDatabase,
  retrieveInviteByTokenFromDatabase,
  deleteInvitesByOrganizationIdFromDatabase,
} from "./invites.model";

import {
  retrieveMembershipFromDatabase,
  saveMembershipToDatabase,
} from "../organizations/organizations.model";

import { requireUserIsAuthenticated } from "../auth/auth-helpers.server";
import { requireUserIsOrgAdmin } from "../organizations/organizations-helpers.server";
import type { ActionResult } from "@repo/types";

export async function invitesAction(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult<{ url?: string }>> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = invitesServerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Invalid input" };
  }

  const { intent } = parsed.data;
    const { userId } = await requireUserIsAuthenticated();
  switch (intent) {
    case "generate-invite": {
      const { organizationId } = parsed.data;
      await requireUserIsOrgAdmin(organizationId, userId);
      await deleteInvitesByOrganizationIdFromDatabase(organizationId);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const invite = await saveInviteToDatabase({
        expiresAt,
        organization: { connect: { id: organizationId } },
      });

      const url = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`;
      return { data: { url } };
    }
    case "accept-invite": {
      const { token } = parsed.data;
      const invite = await retrieveInviteByTokenFromDatabase(token);
      if (!invite) {
        return { error: "Invalid invite link" };
      }
      if (invite.expiresAt < new Date()) {
        return { error: "This invite link has expired" };
      }
      const existingMembership = await retrieveMembershipFromDatabase({
        userId,
        organizationId: invite.organizationId,
      });

      if (existingMembership) {
        redirect(`/dashboard/organizations/${invite.organization.slug}`);
      }
      await saveMembershipToDatabase({
        user: { connect: { id: userId } },
        organization: { connect: { id: invite.organizationId } },
        role: "MEMBER",
      });
      redirect(`/dashboard/organizations/${invite.organization.slug}`);
    }
  }
}
