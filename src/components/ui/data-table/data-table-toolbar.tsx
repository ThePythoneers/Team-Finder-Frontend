"use client";

import { XIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { InviteEmployeesPopover } from "@/pages/rolesPage/components/data-table-invite-employee";
import { CreateDepartmentPopover } from "@/pages/departmentsPage/components/data-table-create-department";
import { CreateSkillCategoryPopover } from "@/pages/skillsPage/components/createSkillCategory";
import { CreateSkillDialog } from "@/pages/skillsPage/components/data-table-createSkill";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  type?: "role" | "employee" | "department" | "skill";
}

const test = [
  {
    label: "8c305e02-f2ea-44c1-8ccd-52da913d25ad",
    value: "8c305e02-f2ea-44c1-8ccd-52da913d25ad",
  },
  {
    label: "Department Manager",
    value: "Department Manager",
  },
  {
    label: "Project Manager",
    value: "Project Manager",
  },
  {
    label: "Employee",
    value: "Employee",
  },
];

export function DataTableToolbar<TData>({
  table,
  type,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      {type === "role" && (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
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
          <InviteEmployeesPopover />
        </div>
      )}
      {type === "employee" && (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
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
      )}
      {type === "department" && (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter department..."
            value={
              (table
                .getColumn("department_name")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("department_name")
                ?.setFilterValue(event.target.value)
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
      )}
      {type === "skill" && (
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter skill..."
            value={
              (table.getColumn("skill_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("skill_name")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {table.getColumn("skill_category") && (
            <DataTableFacetedFilter
              column={table.getColumn("skill_category")}
              title="Filter"
              options={test}
            />
          )}
          <CreateSkillCategoryPopover />
          <CreateSkillDialog />
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
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
