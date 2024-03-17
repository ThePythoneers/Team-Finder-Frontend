import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { viewDepartment } from "@/types";
import { getDepartments } from "@/api/department";
import { DepartmentsDropdown } from "@/pages/departmentsPage/components/data-table-department-dropdown";
import { AssignDepartmentManager } from "./components/data-table-assign-dialog";
import { useAdminRedirect } from "@/hooks/useAdminRedirect";
import { Badge } from "@/components/ui/badge";
import { ShieldPlusIcon } from "lucide-react";

const columns: ColumnDef<viewDepartment>[] = [
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
    id: "Department",
    accessorKey: "department_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex items-center gap-2">
            <ShieldPlusIcon />
            <Badge variant="secondary" className="text-base">
              {row.original.department_name}
            </Badge>
          </div>
        </>
      );
    },
  },
  {
    id: "Manager",
    accessorKey: "manager_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manager" />
    ),
    cell: ({ row }) => {
      const department = row.original;
      const manager_email = department.manager_email;
      if (department.department_manager === null)
        return <AssignDepartmentManager department={department} />;
      return <p>{manager_email}</p>;
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
  useAdminRedirect();
  const token = useAuthHeader();

  const { data: departmentsData, isLoading } = useQuery({
    queryKey: ["departments", { token }],
    queryFn: () => getDepartments(token),
  });

  console.log("🚀 ~ DepartmentsPage ~ departmentsData:", departmentsData)
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
              type="department"
            />
          </>
        )}
      </main>
    </>
  );
}
