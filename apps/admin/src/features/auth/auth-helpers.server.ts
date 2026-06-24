import { auth } from "@repo/auth";
import { redirect } from "next/navigation";

export async function requireAdminIsAuthenticated() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/sign-in");
  }
  const adminEmail = process.env.ADMIN_EMAIL;
  if(session.user?.email!== adminEmail){
    redirect("/unauthorized")
  }
  return { userId: session.user.id, user: session.user };
}
