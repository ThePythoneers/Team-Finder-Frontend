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
import { CalendarIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { teamFinder } from "@/api/project";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const formSchema = z.object({
  partially_available: z.boolean().default(false),
  close_to_finish: z.boolean().default(false),
  deadline: z.date().optional(),
  unavailable: z.boolean().default(true),
});

const defaultValues = {
  partially_available: false,
  close_to_finish: false,
  deadline: undefined,
  unavailable: true,
};

type Props = {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setResponseData: React.Dispatch<React.SetStateAction<object[]>>;
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
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg">Deadline Date</FormLabel>
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
                            disabled={(date) => {
                              const maxDate = new Date();
                              maxDate.setDate(maxDate.getDate() + 42);
                              return date < new Date() || date > maxDate;
                            }}
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
