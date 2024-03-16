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
import { SkillDepartmentsCard } from "./components/skillDepartments";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillCategoriesPage } from "./components/skillCategoriesPage";

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
    accessorKey: "departments",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Departments" />
    ),
    cell: ({ row }) => {
      const skill = row.original;
      if (skill.departments.length > 0)
        return <SkillDepartmentsCard skill={skill} />;
      return <Badge variant="outline">No Departments</Badge>;
    },
    filterFn: (row, id, value) => {
      id;
      return value.some(
        (val: string) => row.original.departments.indexOf(val) !== -1
      );
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
  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <Tabs defaultValue="skills">
            <TabsList>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="skillCategories">
                Skill Categories
              </TabsTrigger>
            </TabsList>
            <TabsContent value="skills">
              <DataTable columns={columns} data={skillsData} type="skill" />
            </TabsContent>
            <TabsContent value="skillCategories">
              <SkillCategoriesPage />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </>
  );
}
