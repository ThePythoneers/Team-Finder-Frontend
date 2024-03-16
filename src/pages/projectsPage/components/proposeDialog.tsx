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
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDownIcon, HeartHandshakeIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  work_hours: z.number(),
  team_roles: z.array(z.string()),
  comments: z.string(),
});

const defaultValues = {
  work_hours: 0,
  team_roles: undefined,
  comments: "",
};

type Props = {
  employee: any;
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [userTeamRoles, setUserTeamRoles] = useState<
    { id: string; custom_role_name: string }[]
  >([]);
  const [userTeamRolesID, setUserTeamRolesID] = useState<string[]>([]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <HeartHandshakeIcon />
            Propose
          </Button>
        </DialogTrigger>
        <DialogContent className="grid xl:grid-cols-2 lg:max-w-[50%]">
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">
                  Crintea Sebastian
                </DialogTitle>
                <DialogDescription>seby.danyel@gmail.com</DialogDescription>
              </div>
            </div>
            <Badge variant="secondary">No Department</Badge>
            <ul className="flex flex-warp gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Django</Badge>
              <Badge variant="secondary">FastAPi</Badge>
              <Badge variant="secondary">Cypress</Badge>
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
                            <CommandInput placeholder="Search level..." />
                            <CommandEmpty>No level found.</CommandEmpty>
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
                  name="team_roles"
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
                                {role.custom_role_name}
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
                                  {project.project_roles.map(
                                    (
                                      role: {
                                        id: string;
                                        custom_role_name: string;
                                      },
                                      index: number
                                    ) => {
                                      const isSelected =
                                        userTeamRoles.includes(role);
                                      return (
                                        <CommandItem
                                          key={index}
                                          value={role.custom_role_name}
                                          onSelect={() => {
                                            if (isSelected) {
                                              setUserTeamRoles((current) =>
                                                current.filter(
                                                  (teamRole) =>
                                                    role !== teamRole
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
                                              "team_roles",
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
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comments"
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
                  <Button variant="outline">Cancel</Button>
                  <Button>
                    {true && (
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
