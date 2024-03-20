import { createTeamRole } from "@/api/teamRoles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

export function CreateNewTeamRole() {
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const [newTeamRole, setNewTeamRole] = useState("");
  const { mutateAsync: createTeamRoleMutation, isPending } = useMutation({
    mutationFn: createTeamRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teamRoles"] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTeamRole.length < 4)
      return toast.error("The team role has to be at least 4 characters long");
    await createTeamRoleMutation({ token, role_name: newTeamRole });
    setNewTeamRole("");
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="h-8 space-x-2 mr-2">
            <PlusIcon /> <span>Create team role</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2 mb-2">
            <h4 className="font-medium leading-none">Team Role</h4>
            <p className="text-sm text-muted-foreground">
              Create a new team role for your organization.
            </p>
          </div>
          <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
            <Input
              type="text"
              placeholder="Frontend Developer"
              value={newTeamRole}
              onChange={(e) => setNewTeamRole(e.target.value)}
            />
            <Button type="submit">
              {isPending && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
