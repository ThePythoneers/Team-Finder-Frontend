import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@/types";
import { getSkills } from "@/api/skill";
import { SkillsDropdown } from "./components/data-table-skill-dropdown";
import { SkillCategoriesBadge } from "./components/data-table-skillCategoriesBadge";
import { AuthorCard } from "./components/data-table-authorCard";

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
    id: "Skill",
    accessorKey: "skill_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill" />
    ),
  },
  {
    id: "Skill categories",
    accessorKey: "skill_category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill categories" />
    ),

    cell: ({ row }) => {
      const skill = row.original;
      return <SkillCategoriesBadge skill={skill} />;
    },
    filterFn: (row, id, value) => {
      id;
      return value.some(
        (val: string) => row.original.skill_category.indexOf(val) !== -1
      );
    },
  },
  {
    id: "Skill Description",
    accessorKey: "skill_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      const skill = row.original;
      return <AuthorCard skill={skill} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const skill = row.original;

      return <SkillsDropdown skill={skill} />;
    },
  },
];

export function SkillsPage() {
  const token = useAuthHeader();

  const { data: skillsData, isLoading } = useQuery({
    queryKey: ["skills", { token }],
    queryFn: () => getSkills(token),
  });
  // ! TODO: filter skills that are used in your department
  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <DataTable columns={columns} data={skillsData} type="skill" />
        )}
      </main>
    </>
  );
}
