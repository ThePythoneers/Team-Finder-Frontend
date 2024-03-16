import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthUser, Project } from "@/types";
import { MoreHorizontalIcon } from "lucide-react";
import { ViewProjectDialog } from "./viewProjectDialog";
import { TeamFinderDialog } from "./teamFinder";
import { EditProjectDialog } from "./editProjectDialog";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type Props = {
  project: Project;
};

export function ProjectsDropdown({ project }: Props) {
  const auth: AuthUser | null = useAuthUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ViewProjectDialog project={project} />
          {auth?.roles.includes("Project Manager") &&
            project.project_manager === auth.id && (
              <TeamFinderDialog project={project} />
            )}
          {auth?.roles.includes("Project Manager") &&
            project.project_manager === auth.id && (
              <EditProjectDialog project={project} />
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
