import { createTech } from "@/api/technologies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

export function CreateTechPopover() {
  const token = useAuthHeader();
  const queryClient = useQueryClient();

  const [newTech, setNewTech] = useState("");
  const { mutateAsync: createSkillCategoryMutation, isPending } = useMutation({
    mutationFn: createTech,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["technologies"] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTech.length < 2)
      return toast.error(
        "The technology name has to be at least 2 characters long!"
      );
    await createSkillCategoryMutation({ token, technology_name: newTech });
    setNewTech("");
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="outline" className="h-8 space-x-2 mr-2">
            <PlusIcon /> <span>Create tech</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2 mb-2">
            <h4 className="font-medium leading-none">Technology Stack</h4>
            <p className="text-sm text-muted-foreground">
              Create a new technology.
            </p>
          </div>
          <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
            <Input
              type="text"
              placeholder="React"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
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
