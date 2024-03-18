import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsUpDownIcon,
  Loader2Icon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { teamFinder } from "@/api/project";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { findResponseData } from "@/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

const formSchema = z.object({
  partially_available: z.boolean().default(false),
  close_to_finish: z.boolean().default(false),
  deadline: z.number().optional(),
  unavailable: z.boolean().default(true),
});

const weeks = [
  { label: "1 - Week", value: 1 },
  { label: "2 - Weeks", value: 2 },
  { label: "3 - Weeks", value: 3 },
  { label: "4 - Weeks", value: 4 },
  { label: "5 - Weeks", value: 5 },
  { label: "6 - Weeks", value: 6 },
] as const;

const defaultValues = {
  partially_available: false,
  close_to_finish: false,
  deadline: undefined,
  unavailable: true,
};

type Props = {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setResponseData: React.Dispatch<React.SetStateAction<findResponseData[]>>;
};

export function TeamFinderForm({ setIsSearch, setResponseData }: Props) {
  const token = useAuthHeader();
  const [isClose, setIsClose] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutateAsync: teamFinderMutation, isPending } = useMutation({
    mutationFn: teamFinder,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isClose && values.deadline === undefined)
      return toast.error("You have to select a deadline date.");
    const body = { token, ...values };
    const data = await teamFinderMutation(body);
    setResponseData(data);
    setIsSearch(true);
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-medium">Availability criteria</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="partially_available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Partially Available
                    </FormLabel>
                    <FormDescription>
                      People that are currently assigned to one or multiple
                      projects, but less than 8 hours in total.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="close_to_finish"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Employees from projects close to finish
                    </FormLabel>
                    <FormDescription>
                      People that are currently assigned to projects that have
                      the deadline in maximum N weeks.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onClick={() => setIsClose(!isClose)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {isClose && (
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="lg:text-xl">How close do you want the deadline to be ?</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={` justify-between w-fit
                           ${!field.value && "text-muted-foreground"}
                         `}
                          >
                            {field.value
                              ? weeks.find((week) => week.value === field.value)
                                  ?.label
                              : "Select the number of weeks"}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Command>
                          <CommandInput placeholder="Search week..." />
                          <CommandEmpty>No week found.</CommandEmpty>
                          <CommandGroup>
                            {weeks.map((week) => (
                              <CommandItem
                                value={week.label}
                                key={week.value}
                                onSelect={() => {
                                  form.setValue("deadline", week.value);
                                }}
                              >
                                <Check
                                  className={`f
                                 mr-2 h-4 w-4
                                 ${
                                   week.value === field.value
                                     ? "opacity-100"
                                     : "opacity-0"
                                 }
                               `}
                                />
                                {week.label}
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
            )}

            <FormField
              control={form.control}
              name="unavailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Unavailable Employees
                    </FormLabel>
                    <FormDescription>
                      People that are currently assigned to some project, with a
                      total of 8 hours.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2Icon className="mr-2 size-4 animate-spin" />
          ) : (
            <SearchIcon className="size-4 mr-2" />
          )}
          Find
        </Button>
      </form>
    </Form>
  );
}
