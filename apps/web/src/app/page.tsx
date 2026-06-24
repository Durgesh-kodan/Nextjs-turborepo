import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/card";
import { Building2, FolderKanban, ShieldCheck } from "lucide-react";

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;

const features = [
  {
    icon: Building2,
    title: "Organizations",
    description:
      "Create an organization and invite your team with a single link. Switch between orgs instantly.",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "Create and manage projects within your organization. Everyone on the team can contribute.",
  },
  {
    icon: ShieldCheck,
    title: "Roles",
    description:
      "Assign Admins, Moderators and Members. Control exactly who can do what inside your org.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-lg">MySaaS</span>
        <div className="flex items-center gap-4">
          <Link
            href={`${dashboardUrl}/auth/sign-in`}
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Button asChild size="sm">
            <Link href={`${dashboardUrl}/auth/sign-up`} target="_blank">
              Get started
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 flex-1">
        <h1 className="text-5xl font-bold tracking-tight max-w-2xl">
          Manage your team and projects in one place
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-xl">
          Create organizations, invite members, assign roles and ship projects
          together — all from a single dashboard.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Button asChild size="lg">
            <Link href={`${dashboardUrl}/auth/sign-up`} target="_blank">
              Get started free
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`${dashboardUrl}/auth/sign-in`} target="_blank">
              Sign in
            </Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything your team needs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <feature.icon className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Create your account in seconds. No credit card required.
        </p>
        <Button asChild size="lg">
          <Link href={`${dashboardUrl}/auth/sign-up`} target="_blank">
            Create your account
          </Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center text-sm text-muted-foreground">
        <p>Built with Next.js, Prisma, Auth.js and Turborepo.</p>
      </footer>
    </div>
  );
}