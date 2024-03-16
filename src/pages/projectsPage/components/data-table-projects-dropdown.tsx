import { deleteTeamRole } from "@/api/teamRoles";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Project } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FolderGit2,
  Loader2Icon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { ViewProjectDialog } from "./viewProjectDialog";
import { TeamFinderDialog } from "./teamFinder";

type Props = {
  project: Project;
};

export function ProjectsDropdown({ project }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutation, isPending } = useMutation({
    mutationFn: deleteTeamRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teamRoles"] }),
  });
  // const handleDelete = async () => {
  //   await deleteMutation({ token, _id: teamRole.id });
  // };
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
          <TeamFinderDialog project={project} />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="bg-destructive space-x-2"
            onClick={() => {}}
          >
            {isPending && <Loader2Icon className="size-4 animate-spin" />}
            <Trash2Icon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
