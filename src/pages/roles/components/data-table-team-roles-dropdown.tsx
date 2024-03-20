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
import { AuthUser, Project, teamRole } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  ChevronsUpDownIcon,
  Loader2Icon,
  MilestoneIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { EditTeamRoleDialog } from "./editTeamRoleDialog";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
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
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { addRoleToProject, getUserProjects } from "@/api/project";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  teamRole: teamRole;
};

export function TeamRolesDropdown({ teamRole }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMutation, isPending } = useMutation({
    mutationFn: deleteTeamRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["teamRoles"] }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["userProjects", { token }],
    queryFn: () => getUserProjects(token),
  });

  const [selectedProject, setSelectedProject] = useState<Project>();

  const { mutateAsync: addRoleMutation, isPending: addRolePending } =
    useMutation({
      mutationFn: addRoleToProject,
    });

  const handleAddRole = async () => {
    const data = await addRoleMutation({
      token,
      role_id: teamRole.id,
      project_id: selectedProject?.project_id,
    });
    if (data) setSelectedProject(undefined);
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
          {auth?.roles.includes("Project Manager") && (
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <MilestoneIcon className="mr-1" />
                  Assign to project
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Team Role</DialogTitle>
                  <DialogDescription>
                    Add the {teamRole.custom_role_name} to one of your existing
                    projects.
                  </DialogDescription>
                  <div>
                    <Badge variant="secondary">
                      {teamRole.custom_role_name}
                    </Badge>
                  </div>
                </DialogHeader>
                <section>
                  {selectedProject && (
                    <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                      <Badge variant="secondary">
                        {selectedProject.project_name}
                      </Badge>
                    </div>
                  )}
                  {isLoading ? (
                    <Skeleton className="size-[100px]" />
                  ) : (
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-[200px] justify-between"
                        >
                          {selectedProject ? "Selected" : "Select a project..."}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search project..." />
                          <CommandEmpty>No project found.</CommandEmpty>
                          <CommandGroup>
                            {data
                              .filter(
                                (project: Project) =>
                                  project.project_manager === auth?.id
                              )
                              .map((project: Project, index: number) => {
                                const isSelected = selectedProject === project;
                                return (
                                  <CommandItem
                                    key={index}
                                    value={project.project_id}
                                    onSelect={() => {
                                      if (isSelected) {
                                        setSelectedProject(undefined);
                                      } else {
                                        setSelectedProject(project);
                                      }
                                    }}
                                  >
                                    <Check
                                      className={`
                                      mr-2 h-4 w-4
                                      ${
                                        isSelected ? "opacity-100" : "opacity-0"
                                      }
                                    `}
                                    />
                                    {project.project_name}
                                  </CommandItem>
                                );
                              })}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                </section>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddRole}>
                    {addRolePending && (
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {auth?.roles.includes("Organization Admin") && (
            <>
              <EditTeamRoleDialog teamRole={teamRole} />
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="bg-destructive space-x-2"
                onClick={async () =>
                  await deleteMutation({ token, _id: teamRole.id })
                }
              >
                {isPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                <Trash2Icon />
                <span>Delete</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
