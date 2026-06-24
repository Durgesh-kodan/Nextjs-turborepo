import { DeleteProjectButton } from "./delete-project-button";

type Project = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  createdById: string | null;
};

type Props = {
  project: Project;
  userRole: "ADMIN" | "MEMBER" | "MODERATOR";
  currentUserId: string;
};

export function ProjectCard({ project, userRole, currentUserId }: Props) {
  const canDelete =
    userRole === "ADMIN" ||
    userRole === "MODERATOR" ||
    project.createdById === currentUserId;

  return (
    <div className="border rounded-lg p-4 flex items-start justify-between">
      <div>
        <h3 className="font-medium">{project.name}</h3>
        {project.description && (
          <p className="text-sm text-muted-foreground mt-1">
            {project.description}
          </p>
        )}
      </div>
      <DeleteProjectButton projectId={project.id} canDelete={canDelete} />
    </div>
  );
}
