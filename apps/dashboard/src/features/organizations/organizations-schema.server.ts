import { z } from "zod";

export const organizationsServerSchema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("create-organization"),
    name: z.string().min(2).max(50),
  }),
  z.object({
    intent: z.literal("update-member-role"),
    membershipId: z.string(),
    organizationId: z.string(),
    role: z.enum(["ADMIN", "MEMBER", "MODERATOR"]),
  }),
  z.object({
    intent: z.literal("remove-member"),
    membershipId: z.string(),
    organizationId: z.string(),
  }),
]);
