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
import { Button } from "@/components/ui/button";

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
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const department = row.original;

      return <DepartmentsDropdown department={department} />;
    },
  },
];

export function SkillsPage() {
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
          <>
            <DataTable
              columns={columns}
              data={departmentsData}
              type="skill"
            />
          </>
        )}
      </main>
    </>
  );
}
