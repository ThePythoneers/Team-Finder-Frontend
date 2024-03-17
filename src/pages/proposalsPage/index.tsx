import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Proposal } from "@/types";
import { getSkills } from "@/api/skill";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "./components/projectCard";
import { UserCard } from "./components/userCard";
import { DeallocationPage } from "./components/deAllocationPage";

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
  // {
  //   id: "Work Hours",
  //   accessorKey: "work_hours",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Comments" />
  //   ),
  // },
];

export function ProposalsPage() {
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
              <TabsTrigger value="skills">Allocation</TabsTrigger>
              <TabsTrigger value="skillCategories">Deallocation</TabsTrigger>
            </TabsList>
            <TabsContent value="skills">
              <DataTable columns={columns} data={skillsData} type="proposals" />
            </TabsContent>
            <TabsContent value="skillCategories">
              <DeallocationPage />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </>
  );
}
