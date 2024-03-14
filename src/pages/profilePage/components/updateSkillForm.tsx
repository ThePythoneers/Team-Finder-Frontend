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
import {
  Check,
  ChevronsUpDownIcon,
  Loader2Icon,
  SaveIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignSkillMe } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthUser, userSkill } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { removeUserSkill } from "@/api/skill";

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
  skill: userSkill;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
export function UpdateMeSkillForm({ skill, isEdit, setIsEdit }: Props) {
  const queryClient = useQueryClient();
  const defaultValues = {
    level: skill.skill_level,
    experience: skill.skill_experience,
  };
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const { mutateAsync: removeSkillMutation } = useMutation({
    mutationFn: removeUserSkill,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["authUserSkills"] }),
  });

  const { mutateAsync: assignSkillMutation, isPending } = useMutation({
    mutationFn: assignSkillMe,
  });

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    const user_id = auth?.id;
    await assignSkillMutation({
      token,
      user_id,
      skill_id: skill.skill_id,
      level: values.level,
      experience: values.experience,
    });
    setIsEdit(false);
  };
  if (!auth) return;
  const handleRemoveSkill = async () => {
    await removeSkillMutation({
      token,
      user_id: auth.id,
      skill_id: skill.skill_id,
    });
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 relative"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="lg:text-xl">
                    <span>Level </span>
                    {level[field.value - 1].label}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={!isEdit}
                          variant="outline"
                          role="combobox"
                          className={`
                                w-full justify-between
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
                  <FormLabel className="lg:text-xl">
                    <span>Experience</span>
                    {experience[field.value - 1].label}
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={!isEdit}
                          variant="outline"
                          role="combobox"
                          className={`
                                w-full justify-between
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

          {isEdit && (
            <div className="flex justify-between w-full">
              <Button
                size="sm"
                type="button"
                variant="destructive"
                className="h-8 space-x-1"
                onClick={handleRemoveSkill}
              >
                <Trash2Icon /> <span>Delete</span>
              </Button>
              <div className="flex gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8"
                  onClick={() => {
                    form.reset(defaultValues);
                    setIsEdit(false);
                  }}
                >
                  <XIcon /> <span>Cancel</span>
                </Button>
                <Button type="submit" size="sm" className="h-8 space-x-1">
                  {isPending && (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  )}
                  <SaveIcon /> <span>Save</span>
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}
