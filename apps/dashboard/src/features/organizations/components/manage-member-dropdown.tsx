"use client";

import { useActionState } from "react";
import { organizationsAction } from "../organizations-actions.server";
import { Button } from "@repo/ui/components/button";
import type { ActionResult } from "@repo/types";

type Props = {
  membershipId: string;
  organizationId: string;
  currentRole: "ADMIN" | "MEMBER" | "MODERATOR";
};

export function ManageMemberDropdown({
  membershipId,
  organizationId,
  currentRole,
}: Props) {
  const [, formAction, isPending] = useActionState<ActionResult, FormData>(
    organizationsAction,
    {},
  );

  return (
    <div className="flex gap-2">
      {currentRole !== "ADMIN" && (
        <form action={formAction}>
          <input type="hidden" name="membershipId" value={membershipId} />
          <input type="hidden" name="organizationId" value={organizationId} />
          <input type="hidden" name="role" value="ADMIN" />
          <Button
            type="submit"
            name="intent"
            value="update-member-role"
            variant="outline"
            size="sm"
            disabled={isPending}
          >
            Make admin
          </Button>
        </form>
      )}

      {currentRole !== "MODERATOR" && (
        <form action={formAction}>
          <input type="hidden" name="membershipId" value={membershipId} />
          <input type="hidden" name="organizationId" value={organizationId} />
          <input type="hidden" name="role" value="MODERATOR" />
          <Button
            type="submit"
            name="intent"
            value="update-member-role"
            variant="outline"
            size="sm"
            disabled={isPending}
          >
            Make moderator
          </Button>
        </form>
      )}

      <form action={formAction}>
        <input type="hidden" name="membershipId" value={membershipId} />
        <input type="hidden" name="organizationId" value={organizationId} />
        <Button
          type="submit"
          name="intent"
          value="remove-member"
          variant="destructive"
          size="sm"
          disabled={isPending}
        >
          Remove
        </Button>
      </form>
    </div>
  );
}