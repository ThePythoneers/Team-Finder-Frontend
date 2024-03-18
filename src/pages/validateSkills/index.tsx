import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { userSkill } from "@/types";
import { getAllUnverifiedSkills } from "@/api/skill";
import { UserCard } from "./components/UserCard";
import { SkillCard } from "./components/skillCard";
import { SkillLevelCard } from "./components/skillLevelCard";
import { SkillExperienceCard } from "./components/skillExperienceCard";
import { Badge } from "@/components/ui/badge";
import { VerifySkillAction } from "./components/verifyAction";

const columns: ColumnDef<userSkill>[] = [
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
    id: "User",
    accessorKey: "user_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      return <UserCard skill={row.original} />;
    },
  },
  {
    id: "Skill",
    accessorKey: "skill_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill" />
    ),
    cell: ({ row }) => {
      return <SkillCard skill={row.original} />;
    },
  },
  {
    id: "Skill Level",
    accessorKey: "skill_level",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Level" />
    ),
    cell: ({ row }) => {
      return <SkillLevelCard skill_level={row.original.skill_level} />;
    },
  },
  {
    id: "Skill Experience",
    accessorKey: "skill_experience",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Skill Experience" />
    ),
    cell: ({ row }) => {
      return (
        <SkillExperienceCard skill_level={row.original.skill_experience} />
      );
    },
  },
  {
    id: "Training Title",
    accessorKey: "training_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Training Title" />
    ),
    cell: ({ row }) => {
      if (row.original.training_title)
        return <Badge variant="outline">{row.original.training_title}</Badge>;
      return <Badge variant="outline">No Training Title</Badge>;
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      return <VerifySkillAction skill={row.original} />;
    },
  },
];

export function ValidateSkillsPage() {
  const token = useAuthHeader();

  const { data: skillsData, isLoading } = useQuery({
    queryKey: ["validateSkills", { token }],
    queryFn: () => getAllUnverifiedSkills(token),
  });
  console.log("🚀 ~ ValidateSkillsPage ~ skillsData:", skillsData);
  return (
    <>
      <main className="container mx-auto py-4">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <DataTable columns={columns} data={skillsData} type="proposals" />
        )}
      </main>
    </>
  );
}
