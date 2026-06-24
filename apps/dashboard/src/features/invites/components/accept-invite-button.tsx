"use clinet";

import { useActionState } from "react";
import { invitesAction } from "../invites-actions";
import { Button } from "@repo/ui/components/button";
import type { ActionResult } from "@repo/types";

type Props = {
  token: string;
};

export function AcceptInviteButton({ token }: Props) {
  const [state, formAction, isPending] = useActionState<ActionResult, FormData>(
    invitesAction,
    {},
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="token" value={token} />
      <Button
        type="submit"
        name="intent"
        value="accept-invite"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Joining..." : "Accept Invitation"}
      </Button>
      {state?.error && (
        <p className="text-sm text-destructive mt-2">{state.error}</p>
      )}
    </form>
  );
}
