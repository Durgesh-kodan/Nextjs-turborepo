import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .nonempty("Project name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "name cannot extend 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .nonempty("organization name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "name cannot extend 50 characters"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional(),
});

export type CreateProjectValues = z.infer<typeof createProjectSchema>;
export type updateProjectsValues = z.infer<typeof updateProjectSchema>;
