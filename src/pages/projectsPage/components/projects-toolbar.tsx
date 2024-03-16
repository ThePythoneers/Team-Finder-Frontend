import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { BadgePlusIcon, XIcon } from "lucide-react";
import { NewProjectDialog } from "./newProjectDialog";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthUser } from "@/types";
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";

interface Props<TData> {
  table: Table<TData>;
}

const projectStatus = [
  {
    label: "Not Started",
    value: "Not Started",
    icon: BadgePlusIcon,
  },
  {
    label: "Starting",
    value: "Starting",
    icon: BadgePlusIcon,
  },
  {
    label: "In Progress",
    value: "In Progress",
    icon: BadgePlusIcon,
  },
  {
    label: "Closing",
    value: "Closing",
    icon: BadgePlusIcon,
  },
  {
    label: "Closed",
    value: "Closed",
    icon: BadgePlusIcon,
  },
];

const projectPeriod = [
  {
    label: "Fixed",
    value: "Ongoing",
    icon: BadgePlusIcon,
  },
];

export function ProjectsToolbar<TData>({ table }: Props<TData>) {
  const auth: AuthUser | null = useAuthUser();
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter projects..."
          value={
            (table.getColumn("Project Name")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("Project Name")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("Project Period") && (
          <DataTableFacetedFilter
            column={table.getColumn("Project Period")}
            title="Period"
            options={projectPeriod}
          />
        )}
        {table.getColumn("Project Status") && (
          <DataTableFacetedFilter
            column={table.getColumn("Project Status")}
            title="Status"
            options={projectStatus}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {auth?.roles.includes("Project Manager") && <NewProjectDialog />}
    </>
  );
}
