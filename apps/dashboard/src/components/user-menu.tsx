"use client";

import { useActionState } from "react";
import { authAction } from "@/features/auth/auth-actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { SidebarMenuButton } from "@repo/ui/components/sidebar";
import { ChevronsUpDown, LogOut } from "lucide-react";
import type { ActionResult } from "@repo/types";

type Props = {
  userEmail: string | null | undefined;
};

export function UserMenu({ userEmail }: Props) {
  const [, formAction, isPending] = useActionState<ActionResult, FormData>(
    authAction,
    {},
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <span className="truncate">{userEmail}</span>
          <ChevronsUpDown className="ml-auto shrink-0" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem asChild>
          <form action={formAction}>
            <button
              type="submit"
              name="intent"
              value="sign-out"
              disabled={isPending}
              className="flex items-center gap-2 w-full"
            >
              <LogOut className="h-4 w-4" />
              {isPending ? "Signing out..." : "Log out"}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}