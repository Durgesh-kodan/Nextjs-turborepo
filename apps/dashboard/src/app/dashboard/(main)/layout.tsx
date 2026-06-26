import { redirect } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { requireUserIsAuthenticated } from "@/features/auth/auth-helpers.server";
import { retrieveOrganizationsByUserIdFromDatabase } from "@/features/organizations/organizations.model";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, user } = await requireUserIsAuthenticated();
  const organizations = await retrieveOrganizationsByUserIdFromDatabase(userId);

  if (organizations.length === 0) {
    redirect("/dashboard/organizations/new");
  }

  return (
    <SidebarProvider>
      <AppSidebar
        organizations={organizations}
        userEmail={user.email}
      />
      <main className="flex flex-col flex-1 min-h-svh">
        <div className="flex items-center gap-2 p-2 border-b">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
