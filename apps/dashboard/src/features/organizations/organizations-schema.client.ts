import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .nonempty("organization name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "name cannot extend 50 characters"),
});

export type CreateOrganizationValues = z.infer<typeof createOrganizationSchema>;
