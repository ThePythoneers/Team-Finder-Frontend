import { getDepartments } from "@/api/department";
import { createSkill, getSkillCategories } from "@/api/skill";
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
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { AuthUser, Department, SkillCategory } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronsUpDownIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { toast } from "sonner";

export function CreateSkillDialog() {
  const auth: AuthUser | null = useAuthUser();
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(
    []
  );

  const [skillName, setSkillName] = useState("");
  const [description, setDescription] = useState("");

  const { data: skillCategoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["skillCategories", { token }],
    queryFn: () => getSkillCategories(token),
  });

  const { data: departmentsData, isLoading: departmentsLoading } = useQuery({
    queryKey: ["departments", { token }],
    queryFn: () => getDepartments(token),
  });

  const handleReset = () => {
    setSkillName("");
    setDescription("");
    setSkillCategories([]);
    setSelectedDepartments([]);
  };

  const { mutateAsync: createSkillMutation, isPending } = useMutation({
    mutationFn: createSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (skillName.length < 1)
      return toast.error(
        "The skill name has to be at least 4 characters long!"
      );
    if (skillCategories.length < 1)
      return toast.error("You have to select at least one skill category!");
    if (!description)
      return toast.error("You have to specify a description for this skill!");
    const params = {
      token,
      skill_category: skillCategories.map((category) => category.id),
      skill_name: skillName,
      description,
      author: auth?.id,
      departments: selectedDepartments.map((department) => department.id),
    };
    await createSkillMutation(params);
    handleReset();
  };

  return (
    <>
      {auth?.roles.includes("Department Manager") && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 space-x-2"
              onClick={handleReset}
            >
              <PlusIcon /> <span className="hidden lg:block">Create skill</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-3xl">Create a skill</DialogTitle>
              <DialogDescription className="text-lg">
                Create a new skill for your organization.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
              <section>
                {skillCategories.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                    {skillCategories.map((category) => (
                      <Badge key={category.id} variant="secondary">
                        {category.category_name}
                      </Badge>
                    ))}
                  </div>
                )}
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`justify-between w-full mx-auto ${
                        skillCategories.length < 1 && "text-muted-foreground"
                      }`}
                    >
                      {skillCategories.length > 0
                        ? `${skillCategories.length} Selected`
                        : "Select a category"}
                      <ChevronsUpDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search by name" />
                      <CommandList>
                        {categoriesLoading ? (
                          <Skeleton className="w-full h-[40px]" />
                        ) : (
                          <>
                            <CommandEmpty>
                              Skill category not found.
                            </CommandEmpty>
                            <CommandGroup>
                              {skillCategoriesData.map(
                                (category: SkillCategory) => {
                                  const isSelected =
                                    skillCategories.includes(category);

                                  return (
                                    <CommandItem
                                      key={category.id}
                                      onSelect={() => {
                                        if (isSelected) {
                                          setSkillCategories((current) =>
                                            current.filter(
                                              (categ) => categ !== category
                                            )
                                          );
                                        } else {
                                          setSkillCategories((current) => [
                                            ...current,
                                            category,
                                          ]);
                                        }
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
                                      {category.category_name}
                                    </CommandItem>
                                  );
                                }
                              )}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                      {skillCategories.length > 0 && (
                        <>
                          <CommandSeparator className="my-1" />
                          <Button
                            size="sm"
                            className="h-8"
                            variant="secondary"
                            onClick={() => setSkillCategories([])}
                          >
                            Reset
                          </Button>
                        </>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </section>
              <div className="space-y-2">
                <Label htmlFor="skillName" className="text-lg">
                  Skill Name
                </Label>
                <Input
                  id="skillName"
                  type="text"
                  placeholder="example"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="textarea" className="text-lg">
                  Skill Description
                </Label>
                <Textarea
                  id="textarea"
                  placeholder="example"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <section>
                {selectedDepartments.length > 0 && (
                  <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                    {selectedDepartments.map((department) => (
                      <Badge key={department.id} variant="secondary">
                        {department.department_name}
                      </Badge>
                    ))}
                  </div>
                )}
                <Popover modal>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`justify-between w-full mx-auto ${
                        selectedDepartments.length < 1 &&
                        "text-muted-foreground"
                      }`}
                    >
                      {selectedDepartments.length > 0
                        ? `${selectedDepartments.length} Selected`
                        : "Select your department"}
                      <ChevronsUpDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput placeholder="Search by name" />
                      <CommandList>
                        {departmentsLoading ? (
                          <Skeleton className="w-full h-[40px]" />
                        ) : (
                          <>
                            <CommandEmpty>Department not found.</CommandEmpty>
                            <CommandGroup>
                              {departmentsData
                                .filter(
                                  (department: Department) =>
                                    department.id === auth.department_id
                                )
                                .map((department: Department) => {
                                  const isSelected =
                                    selectedDepartments.includes(department);
                                  return (
                                    <CommandItem
                                      key={department.id}
                                      onSelect={() => {
                                        if (isSelected) {
                                          setSelectedDepartments((current) =>
                                            current.filter(
                                              (depart) => depart !== department
                                            )
                                          );
                                        } else {
                                          setSelectedDepartments((current) => [
                                            ...current,
                                            department,
                                          ]);
                                        }
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
                                      {department.department_name}
                                    </CommandItem>
                                  );
                                })}
                            </CommandGroup>
                          </>
                        )}
                      </CommandList>
                      {selectedDepartments.length > 0 && (
                        <>
                          <CommandSeparator className="my-1" />
                          <Button
                            size="sm"
                            className="h-8"
                            variant="secondary"
                            onClick={() => setSelectedDepartments([])}
                          >
                            Reset
                          </Button>
                        </>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
              </section>
              <Button type="submit">
                {isPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
