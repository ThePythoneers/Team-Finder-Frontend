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
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Department, Employee } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  department: Department;
};

export function AssignDepartmentManager({ department }: Props) {
  const queryClient = useQueryClient();
  const [newDepartmentManager, setNewDepartmentManager] = useState("");
  const [newDepartmentManagerID, setNewDepartmentManagerID] = useState("");
  const token = useAuthHeader();

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees", { token }],
    queryFn: () => getEmployees(token),
  });

  const { mutateAsync: assignManagerMutation } = useMutation({
    mutationFn: assignDepartmentManager,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["departments"] }),
  });

  const handleAssignManager = async () => {
    const manager_id = newDepartmentManagerID;
    const department_id = department.id;
    console.log("🚀 ~ handleAssignManager ~ department_id:", department_id)

    await assignManagerMutation({ token, department_id, manager_id });
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
                    <div>dsadawdwa</div>
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
              <Button onClick={handleAssignManager}>Submit</Button>
            </DialogFooter>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
