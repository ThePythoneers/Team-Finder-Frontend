import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { EmployeesDropdown } from "./data-table-employee-dropdown";
import { getEmployees } from "@/api/organization";
import { RoleBadges } from "./roleBadges";

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
    accessorKey: "roles",
    id: "Roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      const data = row.original.primary_roles;
      return <RoleBadges roles={data} />;
    },
    filterFn: (row, id, value) => {
      id;
      return value.some(
        (val: string) => row.original.primary_roles.indexOf(val) !== -1
      );
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return <EmployeesDropdown user={user} />;
    },
  },
];

export function AllEmployeesPage() {
  const token = useAuthHeader();

  const { data: EmployeesData, isLoading } = useQuery({
    queryKey: ["employees", { token }],
    queryFn: () => getEmployees(token),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[300px]  rounded-md" />
      ) : (
        <DataTable columns={columns} data={EmployeesData} type="employee" />
      )}
    </>
  );
}
