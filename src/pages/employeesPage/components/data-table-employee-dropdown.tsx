import { AuthUser, Employee } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  MilestoneIcon,
  MoreHorizontalIcon,
  NotebookTabsIcon,
  Trash2Icon,
} from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPrimaryRole, removePrimaryRole } from "@/api/organization";
import { useState } from "react";
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
import { assignUserToDepartment } from "@/api/department";

type RoleDropdownProps = {
  user: Employee;
};

export function EmployeesDropdown({ user }: RoleDropdownProps) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const roles = user.primary_roles;
  const user_id = user.id;

  const [adminChecked, setAdminChecked] = useState(
    roles.includes("Organization Admin")
  );
  const [departmentManagerChecked, setDepartmentManagerChecked] = useState(
    roles.includes("Department Manager")
  );
  const [projectManagerChecked, setProjectManagerChecked] = useState(
    roles.includes("Project Manager")
  );

  const queryClient = useQueryClient();
  const { mutateAsync: addRoleMutation } = useMutation({
    mutationFn: addPrimaryRole,
    onSuccess: () => {
      if (user_id === auth?.id)
        queryClient.invalidateQueries({ queryKey: ["connectedUser"] });
      queryClient.invalidateQueries({
        queryKey: ["unassignedEmployees"],
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
  const { mutateAsync: removeRoleMutation } = useMutation({
    mutationFn: removePrimaryRole,
    onSuccess: () => {
      if (user_id === auth?.id)
        queryClient.invalidateQueries({ queryKey: ["connectedUser"] });
      queryClient.invalidateQueries({
        queryKey: ["unassignedEmployees"],
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const { mutateAsync: assignUserToDepartmentMutation } = useMutation({
    mutationFn: assignUserToDepartment,
    onSuccess: () => {
      if (user_id === auth?.id)
        queryClient.invalidateQueries({ queryKey: ["connectedUser"] });
      queryClient.invalidateQueries({
        queryKey: ["unassignedEmployees"],
      });
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["assignedEmployees"] });
    },
  });

  const handleCheckboxChange = async (checked: boolean, role_name: string) => {
    if (!checked) {
      await addRoleMutation({ token, user_id, role_name });
    } else {
      await removeRoleMutation({
        token,
        user_id,
        role_name,
      });
    }
  };

  const handleAssign = async () => {
    await assignUserToDepartmentMutation({ token, user_id });
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
          {auth?.roles.includes("Department Manager") && (
            <DropdownMenuItem onClick={handleAssign}>
              <MilestoneIcon className="size-5 mr-1" />
              Assign employee
            </DropdownMenuItem>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <NotebookTabsIcon className="size-5 mr-1" /> Roles
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {roles.includes("Employee") && (
                  <DropdownMenuCheckboxItem
                    checked={adminChecked}
                    onSelect={(e) => e.preventDefault()}
                    onCheckedChange={() => {
                      setAdminChecked((prev) => !prev);
                      handleCheckboxChange(adminChecked, "Organization Admin");
                    }}
                  >
                    Organizaton Admin
                  </DropdownMenuCheckboxItem>
                )}

                <DropdownMenuCheckboxItem
                  checked={departmentManagerChecked}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() => {
                    setDepartmentManagerChecked((prev) => !prev);
                    handleCheckboxChange(
                      departmentManagerChecked,
                      "Department Manager"
                    );
                  }}
                >
                  Department Manager
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={projectManagerChecked}
                  onSelect={(e) => e.preventDefault()}
                  onCheckedChange={() => {
                    setProjectManagerChecked((prev) => !prev);
                    handleCheckboxChange(
                      projectManagerChecked,
                      "Project Manager"
                    );
                  }}
                >
                  Project Manager
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                className="bg-destructive"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash2Icon className="size-5 mr-2" /> Kick
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  employee from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => {}}>
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
