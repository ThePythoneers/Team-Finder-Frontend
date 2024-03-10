import { getSkillCategories } from "@/api/skill";
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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Department, Skill, SkillCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronsUpDownIcon,
  Edit2Icon,
  MessageCircleCodeIcon,
  SaveIcon,
} from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: Skill;
};

export function ViewSkill({ skill }: Props) {
  const token = useAuthHeader();
  const [isEdit, setIsEdit] = useState(false);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(
    []
  );

  const [description, setDescription] = useState<string>(
    skill.skill_description
  );

  const { data: skillCategoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["skillCategories", { token }],
    queryFn: () => getSkillCategories(token),
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <MessageCircleCodeIcon className="size-5 mr-2" /> View skill
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">{skill.skill_name}</DialogTitle>
            <DialogDescription>Author: {skill.author}</DialogDescription>
          </DialogHeader>

          <section>
            {skill.skill_category.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                {skill.skill_category.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
            {isEdit && (
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
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search by name" />
                    <CommandList>
                      {categoriesLoading ? (
                        <Skeleton className="w-full h-[40px]" />
                      ) : (
                        <>
                          <CommandEmpty>Skill category not found.</CommandEmpty>
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
            )}
            <Label htmlFor="description" className="text-lg">
              Skill Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              readOnly={!isEdit}
              className="mt-2"
            />
            {!isEdit ? (
              <Button
                variant="secondary"
                className="mt-2"
                onClick={() => setIsEdit(!isEdit)}
              >
                <Edit2Icon className="mr-2 size-5" />
                Edit
              </Button>
            ) : (
              <Button className="mt-2" onClick={() => setIsEdit(!isEdit)}>
                <SaveIcon className="mr-2 size-5" /> Save
              </Button>
            )}
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
