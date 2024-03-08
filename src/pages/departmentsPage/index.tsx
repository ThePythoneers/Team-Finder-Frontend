import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Department } from "@/types";
import { getDepartments } from "@/api/department";
import { DepartmentsDropdown } from "@/pages/departmentsPage/components/data-table-department-dropdown";
import { AssignDepartmentManager } from "./components/data-table-assign-dialog";
import { DepartmentManagerCard } from "./components/data-table-manager-card";

const columns: ColumnDef<Department>[] = [
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
    accessorKey: "department_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
  },
  {
    accessorKey: "department_manager",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manager" />
    ),
    cell: ({ row }) => {
      const department = row.original;
      if (department.department_manager === null)
        return <AssignDepartmentManager department={department} />;
      return <DepartmentManagerCard department={department} />;
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const department = row.original;

      return <DepartmentsDropdown department={department} />;
    },
  },
];

export function DepartmentsPage() {
  const token = useAuthHeader();

  const { data: departmentsData, isLoading } = useQuery({
    queryKey: ["departments", { token }],
    queryFn: () => getDepartments(token),
  });

  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <DataTable
            columns={columns}
            data={departmentsData}
            type="department"
          />
        )}
      </main>
    </>
  );
}
