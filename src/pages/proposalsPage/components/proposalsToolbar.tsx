import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";

interface Props<TData> {
  table: Table<TData>;
}

export function ProposalsToolbar<TData>({ table }: Props<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <>
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter user..."
          value={(table.getColumn("User")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("User")?.setFilterValue(event.target.value)
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
      </div>
    </>
  );
}
