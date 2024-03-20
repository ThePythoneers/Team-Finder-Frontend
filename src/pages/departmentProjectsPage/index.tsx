import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthUser, Project } from "@/types";
import { getDepartmentProjects } from "@/api/project";
import { Badge } from "@/components/ui/badge";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { UsersBadge } from "./components/usersBadge";

const columns: ColumnDef<Project>[] = [
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
    accessorKey: "project_name",
    id: "Project Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Name" />
    ),
  },
  {
    accessorKey: "project_status",
    id: "Project Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Status" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.project_status}</Badge>
    ),
  },
  {
    accessorKey: "deadline_date",
    id: "Deadline Date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deadline Date" />
    ),
    cell: ({ row }) => {
      const date = row.original.deadline_date;
      if (!date) return <Badge variant="outline">No Deadline Date</Badge>;
      return <p>{date.toString().slice(0, 10)}</p>;
    },
  },
  {
    accessorKey: "users",
    id: "Users",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Users" />
    ),
    cell: ({ row }) => {
      return <UsersBadge users={row.original.users} />;
    },
  },
];

export function DepartmentProjects() {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["departmentProjects", { token }],
    queryFn: () => getDepartmentProjects({ token, id: auth?.id }),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[300px]  rounded-md" />
      ) : (
        <DataTable columns={columns} data={projectsData} type="project" />
      )}
    </>
  );
}
