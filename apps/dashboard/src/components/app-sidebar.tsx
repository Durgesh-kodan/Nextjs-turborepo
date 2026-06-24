"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  sidebarMenuButtonVariants,
  SidebarMenuButton,
} from "@repo/ui/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import {
  FolderKanban,
  Users,
  Settings,
  ChevronsUpDown,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./user-menu";
import { usePathname } from "next/navigation";

type Organization = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  organizations: Organization[];
  userEmail: string | null | undefined;
};

const navLinks = [
  { label: "Projects", icon: FolderKanban, href: "projects" },
  { label: "Members", icon: Users, href: "members" },
  { label: "Settings", icon: Settings, href: "settings" },
];

function parseOrgSlugFromPathname(pathname: string): string | undefined {
  const match = /^\/dashboard\/organizations\/([^/]+)/.exec(pathname);
  if (!match) return undefined;
  const segment = match[1];
  if (segment === "new") return undefined;
  return segment;
}

export function AppSidebar({ organizations, userEmail }: Props) {
  const pathname = usePathname();
  const slugFromPath = parseOrgSlugFromPathname(pathname);
  const currentOrg =
    organizations.find((org) => org.slug === slugFromPath) ?? organizations[0];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <span className="font-semibold truncate">
                    {currentOrg.name}
                  </span>
                  <ChevronsUpDown className="ml-auto shrink-0" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                {organizations.map((org) => (
                  <DropdownMenuItem key={org.id} asChild>
                    <Link href={`/dashboard/organizations/${org.slug}`}>
                      {org.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/organizations/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add organization
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <Link
                    className={sidebarMenuButtonVariants({
                      variant: "default",
                      size: "default",
                    })}
                    href={`/dashboard/organizations/${currentOrg.slug}/${link.href}`}
                  >
                    <link.icon />
                    <span>{link.label}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
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
                <DropdownMenuItem>
                  <UserMenu userEmail={userEmail} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}