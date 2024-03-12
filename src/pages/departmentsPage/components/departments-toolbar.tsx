import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { CreateDepartmentPopover } from "./data-table-create-department";

interface Props<TData> {
  table: Table<TData>;
}

export function DepartmentsToolbar<TData>({ table }: Props<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter department..."
        value={
          (table.getColumn("department_name")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("department_name")?.setFilterValue(event.target.value)
        }
        className="h-8 w-[150px] lg:w-[250px]"
      />
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
      <CreateDepartmentPopover />
    </div>
  );
}
