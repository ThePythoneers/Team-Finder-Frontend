import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types";
import { getUserProjects } from "@/api/project";
import { Badge } from "@/components/ui/badge";
import { ProjectsDropdown } from "./components/data-table-projects-dropdown";

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
    accessorKey: "project_period",
    id: "Project Period",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project Period" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.project_period}</Badge>
    ),
  },
  {
    accessorKey: "start_date",
    id: "Start Date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
    cell: ({ row }) => {
      const date = row.original.deadline_date;
      return <p>{date.toString().slice(0, 10)}</p>;
    },
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
    id: "Actions",
    cell: ({ row }) => {
      const project = row.original;

      return <ProjectsDropdown project={project} />;
    },
  },
];

export function ProjectsPage() {
  const token = useAuthHeader();

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ["userProjects"],
    queryFn: () => getUserProjects(token),
  });
  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <DataTable columns={columns} data={projectsData} type="project" />
        )}
      </main>
    </>
  );
}
