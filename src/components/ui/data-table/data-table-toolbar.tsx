"use client";

import { BadgePlusIcon, ShieldIcon, XIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { CreateDepartmentPopover } from "@/pages/departmentsPage/components/data-table-create-department";
import { CreateSkillCategoryPopover } from "@/pages/skillsPage/components/createSkillCategory";
import { CreateSkillDialog } from "@/pages/skillsPage/components/data-table-createSkill";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthUser, SkillCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getSkillCategories } from "@/api/skill";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "../skeleton";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  type?: "employee" | "department" | "skill";
}

export function DataTableToolbar<TData>({
  table,
  type,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const auth: AuthUser | null = useAuthUser();
  const token = useAuthHeader();

  const { data: skillCategories, isLoading } = useQuery({
    queryKey: ["skillCateories"],
    queryFn: () => getSkillCategories(token),
  });

  const skillsOptions = [
    { label: "Created by me", value: auth?.id, icon: BadgePlusIcon },
  ];
  return (
    <div className="flex items-center justify-between">
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
          {isLoading ? (
            <Skeleton className="h-[50px] w-full" />
          ) : (
            <>
              {table.getColumn("Skill category") && (
                <DataTableFacetedFilter
                  column={table.getColumn("Skill category")}
                  title="Filter"
                  options={[
                    ...skillCategories.map((category: SkillCategory) => {
                      const obj = {
                        label: category.category_name,
                        value: category.id,
                        icon: ShieldIcon,
                      };
                      return obj;
                    }),
                  ]}
                />
              )}
            </>
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
