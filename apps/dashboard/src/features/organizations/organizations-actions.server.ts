"use server";

import { redirect } from "next/navigation";
import slugify from "slugify";
import { organizationsServerSchema } from "./organizations-schema.server";

import {
  saveOrganizationToDatabase,
  saveMembershipToDatabase,
  updateMembershipRoleInDatabase,
  deleteMembershipFromDatabase,
} from "./organizations.model";

import { requireUserIsAuthenticated } from "../auth/auth-helpers.server";
import { requireUserIsOrgAdmin } from "./organizations-helpers.server";
import type { ActionResult } from "@repo/types";
import { revalidatePath } from "next/cache";

export async function organizationActions(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = organizationsServerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Invalid Iput" };
  }
  const { intent } = parsed.data;
  const { userId } = await requireUserIsAuthenticated();
  switch (intent) {
    case "create-organization": {
      const { name } = parsed.data;
      const slug = slugify(name, { lower: true, strict: true }).slice(0, 60);

      const org = await saveOrganizationToDatabase({
        name,
        slug,
      });
      await saveMembershipToDatabase({
        user: { connect: { id: userId } },
        organization: { connect: { id: org.id } },
        role: "ADMIN",
      });
      redirect(`/dashboard/organizations/${org.slug}`);
    }
    case "update-member-role": {
      const { membershipId, organizationId, role } = parsed.data;
      await requireUserIsOrgAdmin(organizationId, userId);
      await updateMembershipRoleInDatabase(membershipId, role);
      revalidatePath(`/dashboard/organizations/${organizationId}`);
      return {};
    }
    case "remove-member": {
      const { membershipId, organizationId } = parsed.data;
      await requireUserIsOrgAdmin(organizationId, userId);
      await deleteMembershipFromDatabase(membershipId);
      revalidatePath(`/dashboard/organizations/${organizationId}`);
      return {};
    }
    default: {
      return { error: "Invalid Intent" };
    }
  }
}
