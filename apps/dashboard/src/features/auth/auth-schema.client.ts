import { email, z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("Email is Required")
    .email("Invalid Email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "password must be 6 characters long"),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .nonempty("Email is Required")
      .email("Invalid Email address"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "password must be 6 characters long"),
    confirmPassword: z
      .string()
      .nonempty("Confirm password is required")
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
