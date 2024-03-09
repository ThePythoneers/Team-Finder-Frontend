import { serverErrorMsg } from "@/api/URL";
import { createSkillCategory } from "@/api/skill";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function CreateSkillCategoryPopover() {
  const token = useAuthHeader();

  const [newSkillCategory, setNewSkillCategory] = useState("");
  const { mutateAsync: createSkillCategoryMutation, isPending } = useMutation({
    mutationFn: createSkillCategory,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await createSkillCategoryMutation({ token, newSkillCategory });
    console.log(data);
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="ml-2">
            <PlusIcon /> Create skill category
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2 mb-2">
            <h4 className="font-medium leading-none">Skill Category</h4>
            <p className="text-sm text-muted-foreground">
              Create a new skill category.
            </p>
          </div>
          <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
            <Input
              type="text"
              placeholder="Frontend Development"
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
            />
            <Button type="submit">
              {isPending && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}
              Submit
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    </>
  );
}
