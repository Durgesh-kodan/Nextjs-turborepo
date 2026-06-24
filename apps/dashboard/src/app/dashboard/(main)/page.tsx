import { redirect } from "next/navigation";
import Link from "next/link";

import { requireUserIsAuthenticated } from "@/features/auth/auth-helpers.server";
import { retrieveOrganizationsByUserIdFromDatabase } from "@/features/organizations/organizations.model";

export default async function DashboardPage() {
  const { userId } = await requireUserIsAuthenticated();
  const organizations = await retrieveOrganizationsByUserIdFromDatabase(userId);

  if (organizations.length === 1) {
    redirect(`/dashboard/organizations/${organizations[0].slug}`);
  }
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-xl text-center font-semibold mb-6">
        Your organizations
      </h1>
      {organizations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            You are not part of this organization
          </p>
          <Link
            href="/dashboard/organizations/new"
            className="text-primary underline underline-offset-4"
          >
            {" "}
            Create your first organization
          </Link>
        </div>
      )}
      {organizations.length > 1 && (
        <ul className="divide-y border rounded-lg">
          {organizations.map((org) => (
            <li key={org.id}>
              <Link
                href={`/dashboard/organizations/${org.slug}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors"
              >
                <span className="font-medium">{org.name}</span>
                <span className="text-muted-foreground text-sm">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
