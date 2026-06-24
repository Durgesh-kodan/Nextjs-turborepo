"use client";

import { useActionState } from "react";
import { projectsAction } from "../projects-actions";
import { Button } from "@repo/ui/components/button";
import type { ActionResult } from "@repo/types";

type Props = {
  projectId: string;
  canDelete: boolean;
};

export function DeleteProjectButton({ projectId, canDelete }: Props) {
  const [, formAction, isPending] = useActionState<ActionResult, FormData>(
    projectsAction,
    {},
  );
  if (!canDelete) return null;
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={projectId} />
      <Button
        type="submit"
        name="intent"
        value="delete-project"
        variant="destructive"
        size="sm"
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
