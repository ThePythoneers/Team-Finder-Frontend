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
  auth;
  return (
    <>
      <ul className="hidden lg:flex gap-2">
        <NavLink to={"/org/employees"} className="flex items-center">
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"}>
                <NotebookTabsIcon className="mr-2" /> Employees
              </Button>
            );
          }}
        </NavLink>
        <NavLink to={"/sadwad"} className="flex items-center">
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"}>
                <FolderGit2Icon className="mr-2" /> Projects
              </Button>
            );
          }}
        </NavLink>
        <NavLink to={"/snjabjdwa"} className="flex items-center">
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
