import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Proposal } from "@/types";
import { getSkills } from "@/api/skill";
import { ProjectCard } from "./projectCard";
import { UserCard } from "./userCard";
import { ProposalsActions } from "./actions";

const columns: ColumnDef<Proposal>[] = [
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
    id: "Project",
    accessorKey: "project_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
    cell: ({ row }) => {
      return <ProjectCard proposal={row.original} />;
    },
  },
  {
    id: "User",
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      return <UserCard proposal={row.original} />;
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comments" />
    ),
  },
  {
    id: "Work Hours",
    accessorKey: "work_hours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Work Hours" />
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => <ProposalsActions proposal={row.original} />,
  },
];

export function DeallocationPage() {
  const token = useAuthHeader();

  const { data: skillsData, isLoading } = useQuery({
    queryKey: ["proposals", { token }],
    queryFn: () => getSkills(token),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[300px]  rounded-md" />
      ) : (
        <DataTable columns={columns} data={skillsData} type="proposals" />
      )}
    </>
  );
}
