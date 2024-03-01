import { PlusIcon, ChevronsUpDown, Check, CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
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
import axios from "axios";
import { Input } from "./ui/input";
import { ProjectPeriod, ProjectStatus } from "@/enums";
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
} from "./ui/command";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";

const newProjectSchema = z.object({
  project_name: z.string().min(4, {
    message: "Project name must be at least 4 characters.",
  }),
  project_period: z.nativeEnum(ProjectPeriod),
  start_date: z.date(),
  deadline_date: z.date().optional(),
  project_status: z.nativeEnum(ProjectStatus),
  general_description: z.string(),
  technologies: z.string(), // ! TODO: probably an enum nativeEnum enum made with ts
  team_roles: z.string(), // ! also probably an enum
});

export function NewProjectModal() {
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      project_name: "",
      project_period: undefined,
      start_date: undefined,
      deadline_date: undefined,
      project_status: undefined,
      general_description: undefined,
      technologies: undefined,
      team_roles: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof newProjectSchema>) => {
    // console.log(values);
    try {
      axios.post("", values);
      console.log("You registered with succes");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <PlusIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[95%] overflow-auto">
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>
              Create a new project and be ready to take the risks.
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
                    <FormLabel className="lg:text-lg mr-2">
                      Project period
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? Object.values(ProjectPeriod).find(
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
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {Object.values(ProjectPeriod).map((period) => (
                              <CommandItem
                                value={period}
                                onSelect={() =>
                                  form.setValue("project_period", period)
                                }
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg mr-2">
                      Start Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {}
              <FormField
                control={form.control}
                name="deadline_date"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg mr-2">
                      Deadline Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="project_status"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel className="lg:text-lg mr-2">
                      Project Status
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? Object.values(ProjectStatus).find(
                                  (status) => status === field.value
                                )
                              : "Select a status"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search a state..." />
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {Object.values(ProjectStatus).map((status) => (
                              <CommandItem
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
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
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
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="general_description"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <div className="flex">
                      <FormLabel className="lg:text-lg">
                        General description of the project
                      </FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Give us a general description of the project"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
              <Button
                variant={"destructive"}
                type="button"
                className="lg:text-lg"
                onClick={() =>
                  form.reset({
                    project_name: "",
                    project_period: undefined,
                    start_date: undefined,
                    deadline_date: undefined,
                    project_status: undefined,
                    general_description: undefined,
                    technologies: undefined,
                    team_roles: undefined,
                  })
                }
              >
                Reset
              </Button>
              <div className="mt-2 flex justify-end items-center gap-2">
                <DialogClose asChild>
                  <Button
                    variant={"outline"}
                    type="button"
                    className="lg:text-lg"
                    onClick={() =>
                      form.reset({
                        project_name: "",
                        project_period: undefined,
                        start_date: undefined,
                        deadline_date: undefined,
                        project_status: undefined,
                        general_description: undefined,
                        technologies: undefined,
                        team_roles: undefined,
                      })
                    }
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="lg:text-lg">Save</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
