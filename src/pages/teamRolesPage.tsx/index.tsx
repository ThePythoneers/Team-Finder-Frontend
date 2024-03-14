import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { teamRole } from "@/types";
import { getAllTeamRoles } from "@/api/teamRoles";
import { TeamRolesDropdown } from "./components/data-table-team-roles-dropdown";

const columns: ColumnDef<teamRole>[] = [
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
    id: "Team Role",
    accessorKey: "custom_role_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Team Role" />
    ),
  },

  {
    id: "Actions",
    cell: ({ row }) => {
      const teamRole = row.original;

      return <TeamRolesDropdown teamRole={teamRole} />;
    },
  },
];

export function TeamRolesPage() {
  const token = useAuthHeader();

  const { data: teamRolesData, isLoading } = useQuery({
    queryKey: ["teamRoles", { token }],
    queryFn: () => getAllTeamRoles(token),
  });
  return (
    <>
      {/* <main className="container mx-auto py-4"> */}
        {isLoading ? (
          <Skeleton className="w-full h-[300px]  rounded-md" />
        ) : (
          <DataTable columns={columns} data={teamRolesData} type="roles" />
        )}
      {/* </main> */}
    </>
  );
}
