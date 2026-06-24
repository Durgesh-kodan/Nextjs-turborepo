import { requireUserIsAuthenticated } from "@/features/auth/auth-helpers.server";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUserIsAuthenticated();
  return children;
}
