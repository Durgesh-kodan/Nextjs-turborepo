import { ManageMemberDropdown } from "./manage-member-dropdown";

type Member = {
  id: string;
  role: "ADMIN" | "MEMBER" | "MODERATOR";
  user: {
    id: string;
    name: string | null;
    email: string;
  };
};

type Props = {
  members: Member[];
  organizationId: string;
  currentUserId: string;
  currentUserRole: "ADMIN" | "MEMBER" | "MODERATOR";
};

export function OrganizationMembersList({
  members,
  organizationId,
  currentUserId,
  currentUserRole,
}: Props) {
  return (
    <ul className="divide-y">
      {members.map((member) => (
        <li key={member.id} className="flex items-center justify-center py-3">
          <div>
            <p className="text-sm font-medium">
              {member.user.name ?? member.user.email}
            </p>
            <p className="text-xs text-muted-foreground">{member.user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{member.role}</span>
            {currentUserRole === "ADMIN" &&
              member.user.id !== currentUserId && (
                <ManageMemberDropdown
                  membershipId={member.id}
                  organizationId={organizationId}
                  currentRole={member.role}
                />
              )}
          </div>
        </li>
      ))}
    </ul>
  );
}
