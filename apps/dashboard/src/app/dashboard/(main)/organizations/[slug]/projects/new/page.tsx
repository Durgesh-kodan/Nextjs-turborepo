import { requireOrganizationMembership } from "@/features/organizations/organizations-helpers.server";
import { CreateProjectForm } from "@/features/projects/components/create-project-form";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewProjectPage({ params }: Props) {
  const { slug } = await params;
  const { organization } = await requireOrganizationMembership(slug);
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">Create a Project</h1>
      <CreateProjectForm organizationId={organization.id} />
    </div>
  );
}
