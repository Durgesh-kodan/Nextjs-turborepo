"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { authServerSchema } from "./auth-schema.server";
import { ActionResult } from "@repo/types";
import {
  retrieveUserFromDatabaseByEmail,
  saveUserToDatabase,
} from "./auth-model";
import { hashPassword, verifyPassword } from "./auth-helpers.server";

export async function authAction(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = authServerSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Invalid Input" };
  }
  const { intent } = parsed.data;

  switch (intent) {
    case "sign-in": {
      const { email, password } = parsed.data;
      const normalizedEmail = email.toLowerCase();
      const user = await retrieveUserFromDatabaseByEmail(normalizedEmail);
      if (!user) {
        return { error: "invalid email or password" };
      }
      const valid = await verifyPassword(password, user.password);
      if (!valid) {
        return { error: "invalid email or password" };
      }
      await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
      });
      redirect("/dashboard");
    }
    case "sign-up": {
      const { email, password, confirmPassword } = parsed.data;
      if (password !== confirmPassword)
        return {
          error: "Password don't match",
        };
      const normalizedEmail = email.toLowerCase();
      const existingUser =
        await retrieveUserFromDatabaseByEmail(normalizedEmail);
      if (existingUser)
        return {
          error: "User already exits",
        };
      const hashedPassword = await hashPassword(password);

      await saveUserToDatabase({
        email: normalizedEmail,
        password: hashedPassword,
      });
      await signIn("credentials", {
        email: normalizedEmail,
        password,
        redirect: false,
      });
      redirect("/dashboard");
    }
    case "sign-out": {
      await signOut({ redirect: false });
      redirect("/auth/sign-in");
    }
    default: {
      return { error: "Invalid Intent" };
    }
  }
}
