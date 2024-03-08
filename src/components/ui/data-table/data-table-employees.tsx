import { User } from "@/types";
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
} from "../dropdown-menu";
import { MoreHorizontalIcon, NotebookTabsIcon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Button } from "../button";
import { toast } from "sonner";
import { serverErrorMsg } from "@/api/URL";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPrimaryRole, removePrimaryRole } from "@/api/organization";
import { useState } from "react";

type RoleDropdownProps = {
  user: User;
};

export function EmployeesDropdown({ user }: RoleDropdownProps) {
  const accessToken = useAuthHeader();
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });
  const { mutateAsync: removeRoleMutation } = useMutation({
    mutationFn: removePrimaryRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["employees"] }),
  });

  const handleCheckboxChange = async (checked: boolean, role_name: string) => {
    try {
      if (!checked) {
        await addRoleMutation({ accessToken, user_id, role_name });
        toast.success("You added the role with succes!");
      } else {
        await removeRoleMutation({
          accessToken,
          user_id,
          role_name,
        });
        toast.success("You removed a role with succes!");
      }
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user.id)}
          >
            Copy user ID
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <NotebookTabsIcon className="size-5 mr-1" /> Roles
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
