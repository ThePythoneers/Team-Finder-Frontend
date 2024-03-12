import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { BadgePlusIcon, XIcon } from "lucide-react";

interface Props<TData> {
  table: Table<TData>;
}

export function EmployeesToolbar<TData>({ table }: Props<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const rolesOptions = [
    {
      label: "Organization Admin",
      value: "Organization Admin",
      icon: BadgePlusIcon,
    },
    {
      label: "Department Manager",
      value: "Department Manager",
      icon: BadgePlusIcon,
    },
    {
      label: "Project Manager",
      value: "Project Manager",
      icon: BadgePlusIcon,
    },
    {
      label: "Employee",
      value: "Employee",
      icon: BadgePlusIcon,
    },
  ];
  return (
    <>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("Roles") && (
          <DataTableFacetedFilter
            column={table.getColumn("Roles")}
            title="Filter"
            options={rolesOptions}
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
    </>
  );
}
