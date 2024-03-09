import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types";
import { getUnassignedEmployees } from "@/api/department";
import { AssignButton } from "./components/assignButton";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";

const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return <AssignButton user={user} />;
    },
  },
];

export function UnassignedEmployeesPage() {
  const token = useAuthHeader();

  const { data: unassignedEmployeesData, isLoading } = useQuery({
    queryKey: ["unassignedEmployees", { token }],
    queryFn: () => getUnassignedEmployees(token),
  });

  return (
    <>
      <main className="container mx-auto py-4">
        <Tabs defaultValue="unassigned">
          <TabsList className="w-full lg:h-auto">
            <TabsTrigger value="unassigned" className="w-full lg:text-lg">
              Assign Employees
            </TabsTrigger>
            <TabsTrigger value="assigned" className="w-full lg:text-lg">
              Current Employees
            </TabsTrigger>
          </TabsList>
          <TabsContent value="unassigned">
            {isLoading ? (
              <Skeleton className="w-full h-[300px]  rounded-md" />
            ) : (
              <>
                <DataTable
                  columns={columns}
                  data={unassignedEmployeesData}
                  type="employee"
                />
              </>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
