import { retrieveInviteByTokenFromDatabase } from "@/features/invites/invites.model";
import { AcceptInviteButton } from "@/features/invites/components/accept-invite-button";
import { requireUserIsAuthenticated } from "@/features/auth/auth-helpers.server";

type Props = {
  params: Promise<{ token: string }>;
};

export default async function InvitePage({ params }: Props) {
  const { token } = await params;
  const [invite] = await Promise.all([
    retrieveInviteByTokenFromDatabase(token),
    requireUserIsAuthenticated(),
  ]);
  if (!invite) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-semibold">Invalid Invite Link</h1>
        <p className="text-muted-foreground mt-2">
          This invite link is invalid or already used.
        </p>
      </div>
    );
  }
  if (invite.expiresAt < new Date()) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-semibold">Invite expired</h1>
        <p className="text-muted-foreground mt-2">
          This invite link has expired. Ask for a new one.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto py-12 px-4 text-center">
      <h1 className="text-2xl font-semibold">
        You have been invited to join {invite.organization.name}
      </h1>
      <p className="text-muted-foreground mt-2">
        Click below to accept the invitation
      </p>
      <AcceptInviteButton token={token} />
    </div>
  );
}
