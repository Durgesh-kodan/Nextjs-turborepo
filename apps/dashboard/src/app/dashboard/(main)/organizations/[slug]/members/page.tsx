import {
  buildInviteUrl,
  requireOrganizationMembership,
} from "@/features/organizations/organizations-helpers.server";
import { OrganizationMembersList } from "@/features/organizations/components/organization-members-list";
import { InviteLinkSection } from "@/features/invites/components/invite-link-section";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function OrganizationMembersPage({ params }: Props) {
  const { slug } = await params;
  const { organization, currentMembership, members, userId, activeInvite } =
    await requireOrganizationMembership(slug);

  const inviteUrl = activeInvite ? buildInviteUrl(activeInvite.token) : null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6">
        {organization.name} - Members
      </h1>
      {currentMembership.role === "ADMIN" && (
        <InviteLinkSection
          organizationId={organization.id}
          inviteUrl={inviteUrl}
        />
      )}
      <OrganizationMembersList
        members={members}
        organizationId={organization.id}
        currentUserId={userId}
        currentUserRole={currentMembership.role}
      />
    </div>
  );
}
