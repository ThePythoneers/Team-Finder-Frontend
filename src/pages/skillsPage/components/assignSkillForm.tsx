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
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDownIcon, Loader2Icon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignSkillMe } from "@/api/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthUser, Project, Skill } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUserProjects } from "@/api/project";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const level = [
  { label: "1 - Learns", value: 1 },
  { label: "2 - Knows", value: 2 },
  { label: "3 - Does", value: 3 },
  { label: "4 - Helps", value: 4 },
  { label: "5 - Teaches", value: 5 },
] as const;

const experience = [
  { label: " 0 - 6 months", value: 1 },
  { label: " 6 - 12 months", value: 2 },
  { label: " 1 - 2 years", value: 3 },
  { label: " 2 - 4 years", value: 4 },
  { label: " 4 - 7 years", value: 5 },
  { label: " > 7 years", value: 6 },
] as const;

const FormSchema = z.object({
  level: z.number({
    required_error: "Please select a level.",
  }),
  experience: z.number({
    required_error: "Please select a level of experience.",
  }),
  training_title: z.string().optional(),
  training_description: z.string().optional(),
  project_link: z.string().optional(),
});

const defaultValues = {
  level: undefined,
  experience: undefined,
  training_title: "",
  training_description: "",
  project_link: undefined,
};

type Props = {
  skill: Skill;
};
export function AssignMeSkillForm({ skill }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["userProjects", { token }],
    queryFn: () => getUserProjects(token),
  });

  const [selectedProject, setSelectedProject] = useState<Project>();
  const { mutateAsync: assignSkillMutation, isPending } = useMutation({
    mutationFn: assignSkillMe,
  });

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    const user_id = auth?.id;
    values.project_link = selectedProject?.project_id;
    const data = await assignSkillMutation({
      token,
      user_id,
      skill_id: skill.id,
      level: values.level,
      experience: values.experience,
      training_title: values.training_title,
      training_description: values.training_description,
      project_link: values.project_link,
    });
    if (data) form.reset(defaultValues);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-2">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="lg:text-xl">Level</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`
                              w-[200px] justify-between
                              ${!field.value && "text-muted-foreground"}
                            `}
                        >
                          {field.value
                            ? level.find((level) => level.value === field.value)
                                ?.label
                            : "Select level"}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Command>
                        <CommandInput placeholder="Search level..." />
                        <CommandEmpty>No level found.</CommandEmpty>
                        <CommandGroup>
                          {level.map((level) => (
                            <CommandItem
                              value={level.label}
                              key={level.value}
                              onSelect={() => {
                                form.setValue("level", level.value);
                              }}
                            >
                              <Check
                                className={`f
                                    mr-2 h-4 w-4
                                    ${
                                      level.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                                  `}
                              />
                              {level.label}
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
              name="experience"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="lg:text-xl">Experience</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={`
                              w-[200px] justify-between
                              ${!field.value && "text-muted-foreground"}
                            `}
                        >
                          {field.value
                            ? experience.find(
                                (level) => level.value === field.value
                              )?.label
                            : "Select experience level"}
                          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Command>
                        <CommandInput placeholder="Search level..." />
                        <CommandEmpty>No level found.</CommandEmpty>
                        <CommandGroup>
                          {experience.map((level) => (
                            <CommandItem
                              value={level.label}
                              key={level.value}
                              onSelect={() => {
                                form.setValue("experience", level.value);
                              }}
                            >
                              <Check
                                className={`f
                                    mr-2 h-4 w-4
                                    ${
                                      level.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                                  `}
                              />
                              {level.label}
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
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="training_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl">Training Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title optional..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="training_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="lg:text-xl">
                    Training Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Training description optional..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      {data.map((project: Project, index: number) => {
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
          </div>

          <Button type="submit" className="lg:text-xl">
            {isPending && <Loader2Icon className="mr-2 size-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
