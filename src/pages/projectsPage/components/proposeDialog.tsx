import { getDepartmentInfo } from "@/api/department";
import { createAllocationProposal } from "@/api/proposals";
import { getAnyUserSkills } from "@/api/skill";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { SkillCard } from "@/pages/profilePage/components/skillCard";
import { Employee, Project, userSkill } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Check,
  ChevronsUpDownIcon,
  HeartHandshakeIcon,
  Loader2Icon,
} from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  work_hours: z.number(),
  project_roles: z.array(z.string()),
  comment: z.string(),
});

const defaultValues = {
  work_hours: undefined,
  project_roles: undefined,
  comment: undefined,
};

type Props = {
  employee: Employee;
  project: Project;
};

const hours = [
  { label: "1 - Hour", value: 1 },
  { label: "2 - Hours", value: 2 },
  { label: "3 - Hours", value: 3 },
  { label: "4 - Hours", value: 4 },
  { label: "5 - Hours", value: 5 },
  { label: "6 - Hours", value: 6 },
  { label: "7 - Hours", value: 7 },
  { label: "8 - Hours", value: 8 },
] as const;

export function ProposeDialog({ employee, project }: Props) {
  console.log("🚀 ~ ProposeDialog ~ project:", project);
  const token = useAuthHeader();
  const _id = employee.id;

  const { data: userSkillsData, isLoading } = useQuery({
    queryKey: ["userSkills"],
    queryFn: () => getAnyUserSkills(token, _id),
  });
  const { data: departmentData, isLoading: departmentLoading } = useQuery({
    queryKey: ["userDepartment"],
    queryFn: () =>
      getDepartmentInfo({ token, department_id: employee.department_id }),
    enabled: !!employee.department_id,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutateAsync: createAllocationMutation, isPending } = useMutation({
    mutationFn: createAllocationProposal,
  });

  const [userTeamRoles, setUserTeamRoles] = useState<
    { id: string; role_name: string }[]
  >([]);
  const [userTeamRolesID, setUserTeamRolesID] = useState<string[]>([]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.project_roles = userTeamRolesID;
    if (employee.work_hours + values.work_hours > 8)
      return toast.error("The user can't have more than 8 work hours!");
    const body = {
      token,
      ...values,
      user_id: _id,
      project_id_allocation: project.id,
    };
    await createAllocationMutation(body);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => form.reset(defaultValues)}>
            <HeartHandshakeIcon />
            Propose
          </Button>
        </DialogTrigger>
        <DialogContent className="grid xl:grid-cols-2 lg:max-w-[60%]">
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div>
                  <DialogTitle className="text-2xl">
                    {employee.username}
                  </DialogTitle>
                  <DialogDescription>{employee.email}</DialogDescription>
                </div>
              </div>
              <Badge variant="outline">Work Hours: {employee.work_hours}</Badge>
            </div>
            {departmentLoading ? (
              <Skeleton className="size-[100px]" />
            ) : (
              <Badge variant="secondary">
                {departmentData
                  ? departmentData.department_name
                  : "No Department"}
              </Badge>
            )}

            <ul className="flex flex-col gap-2 overflow-auto max-h-[500px]">
              {isLoading && <Skeleton className="size-[100px]" />}
              {userSkillsData &&
                userSkillsData.map &&
                userSkillsData.map((skill: userSkill) => (
                  <SkillCard key={skill.skill_id} skill={skill} />
                ))}
            </ul>
          </section>
          <section>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="work_hours"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="lg:text-xl">Work Hours</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={` justify-between
                              ${!field.value && "text-muted-foreground"}
                            `}
                            >
                              {field.value
                                ? hours.find(
                                    (hours) => hours.value === field.value
                                  )?.label
                                : "Select the number of work hours"}
                              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Command>
                            <CommandInput placeholder="Search hours..." />
                            <CommandEmpty>No hours found.</CommandEmpty>
                            <CommandGroup>
                              {hours.map((hour) => (
                                <CommandItem
                                  value={hour.label}
                                  key={hour.value}
                                  onSelect={() => {
                                    form.setValue("work_hours", hour.value);
                                  }}
                                >
                                  <Check
                                    className={`f
                                    mr-2 h-4 w-4
                                    ${
                                      hour.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                                  `}
                                  />
                                  {hour.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
                        {userTeamRoles.length > 0 && (
                          <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                            {userTeamRoles.map((role, index) => (
                              <Badge key={index} variant="secondary">
                                {role.role_name}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </section>
                      <div>
                        <Popover modal>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={`
                                    w-[50%] justify-between
                                    ${
                                      userTeamRolesID.length < 1 &&
                                      "text-muted-foreground"
                                    }
                                    `}
                              >
                                {userTeamRolesID.length > 0
                                  ? `${userTeamRolesID.length} Selected`
                                  : "Select a team role"}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search a team role" />
                              <CommandList>
                                <CommandEmpty>No team role found.</CommandEmpty>
                                <CommandGroup>
                                  {project.project_roles.map((role, index) => {
                                    const isSelected =
                                      userTeamRoles.includes(role);
                                    return (
                                      <CommandItem
                                        key={index}
                                        value={role.role_name}
                                        onSelect={() => {
                                          if (isSelected) {
                                            setUserTeamRoles((current) =>
                                              current.filter(
                                                (teamRole) => role !== teamRole
                                              )
                                            );
                                            setUserTeamRolesID((current) =>
                                              current.filter(
                                                (teamRole) =>
                                                  role.id !== teamRole
                                              )
                                            );
                                          } else {
                                            setUserTeamRoles((current) => [
                                              ...current,
                                              role,
                                            ]);
                                            setUserTeamRolesID((current) => [
                                              ...current,
                                              role.id,
                                            ]);
                                          }
                                          form.setValue(
                                            "project_roles",
                                            userTeamRolesID
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
                                        {role.role_name}
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
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
                  name="comment"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel className="lg:text-lg">Comments</FormLabel>
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
                <div className="flex justify-between">
                  <DialogClose asChild>
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button>
                    {isPending && (
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
