import { getSkillCategories } from "@/api/skill";
import { Button } from "@/components/ui/button";
import { DataTableFacetedFilter } from "@/components/ui/data-table/data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthUser, SkillCategory } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Table } from "@tanstack/react-table";
import { BadgePlusIcon, ShieldIcon, XIcon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { CreateSkillCategoryPopover } from "./createSkillCategory";
import { CreateSkillDialog } from "./data-table-createSkill";

interface Props<TData> {
  table: Table<TData>;
}

export function SkillsToolbar<TData>({ table }: Props<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const auth: AuthUser | null = useAuthUser();

  const token = useAuthHeader();

  const { data: skillCategories, isLoading } = useQuery({
    queryKey: ["skillCateories"],
    queryFn: () => getSkillCategories(token),
  });

  if (!auth) return;
  const authorOptions = [
    { label: "Created by me", value: auth.id, icon: BadgePlusIcon },
  ];
  return (
    <>
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
            {table.getColumn("author") && (
              <DataTableFacetedFilter
                column={table.getColumn("author")}
                title="Author"
                options={authorOptions}
              />
            )}
          </>
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
      <div className="flex gap-1 mr-1">
        <CreateSkillCategoryPopover />
        <CreateSkillDialog />
      </div>
    </>
  );
}
