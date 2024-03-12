import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@/types";
import { getSkills } from "@/api/skill";

const columns: ColumnDef<Skill>[] = [
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
    accessorKey: "skill_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill" />
    ),
  },
];

export function ProjectsPage() {
  const token = useAuthHeader();

  const { data: skillsData, isLoading } = useQuery({
    queryKey: ["skills", { token }],
    queryFn: () => getSkills(token),
  });
  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <DataTable columns={columns} data={skillsData} type="project" />
        )}
      </main>
    </>
  );
}
