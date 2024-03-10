import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { Badge } from "@/components/ui/badge";
import { EmployeesDropdown } from "@/pages/rolesPage/components/data-table-role-dropdown";
import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/api/organization";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types";

const columns: ColumnDef<User>[] = [
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Roles" />
    ),
    cell: ({ row }) => {
      const data: string[] = row.original.primary_roles;
      const roles = data.map((role: string) => {
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
      const user: User = row.original;

      return <EmployeesDropdown user={user} />;
    },
  },
];

export function RolesPage() {
  const token = useAuthHeader();

  const { data: EmployeesData, isLoading } = useQuery({
    queryKey: ["employees", { token }],
    queryFn: () => getEmployees(token),
  });

  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <DataTable columns={columns} data={EmployeesData} type="role" />
        )}
      </main>
    </>
  );
}
