import { Button } from "../button";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Input } from "../input";
import { Label } from "../label";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { serverErrorMsg } from "@/api/URL";
import { createDepartment } from "@/api/department";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function AddDepartmentPopover() {
  const authHeader = useAuthHeader();
  const [newDepartment, setNewDepartment] = useState("");
  const {
    mutateAsync: createDepartmentMutation,
    isPending: createDepartmentPending,
  } = useMutation({
    mutationFn: createDepartment,
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newDepartment.length < 4) return;
    const params = {
      newDepartment: newDepartment,
      token: authHeader,
    };
    try {
      await createDepartmentMutation(params);
      toast.success("You created a new departmet");
      setNewDepartment("");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Failed to fetch")
          return toast.warning(serverErrorMsg);
        toast.error(error.message);
      }
    }
  };
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="ml-2" variant="ghost" size="icon">
            <PlusIcon />
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
            <Button className="mt-2">
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
