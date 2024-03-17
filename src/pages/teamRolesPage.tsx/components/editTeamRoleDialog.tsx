import { updateTeamRole } from "@/api/teamRoles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { teamRole } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AwardIcon, Loader2Icon, PencilIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  teamRole: teamRole;
};

export function EditTeamRoleDialog({ teamRole }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();
  const [roleName, setRoleName] = useState(teamRole.custom_role_name);

  const { mutateAsync: updateTeamRoleMutation, isPending } = useMutation({
    mutationFn: updateTeamRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teamRoles"] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTeamRoleMutation({
      token,
      role_id: teamRole.id,
      role_name: roleName,
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex gap-2"
          >
            <PencilIcon />
            Edit
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-1">
              <AwardIcon /> {teamRole.custom_role_name}
            </DialogTitle>
            <DialogDescription>
              Edit team role: {teamRole.custom_role_name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Label htmlFor="input" className="text-lg">
              Team Role
            </Label>
            <Input
              id="input"
              placeholder="Custom role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button>
                  {isPending && (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
