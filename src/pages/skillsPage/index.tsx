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
  {
    accessorKey: "skill_category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill categories" />
    ),
  },
  {
    accessorKey: "skill_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  // {
  //   id: "Actions",
  //   cell: ({ row }) => {
  //     const department = row.original;

  //     return <DepartmentsDropdown department={department} />;
  //   },
  // },
];

export function SkillsPage() {
  const token = useAuthHeader();

  const { data: skillsData, isLoading } = useQuery({
    queryKey: ["skills", { token }],
    queryFn: () => getSkills(token),
  });


  // ! TODO: filter skills that are used in your department
  // ! TODO: filter skill categories
  // ! TODO: filter only created by me
  // ! TODO: filter 
  // ! TODO: filter 
  // ! TODO: filter 
  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <>
            <DataTable columns={columns} data={skillsData} type="skill" />
          </>
        )}
      </main>
    </>
  );
}
