import {
  ChevronsUpDown,
  Check,
  CalendarIcon,
  Loader2Icon,
  PencilIcon,
  Code2Icon,
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
} from "../../../components/ui/command";
import { Calendar } from "../../../components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../../../components/ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Project } from "@/types";
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
  description: z.string(),
});

type Props = {
  project: Project;
};

export function EditProjectDialog({ project }: Props) {
  console.log("🚀 ~ EditProjectDialog ~ project:", project);
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const defaultValues = {
    project_name: project.project_name,
    project_period: project.project_period,
    start_date: new Date(project.start_date),
    deadline_date: project.deadline_date
      ? new Date(project.deadline_date)
      : undefined,
    project_status: project.project_status,
    description: project.description,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const [isFixed, setIsFixed] = useState(!!project.deadline_date);

  const handleReset = () => {
    form.reset(defaultValues);
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
            <DialogTitle className="lg:text-3xl flex items-center gap-2">
              <Code2Icon />
              {project.project_name}
            </DialogTitle>
            <DialogDescription className="lg:text-lg">
              Edit project: {project.project_name}
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
                name="description"
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
