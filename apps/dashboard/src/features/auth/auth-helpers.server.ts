import { auth } from "@repo/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<Boolean> {
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function requireUserIsAuthenticated() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }
  return { userId: session.user.id, user: session.user };
}
