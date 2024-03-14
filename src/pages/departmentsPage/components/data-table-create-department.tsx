import { Button } from "../../../components/ui/button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createDepartment } from "@/api/department";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

export function CreateDepartmentPopover() {
  const authHeader = useAuthHeader();
  const [newDepartment, setNewDepartment] = useState("");
  const queryClient = useQueryClient();
  const {
    mutateAsync: createDepartmentMutation,
    isPending: createDepartmentPending,
  } = useMutation({
    mutationFn: createDepartment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newDepartment.length < 4)
      return toast.error(
        "The Department name has to be at least 4 characters long!"
      );
    const params = {
      newDepartment: newDepartment,
      token: authHeader,
    };
    await createDepartmentMutation(params);
    setNewDepartment("");
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="mr-2 h-8" variant="outline" size="sm">
            <PlusIcon /> Create a new department
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2 mb-2">
            <h4 className="font-medium leading-none">
              Create a new department
            </h4>
            <p className="text-sm text-muted-foreground">
              Set a name for the new department.
            </p>
          </div>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <Label htmlFor="department_name">Department Name</Label>
            <Input
              id="department_name"
              type="text"
              placeholder="Backend Department"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
            <Button className="mt-2" type="submit">
              {createDepartmentPending && (
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
