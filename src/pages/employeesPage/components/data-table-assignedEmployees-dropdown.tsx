import { AuthUser, Employee } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ViewEmployeeDialog } from "./viewEmployee";
import { removeUserFromDepartment } from "@/api/department";

type RoleDropdownProps = {
  user: Employee;
};

export function AssignedEmployeesDropdown({ user }: RoleDropdownProps) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const user_id = user.id;

  const queryClient = useQueryClient();
  const { mutateAsync: removeUserFromDepartmentMutation } = useMutation({
    mutationFn: removeUserFromDepartment,
    onSuccess: () => {
      if (user_id === auth?.id)
        queryClient.invalidateQueries({ queryKey: ["connectedUser"] });
      queryClient.invalidateQueries({ queryKey: ["unassignedEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["assignedEmployees"] });
    },
  });

  const handleRemove = async () => {
    await removeUserFromDepartmentMutation({ token, user_id });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ViewEmployeeDialog user={user} />
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="bg-destructive"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2Icon className="size-5 mr-2" /> Remove
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  employee from your department.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRemove}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
