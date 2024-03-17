import { updateDepartment } from "@/api/department";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { viewDepartment } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PencilIcon, ShieldPlusIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  department: viewDepartment;
};

export function EditDepartmentDialog({ department }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();
  const [departmentName, setDepartmentName] = useState(
    department.department_name
  );

  const { mutateAsync: updateDepartmentMutation, isPending } = useMutation({
    mutationFn: updateDepartment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateDepartmentMutation({
      token,
      department_name: departmentName,
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex gap-2"
          >
            <PencilIcon />
            Edit
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-1">
              <ShieldPlusIcon /> {department.department_name}
            </DialogTitle>
            <DialogDescription>
              Edit department name: {department.department_name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Label htmlFor="input" className="text-lg">
              Department Name
            </Label>
            <Input
              id="input"
              placeholder="Custom role name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button>
                {isPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
