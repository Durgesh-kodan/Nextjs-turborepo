"use client";

import { useActionState } from "react";
import { invitesAction } from "../invites-actions";
import { Button } from "@repo/ui/components/button";
import type { ActionResult } from "@repo/types";

type Props = {
  organizationId: string;
  inviteUrl: string | null;
};

export function InviteLinkSection({ organizationId, inviteUrl }: Props) {
  const [state, formAction, isPending] = useActionState<
    ActionResult<{ url?: string }>,
    FormData
  >(invitesAction, {});

  const currentUrl = state?.data?.url ?? inviteUrl;

  const handleCopy = () => {
    if (currentUrl) navigator.clipboard.writeText(currentUrl);
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h2 className="font-medium">Invite link</h2>

      {currentUrl ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground break-all bg-muted px-3 py-2 rounded">
            {currentUrl}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              Copy link
            </Button>
            <form action={formAction}>
              <input
                type="hidden"
                name="organizationId"
                value={organizationId}
              />
              <Button
                type="submit"
                name="intent"
                value="generate-invite"
                variant="outline"
                size="sm"
                disabled={isPending}
              >
                {isPending ? "Regenerating..." : "Regenerate"}
              </Button>
            </form>
          </div>
          <p className="text-xs text-muted-foreground">
            This link expires in 7 days. Regenerating will invalidate the
            current link.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            No active invite link. Generate one to invite members.
          </p>
          <form action={formAction}>
            <input type="hidden" name="organizationId" value={organizationId} />
            <Button
              type="submit"
              name="intent"
              value="generate-invite"
              size="sm"
              disabled={isPending}
            >
              {isPending ? "Generating..." : "Generate invite link"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}