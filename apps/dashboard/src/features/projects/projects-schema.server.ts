import { z } from "zod";

export const projectsServerSchema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("create-project"),
    name: z.string().min(2).max(50),
    description: z.string().max(200).optional(),
    organizationId: z.string(),
  }),
  z.object({
    intent: z.literal("update-project"),
    id: z.string(),
    name: z.string().min(2).max(50),
    description: z.string().max(200).optional(),
  }),
  z.object({
    intent: z.literal("delete-project"),
    id: z.string(),
  }),
]);
