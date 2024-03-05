import { useState } from "react";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "./ui/dropdown-menu";
import { NotebookTabsIcon } from "lucide-react";

export function RolesDropdownSubMenu() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger> <NotebookTabsIcon className="size-5 mr-1" /> Roles</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuCheckboxItem
              checked={showAdmin}
              onCheckedChange={setShowAdmin}
            >
              Organizaton Admin
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showAdmin}
              onCheckedChange={setShowAdmin}
            >
              Department Manager
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showAdmin}
              onCheckedChange={setShowAdmin}
            >
              Project Manager
            </DropdownMenuCheckboxItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  );
}
