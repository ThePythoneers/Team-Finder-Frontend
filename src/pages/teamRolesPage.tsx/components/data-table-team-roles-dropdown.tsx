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
import { teamRole } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { EditTeamRoleDialog } from "./editTeamRoleDialog";

type Props = {
  teamRole: teamRole;
};

export function TeamRolesDropdown({ teamRole }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteMutation, isPending } = useMutation({
    mutationFn: deleteTeamRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teamRoles"] }),
  });
  const handleDelete = async () => {
    await deleteMutation({ token, _id: teamRole.id });
  };
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

          <EditTeamRoleDialog teamRole={teamRole} />
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="bg-destructive space-x-2"
            onClick={handleDelete}
          >
            {isPending && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            <Trash2Icon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
