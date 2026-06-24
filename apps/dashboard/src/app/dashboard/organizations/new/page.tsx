import { CreateOrganizationForm } from "@/features/organizations/components/create-organization-form";
import { requireUserIsAuthenticated } from "@/features/auth/auth-helpers.server";

export default async function NewOrganizationPage() {
  await requireUserIsAuthenticated();

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-xl text-center font-semibold mb-6">
        Create an organization
      </h1>
      <CreateOrganizationForm />
    </div>
  );
}
