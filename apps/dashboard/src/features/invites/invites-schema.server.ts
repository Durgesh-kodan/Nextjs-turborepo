import { z } from "zod";

export const invitesServerSchema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("generate-invite"),
    organizationId: z.string(),
  }),
  z.object({
    intent: z.literal("accept-invite"),
    token: z.string(),
  }),
]);
