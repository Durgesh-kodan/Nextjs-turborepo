import { requireOrganizationMembership } from "@/features/organizations/organizations-helpers.server";
import { retrieveProjectsByOrganizationIdFromDatabase } from "@/features/projects/projects.model";
import { ProjectCard } from "@/features/projects/components/project-card";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectsPage({ params }: Props) {
  const { slug } = await params;
  const { organization, currentMembership } =
    await requireOrganizationMembership(slug);
  const projects = await retrieveProjectsByOrganizationIdFromDatabase(
    organization.id,
  );

  return (
    <div className=" max-w-2xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button asChild>
          <Link href={`/dashboard/organizations/${slug}/projects/new`}>
            New Projects
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No Projects Yet. Create your first one
        </p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              userRole={currentMembership.role}
              currentUserId={currentMembership.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
