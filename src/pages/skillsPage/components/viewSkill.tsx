import { editSkill, getSkillCategories } from "@/api/skill";
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
import { AuthUser, Skill, SkillCategory } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronsUpDownIcon,
  Code2Icon,
  Edit2Icon,
  Loader2Icon,
  MessageCircleCodeIcon,
  SaveIcon,
} from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { SkillCategoriesBadge } from "./data-table-skillCategoriesBadge";
import { AuthorCard } from "./data-table-authorCard";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Props = {
  skill: Skill;
};

export function ViewSkill({ skill }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [description, setDescription] = useState<string>(
    skill.skill_description
  );
  const [skillName, setSkillName] = useState<string>(skill.skill_name);

  const { data: skillCategoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["skillCategories"],
    queryFn: () => getSkillCategories(token),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: editSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });

  const handleReset = () => {
    setDescription(skill.skill_description);
    setSkillName(skill.skill_name);
    setIsEdit(false);
  };

  const handleSave = async () => {
    await mutateAsync({
      token,
      skill_id: skill.id,
      skill_category: skillCategories.map((category) => category.id),
      skill_name: skillName,
      description: description,
    });
    setIsEdit(false);
    handleReset();
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleReset();
            }}
          >
            <MessageCircleCodeIcon className="size-5 mr-2" /> View skill
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Code2Icon />
              {skill.skill_name}
            </DialogTitle>
            <DialogDescription>
              Author: <AuthorCard skill={skill} />
            </DialogDescription>
          </DialogHeader>

          {!isEdit && (
            <>
              {skill.skill_category.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                  <SkillCategoriesBadge skill={skill} />
                </div>
              )}
            </>
          )}
          <section>
            {isEdit && skillCategories.length > 0 && (
              <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                <>
                  {skillCategories.map((category) => (
                    <Badge key={category.id} variant="secondary">
                      {category.category_name}
                    </Badge>
                  ))}
                </>
              </div>
            )}
            {isEdit && (
              <>
                <Label htmlFor="name" className="text-lg">
                  New Skill Name
                </Label>
                {isEdit ? (
                  <Input
                    id="name"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    readOnly={!isEdit}
                    className="mt-2"
                  />
                ) : (
                  <p className="rounded-md border border-border py-2 px-4">
                    {description}
                  </p>
                )}
                <Label>Select new categories</Label>
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
              </>
            )}
            <Label htmlFor="description" className="text-lg">
              Skill Description
            </Label>
            {isEdit ? (
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                readOnly={!isEdit}
                className="mt-2"
              />
            ) : (
              <p className="rounded-md border border-border py-2 px-4">
                {description}
              </p>
            )}
            {skill.author === auth?.id && (
              <>
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
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="ghost"
                      className="mt-2"
                      onClick={() => setIsEdit(!isEdit)}
                    >
                      Cancel
                    </Button>
                    <Button className="mt-2" onClick={handleSave}>
                      {isPending ? (
                        <Loader2Icon className="mr-2 size-4 animate-spin" />
                      ) : (
                        <SaveIcon className="mr-2 size-5" />
                      )}
                      Save
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
