import {
  ChevronsUpDown,
  Check,
  CalendarIcon,
  Loader2Icon,
  PencilIcon,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import { Calendar } from "../../../components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../../../components/ui/textarea";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllTeamRoles } from "@/api/teamRoles";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Project, Tech, teamRole } from "@/types";
import { getAllTechnologies } from "@/api/technologies";
import { toast } from "sonner";
import { updateProject } from "@/api/project";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const ProjectPeriod = ["Fixed", "Ongoing"] as const;
const ProjectStatus = [
  "Not Started",
  "Starting",
  "In Progress",
  "Closing",
  "Closed",
] as const;

const formSchema = z.object({
  project_name: z
    .string()
    .min(4, { message: "The project name has to be at least 4 characters" }),
  project_period: z.enum(["Fixed", "Ongoing"]),
  start_date: z.date(),
  deadline_date: z.date().optional(),
  project_status: z.enum([
    "Not Started",
    "Starting",
    "In Progress",
    "Closing",
    "Closed",
  ]),
  general_description: z.string(),
  technologies: z.array(z.string()),
  project_roles: z.array(z.string()),
});

type Props = {
  project: Project;
};

export function EditProjectDialog({ project }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const [teamRoles, setTeamRoles] = useState<teamRole[]>(project.project_roles);
  const [teamRolesID, setTeamRolesID] = useState<string[]>(
    project.project_roles.map((role) => role.id)
  );
  const { data: allTeamRolesData, isLoading: teamRolesLoading } = useQuery({
    queryKey: ["allTeamRoles"],
    queryFn: () => getAllTeamRoles(token),
  });

  const [technologiesStack, setTechnologiesStack] = useState<Tech[]>(
    project.technology_stack
  );
  const [technologiesStackID, setTechnologiesStackID] = useState<string[]>(
    project.technology_stack.map((tech) => tech.id)
  );

  const defaultValues = {
    project_name: project.project_name,
    project_period: project.project_period,
    start_date: new Date(project.start_date),
    deadline_date: project.deadline_date
      ? new Date(project.deadline_date)
      : undefined,
    project_status: project.project_status,
    general_description: project.description,
    technologies: technologiesStackID,
    project_roles: teamRolesID,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isFixed, setIsFixed] = useState(!!project.deadline_date);

  const { data: techStackData, isLoading: techLoading } = useQuery({
    queryKey: ["technologies"],
    queryFn: () => getAllTechnologies(token),
  });

  const handleReset = () => {
    form.reset(defaultValues);
    setTeamRoles(project.project_roles);
    setTeamRolesID(project.project_roles.map((role) => role.id));
    setTechnologiesStack(project.technology_stack);
    setTechnologiesStackID(project.technology_stack.map((tech) => tech.id));
  };

  const { mutateAsync: updateProjectMutation, isPending } = useMutation({
    mutationFn: updateProject,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userProjects"] }),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isFixed && values.deadline_date === undefined)
      return toast.error(
        "If the project has a fixed date you have to specify a deadline date."
      );
    const params = {
      token,
      ...values,
      id: project.project_id,
    };
    await updateProjectMutation(params);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            className="h-8 space-x-2 mr-2"
            onClick={handleReset}
            onSelect={(e) => e.preventDefault()}
          >
            <PencilIcon /> <span>Edit Project</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="max-h-[95%] max-w-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="lg:text-3xl">
              {project.project_name}
            </DialogTitle>
            <DialogDescription className="lg:text-lg">
              Edit the project...
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="project_name"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg">Project Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Team Finder"
                        className="lg:text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project_period"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg">Project period</FormLabel>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`
                                  w-[50%] justify-between
                                  ${!field.value && "text-muted-foreground"}
                                `}
                            >
                              {field.value
                                ? ProjectPeriod.find(
                                    (period) => period === field.value
                                  )
                                : "Select a period"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search a state..." />
                            <CommandEmpty>No period found...</CommandEmpty>
                            <CommandGroup>
                              {ProjectPeriod.map((period, index) => (
                                <CommandItem
                                  key={index}
                                  value={period}
                                  onSelect={() => {
                                    form.setValue("project_period", period);
                                    if (period === "Fixed") setIsFixed(true);
                                    else setIsFixed(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      period === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {period}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg">Start Date</FormLabel>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`
                                  w-[50%] 
                                  ${!field.value && "text-muted-foreground"}
                                `}
                            >
                              {field.value !== undefined ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {isFixed && (
                <FormField
                  control={form.control}
                  name="deadline_date"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel className="lg:text-lg mr-2">
                        Deadline Date
                      </FormLabel>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={` w-[50%] 
                                  ${!field.value && "text-muted-foreground"}
                                `}
                              >
                                {field.value !== undefined ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date(form.getValues("start_date"))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="project_status"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg mr-2">
                      Project Status
                    </FormLabel>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={`
                                  w-[50%] justify-between
                                  ${!field.value && "text-muted-foreground"}
                                `}
                            >
                              {field.value
                                ? ProjectStatus.find(
                                    (status: string) => status === field.value
                                  )
                                : "Select a status"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search a state..." />
                            <CommandEmpty>No state found.</CommandEmpty>
                            <CommandGroup>
                              {ProjectStatus.map((status, index) => (
                                <CommandItem
                                  key={index}
                                  value={status}
                                  onSelect={() =>
                                    form.setValue("project_status", status)
                                  }
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      status === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {status}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg mr-2">
                      Project Technologies
                    </FormLabel>
                    <section>
                      {technologiesStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                          {technologiesStack.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech.technology_name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </section>
                    <div>
                      {techLoading ? (
                        <Skeleton className="size-[100px]" />
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`
                                  w-[50%] justify-between
                                  ${!field.value && "text-muted-foreground"}
                                `}
                              >
                                {technologiesStackID.length > 0
                                  ? `${technologiesStackID.length} Selected`
                                  : "Select a technology"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search a technology" />
                              <CommandList>
                                <CommandEmpty>
                                  No technology found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {techStackData.map(
                                    (tech: Tech, index: number) => {
                                      const isSelected =
                                        technologiesStack.includes(tech);
                                      return (
                                        <CommandItem
                                          key={index}
                                          value={tech.technology_name}
                                          onSelect={() => {
                                            if (isSelected) {
                                              setTechnologiesStackID(
                                                (current) =>
                                                  current.filter(
                                                    (technology) =>
                                                      tech.id !== technology
                                                  )
                                              );
                                              setTechnologiesStack((current) =>
                                                current.filter(
                                                  (technology) =>
                                                    tech !== technology
                                                )
                                              );
                                            } else {
                                              setTechnologiesStackID(
                                                (current) => [
                                                  ...current,
                                                  tech.id,
                                                ]
                                              );
                                              setTechnologiesStack(
                                                (current) => [...current, tech]
                                              );
                                            }
                                            form.setValue(
                                              "technologies",
                                              technologiesStackID
                                            );
                                          }}
                                        >
                                          <Checkbox
                                            checked={isSelected}
                                            className={`mr-2 ${
                                              isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50"
                                            }`}
                                          />
                                          {tech.technology_name}
                                        </CommandItem>
                                      );
                                    }
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="general_description"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg">
                      General description of the project
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Give us a general description of the project"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="project_roles"
                render={() => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg mr-2">
                      Team Roles
                    </FormLabel>
                    <section>
                      {teamRoles.length > 0 && (
                        <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                          {teamRoles.map((role, index) => (
                            <Badge key={index} variant="secondary">
                              {role.custom_role_name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </section>
                    <div>
                      {teamRolesLoading ? (
                        <Skeleton className="size-[100px]" />
                      ) : (
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`
                                  w-[50%] justify-between
                                  ${
                                    teamRolesID.length < 1 &&
                                    "text-muted-foreground"
                                  }
                                `}
                              >
                                {teamRolesID.length > 0
                                  ? `${teamRolesID.length} Selected`
                                  : "Select a team role"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search a team role" />
                              <CommandList>
                                <CommandEmpty>No team role found.</CommandEmpty>
                                <CommandGroup>
                                  {allTeamRolesData.map(
                                    (role: teamRole, index: number) => {
                                      const isSelected =
                                        teamRoles.includes(role);
                                      return (
                                        <CommandItem
                                          key={index}
                                          value={role.custom_role_name}
                                          onSelect={() => {
                                            if (isSelected) {
                                              setTeamRoles((current) =>
                                                current.filter(
                                                  (teamRole) =>
                                                    role !== teamRole
                                                )
                                              );
                                              setTeamRolesID((current) =>
                                                current.filter(
                                                  (teamRole) =>
                                                    role.id !== teamRole
                                                )
                                              );
                                            } else {
                                              setTeamRoles((current) => [
                                                ...current,
                                                role,
                                              ]);
                                              setTeamRolesID((current) => [
                                                ...current,
                                                role.id,
                                              ]);
                                            }
                                            form.setValue(
                                              "project_roles",
                                              teamRolesID
                                            );
                                          }}
                                        >
                                          <Checkbox
                                            checked={isSelected}
                                            className={`mr-2 ${
                                              isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50"
                                            }`}
                                          />
                                          {role.custom_role_name}
                                        </CommandItem>
                                      );
                                    }
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-2 flex justify-end items-center gap-2">
                <DialogClose asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    className="lg:text-lg h-8"
                    onClick={handleReset}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="lg:text-lg h-8" size="sm" type="submit">
                  {isPending && (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
