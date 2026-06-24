import { requireOrganizationMembership } from "@/features/organizations/organizations-helpers.server";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OrgannizationPage({ params }: Props) {
  const { slug } = await params;
  const { organization, currentMembership } =
    await requireOrganizationMembership(slug);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold">{organization.name}</h1>
      <p className="text-muted-foreground text-sm mt-1">/{organization.slug}</p>
      <p className="text-muted-foreground text-sm mt-1">
        Your Role: {currentMembership.role}
      </p>
    </div>
  );
}
