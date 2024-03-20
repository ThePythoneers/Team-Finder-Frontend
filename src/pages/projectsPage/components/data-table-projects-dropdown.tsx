import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthUser, Project } from "@/types";
import { Code2Icon, MoreHorizontalIcon, Trash2 } from "lucide-react";
import { ViewProjectDialog } from "./viewProjectDialog";
import { TeamFinderDialog } from "./teamFinder";
import { EditProjectDialog } from "./editProjectDialog";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/api/project";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  project: Project;
};

export function ProjectsDropdown({ project }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();

  const queryClient = useQueryClient()

  const { mutateAsync } = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["userProjects"]})
  });

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
          {auth?.roles.includes("Project Manager") &&
            project.project_manager === auth.id && (
              <>
                <DropdownMenuSeparator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="flex gap-2 bg-destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2 /> Delete Project
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <Code2Icon />
                        Delete Project
                        <Badge variant="outline">{project.project_name}</Badge>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the project.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () =>
                          await mutateAsync({ token, id: project.project_id })
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
