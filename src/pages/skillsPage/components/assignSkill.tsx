import { assignSkillMe, getUserInfo } from "@/api/auth";
import { getSkillCategory } from "@/api/skill";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
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
import { AuthUser, Skill } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  Check,
  ChevronsUpDownIcon,
  Loader2Icon,
  MilestoneIcon,
} from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
});
type Props = {
  skill: Skill;
};

export function AssignSkill({ skill }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const skill_categories = skill.skill_category;
  const user = skill.author;

  const { data: authorInfo, isLoading } = useQuery({
    queryKey: ["authorInfo", { user }],
    queryFn: () => getUserInfo({ token, user }),
  });

  const results = useQueries({
    queries: skill_categories.map((category_id) => ({
      queryKey: ["category", category_id],
      queryFn: () => getSkillCategory({ token, category_id }),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutateAsync: assignSkillMutation, isPending } = useMutation({
    mutationFn: assignSkillMe,
  });

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    const user_id = auth?.id;
    await assignSkillMutation({
      token,
      user_id,
      skill_id: skill.id,
      level: values.level,
      experience: values.experience,
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <MilestoneIcon className="size-5 mr-2" /> Assign Skill
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">{skill.skill_name}</DialogTitle>
            {isLoading ? (
              <Skeleton className="h-50px w-full" />
            ) : (
              <DialogDescription>Author: {authorInfo.email}</DialogDescription>
            )}
          </DialogHeader>

          <section>
            <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
              {results.data.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.category_name}
                </Badge>
              ))}
            </div>
            {skill.skill_description}
          </section>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Level</FormLabel>
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
                              ? level.find(
                                  (level) => level.value === field.value
                                )?.label
                              : "Select level"}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
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
                    <FormLabel>Experience</FormLabel>
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
                      <PopoverContent className="w-[200px] p-0">
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
              <Button type="submit">
                {isPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
