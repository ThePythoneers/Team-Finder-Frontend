import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-header";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Tech } from "@/types";
import { getAllTechnologies } from "@/api/technologies";
import { Badge } from "@/components/ui/badge";
import { TechDropdown } from "./components/tech-dropdown";
import { CpuIcon } from "lucide-react";

const columns: ColumnDef<Tech>[] = [
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
    id: "Tech Name",
    accessorKey: "technology_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Technology" />
    ),
    cell: ({ row }) => {
      return (
        <>
          <div className="flex items-center gap-2">
            <CpuIcon />
            <Badge variant="secondary" className="text-base">
              {row.original.technology_name}
            </Badge>
          </div>
        </>
      );
    },
  },

  {
    id: "Actions",
    cell: ({ row }) => {
      const technology = row.original;

      return <TechDropdown tech={technology} />;
    },
  },
];

export function TechnologiesPage() {
  const token = useAuthHeader();

  const { data: allTechnologiesData, isLoading } = useQuery({
    queryKey: ["technologies", { token }],
    queryFn: () => getAllTechnologies(token),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[300px]  rounded-md" />
      ) : (
        <DataTable columns={columns} data={allTechnologiesData} type="tech" />
      )}
    </>
  );
}
