import { PlusIcon, ChevronsUpDown, Check, CalendarIcon } from "lucide-react";
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
// import { ProjectPeriod, ProjectStatus, Technologies } from "@/enums";
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

// export enum ProjectPeriod {
//   Fixed = "Fixed",
//   Ongoing = "Ongoing",
// }

// export enum ProjectStatus {
//   NotStarted = "Not Started",
//   Starting = "Starting",
// }

// export enum Technologies {
//   React = "React",
//   Angular = "Angular",
//   FastAPI = "FastAPI",
//   Django = "Django",
// }

const ProjectPeriod = ["Fixed", "Ongoing"] as const;
const ProjectStatus = ["Not Started", "Starting"] as const;
const technologies = ["React", "Angular", "FastAPI", "Django"] as const;

const newProjectSchema = z.object({
  project_name: z.string(),
  project_period: z.enum(["Fixed", "Ongoing"]),
  start_date: z.date(),
  deadline_date: z.date().optional(),
  project_status: z.enum(["Not Started", "Starting"]),
  general_description: z.string(),
  technologies: z.array(z.string()),
  // team_roles: z.array(z.string()),
});

const defaultValues = {
  project_name: "",
  project_period: undefined,
  start_date: new Date(),
  deadline_date: undefined,
  project_status: undefined,
  general_description: undefined,
  technologies: [],
  // team_roles: undefined,
};

export function NewProjectDialog() {
  const [isFixed, setIsFixed] = useState(false);
  const [technologiesStack, setTechnologiesStack] = useState<string[]>([
    "Django",
    "React",
    "Angular",
  ]);
  const form = useForm<z.infer<typeof newProjectSchema>>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (values: z.infer<typeof newProjectSchema>) => {
    console.log(values);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="h-8 space-x-2 mr-2"
            onClick={() => form.reset(defaultValues)}
          >
            <PlusIcon /> <span>Create project</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[95%] max-w-[600px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="lg:text-3xl">
              Create a new project
            </DialogTitle>
            <DialogDescription className="lg:text-lg">
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
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </section>
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
                              {technologiesStack.length > 0
                                ? `${technologiesStack.length} Selected`
                                : "Select a technology"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search a technology" />
                            <CommandList>
                              <CommandEmpty>No technology found.</CommandEmpty>
                              <CommandGroup>
                                {technologies.map((tech, index) => {
                                  const isSelected =
                                    technologiesStack.includes(tech);
                                  return (
                                    <CommandItem
                                      key={index}
                                      value={tech}
                                      onSelect={() => {
                                        if (isSelected) {
                                          setTechnologiesStack((current) =>
                                            current.filter(
                                              (technology) =>
                                                tech !== technology
                                            )
                                          );
                                        } else {
                                          setTechnologiesStack((current) => [
                                            ...current,
                                            tech,
                                          ]);
                                        }
                                        form.setValue(
                                          "technologies",
                                          technologiesStack
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
                                      {tech}
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

              <div className="mt-2 flex justify-end items-center gap-2">
                <DialogClose asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    type="button"
                    className="lg:text-lg h-8"
                    onClick={() => form.reset(defaultValues)}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="lg:text-lg h-8" size="sm" type="submit">
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
