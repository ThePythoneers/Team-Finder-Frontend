import { AuthUser, viewDepartment } from "@/types";
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
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDepartment, removeDepartmentManager } from "@/api/department";
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
import { ViewDepartmentDialog } from "./viewDepartment";
import { EditDepartmentDialog } from "./editDepartentDialog";

type RoleDropdownProps = {
  department: viewDepartment;
};

export function DepartmentsDropdown({ department }: RoleDropdownProps) {
  const department_id = department.id;
  const token = useAuthHeader();
  const user: AuthUser | null = useAuthUser();
  const user_roles = user?.roles;

  const queryClient = useQueryClient();
  const { mutateAsync: deleteDepartmentMutation } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  const { mutateAsync: deleteManagerMutation } = useMutation({
    mutationFn: removeDepartmentManager,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["connectedUser"] });
    },
  });

  const handleDeleteDepartment = async () => {
    await deleteDepartmentMutation({ token, department_id });
  };

  const handleDeleteManager = async () => {
    await deleteManagerMutation({ token, department_id });
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
          <ViewDepartmentDialog department={department} />
          {user_roles?.includes("Organization Admin") && (
            <EditDepartmentDialog department={department} />
          )}
          {user_roles?.includes("Organization Admin") &&
            department.department_manager && (
              <>
                <DropdownMenuSeparator />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="bg-destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2Icon className="size-5 mr-2" /> Remove Manager
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the current manager from from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteManager}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          {user_roles?.includes("Organization Admin") && (
            <>
              <DropdownMenuSeparator />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="bg-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2Icon className="size-5 mr-2" /> Delete Department
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the department from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteDepartment}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
