import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NotebookTabsIcon,
  FolderGit2Icon,
  GanttChartSquareIcon,
} from "lucide-react";
import { AuthUser } from "@/types";

type Props = {
  auth: AuthUser | null;
};

export function DesktopNav({ auth }: Props) {
  return (
    <>
      <ul className="hidden lg:flex gap-2">
        <NavLink to={`/${auth?.organization_name}/employees`} className="flex items-center">
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"}>
                <NotebookTabsIcon className="mr-2" /> Employees
              </Button>
            );
          }}
        </NavLink>
        <NavLink to={`/${auth?.organization_name}/projects`} className="flex items-center">
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"}>
                <FolderGit2Icon className="mr-2" /> Projects
              </Button>
            );
          }}
        </NavLink>
        <NavLink to={`/${auth?.organization_name}/departments`} className="flex items-center">
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"}>
                <GanttChartSquareIcon className="mr-2" /> Departments
              </Button>
            );
          }}
        </NavLink>
      </ul>
    </>
  );
}
