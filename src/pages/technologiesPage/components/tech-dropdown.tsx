import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AuthUser, Project, Tech } from "@/types";
import {
  Check,
  ChevronsUpDownIcon,
  CpuIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { deleteTech } from "@/api/technologies";
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
import { Skeleton } from "@/components/ui/skeleton";
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
import { addTechToProject, getUserProjects } from "@/api/project";
import { useState } from "react";

type Props = {
  tech: Tech;
};

export function TechDropdown({ tech }: Props) {
  const auth: AuthUser | null = useAuthUser();
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTechMutation } = useMutation({
    mutationFn: deleteTech,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["technologies"] }),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["userProjects", { token }],
    queryFn: () => getUserProjects(token),
  });

  const [selectedProject, setSelectedProject] = useState<Project>();

  const { mutateAsync: addTechMutation, isPending: addTechPending } =
    useMutation({
      mutationFn: addTechToProject,
    });

  const handleAddRole = async () => {
    const data = await addTechMutation({
      token,
      tech_id: tech.id,
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
                  <CpuIcon className="mr-1" />
                  Assign to project
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add technology</DialogTitle>
                  <DialogDescription>
                    Add the {tech.technology_name} to one of your existing
                    projects.
                  </DialogDescription>
                  <div>
                    <Badge variant="secondary">{tech.technology_name}</Badge>
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
                          {selectedProject ? "Selected"
                            : "Select a project..."}
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
                    {addTechPending && (
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
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="bg-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2Icon className="size-5 mr-2" /> Delete Tech
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the skill from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () =>
                        await deleteTechMutation({ token, _id: tech.id })
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
