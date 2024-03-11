import { getUnassignedEmployees } from "@/api/department";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { EmployeesDropdown } from "./data-table-employee-dropdown";

const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "primary_roles",
    id: "Roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      const data = row.original.primary_roles;
      const roles = data.map((role) => {
        if (role === "Organization Admin")
          return (
            <Badge
              key={crypto.randomUUID()}
              className="my-1 mr-1"
              variant="destructive"
            >
              {role}
            </Badge>
          );
        else if (role === "Department Manager")
          return (
            <Badge key={crypto.randomUUID()} className="my-1 mr-1">
              {role}
            </Badge>
          );
        else if (role === "Project Manager")
          return (
            <Badge
              key={crypto.randomUUID()}
              className="my-1 mr-1"
              variant="secondary"
            >
              {role}
            </Badge>
          );
        else if (role === "Employee")
          return (
            <Badge
              key={crypto.randomUUID()}
              className="my-1 mr-1"
              variant="outline"
            >
              {role}
            </Badge>
          );
      });
      return roles;
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const user: Employee = row.original;

      return <EmployeesDropdown user={user} />;
    },
  },
];

export function UnassignedEmployeesPage() {
  const token = useAuthHeader();

  const { data: unassignedEmployeesData, isLoading } = useQuery({
    queryKey: ["unassignedEmployees", { token }],
    queryFn: () => getUnassignedEmployees(token),
  });

  // ! TODO: backend change the primary roles type
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[300px]  rounded-md" />
      ) : (
        <DataTable
          columns={columns}
          data={unassignedEmployeesData}
          type="employee"
        />
      )}
    </>
  );
}
