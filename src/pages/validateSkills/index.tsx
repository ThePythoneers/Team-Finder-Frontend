import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { SkillCategory } from "@/types";
import { getSkillCategories } from "@/api/skill";
import { Badge } from "@/components/ui/badge";
import { ShieldIcon } from "lucide-react";
import { useDepartmentManagerRedirect } from "@/hooks/useDepartmentManagerRedirect";

const columns: ColumnDef<SkillCategory>[] = [
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
    id: "Skill Category",
    accessorKey: "category_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Category" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex items-center gap-2">
            <ShieldIcon />
            <Badge variant="secondary" className="text-base">
              {row.original.category_name}
            </Badge>
          </div>
        </>
      );
    },
  },
  // {
  //   id: "Actions",
  //   cell: ({ row }) => {
  //     const category = row.original;

  //     return <SkillCategoryDropdown category={category} />;
  //   },
  // },
];

export function ValidateSkillsPage() {
  useDepartmentManagerRedirect();
  const token = useAuthHeader();

  const { data: skillCategoriesData, isLoading } = useQuery({
    queryKey: ["skillCategories", { token }],
    queryFn: () => getSkillCategories(token),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[300px]  rounded-md" />
      ) : (
        <DataTable columns={columns} data={skillCategoriesData} type="skill" />
      )}
    </>
  );
}
