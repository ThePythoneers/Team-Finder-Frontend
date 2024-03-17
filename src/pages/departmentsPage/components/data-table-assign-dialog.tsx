import { assignDepartmentManager } from "@/api/department";
import { getEmployees } from "@/api/organization";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthUser, Employee, viewDepartment } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type Props = {
  department: viewDepartment;
};

export function AssignDepartmentManager({ department }: Props) {
  const queryClient = useQueryClient();
  const [newDepartmentManager, setNewDepartmentManager] = useState("");
  const [newDepartmentManagerID, setNewDepartmentManagerID] = useState("");
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const manager_id = newDepartmentManagerID;

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees", { token }],
    queryFn: () => getEmployees(token),
  });

  const { mutateAsync: assignManagerMutation } = useMutation({
    mutationFn: assignDepartmentManager,
    onSuccess: () => {
      if (manager_id === auth?.id)
        queryClient.invalidateQueries({ queryKey: ["connectedUser"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const handleAssignManager = async () => {
    const data = await assignManagerMutation({
      token,
      department_id: department.id,
      manager_id,
    });
    if (!data) return;
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Assign Manager</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl">
              Assign Department Manager
            </DialogTitle>
            <DialogDescription className="flex flex-col gap-1">
              Assign a Department Manager for the department:
              <span className="w-fit bg-primary text-primary-foreground rounded-md px-4 font-bold">
                {department.department_name}
              </span>
            </DialogDescription>
          </DialogHeader>
          <section className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`justify-between w-[90%] mx-auto ${
                    !newDepartmentManager && "text-muted-foreground"
                  }`}
                >
                  {!newDepartmentManager
                    ? "Select a Department Manager"
                    : newDepartmentManager}
                  <ChevronsUpDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search by email" />
                  <CommandEmpty>No user found.</CommandEmpty>
                  {isLoading ? (
                    <Skeleton className="size-[100px]" />
                  ) : (
                    <CommandGroup>
                      {employees
                        .filter((employee: Employee) =>
                          employee.primary_roles.includes("Department Manager")
                        )
                        .map((employee: Employee) => (
                          <CommandItem
                            key={employee.id}
                            value={employee.email}
                            onSelect={(currentValue) => {
                              setNewDepartmentManager(
                                currentValue === newDepartmentManager
                                  ? ""
                                  : currentValue
                              );
                              setNewDepartmentManagerID(
                                employee.id === newDepartmentManagerID
                                  ? ""
                                  : employee.id
                              );
                            }}
                          >
                            <CheckIcon
                              className={`
                          mr-2 h-4 w-4
                          ${
                            newDepartmentManager === employee.email
                              ? "opacity-100"
                              : "opacity-0"
                          }
                            `}
                            ></CheckIcon>
                            {employee.email}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={handleAssignManager}>Submit</Button>
              </DialogClose>
            </DialogFooter>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
