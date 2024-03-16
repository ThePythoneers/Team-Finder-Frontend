import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlbumIcon,
  FolderGit2Icon,
  GanttChartSquareIcon,
  UsersIcon,
} from "lucide-react";
import { AuthUser } from "@/types";

type Props = {
  auth: AuthUser | null;
};

export function DesktopNav({ auth }: Props) {
  const user_roles = auth?.roles;
  return (
    <>
      <ul className="flex gap-2">
        {(user_roles?.includes("Department Manager") ||
          user_roles?.includes("Organization Admin")) && (
          <NavLink
            to={`/${auth?.organization_name}/employees`}
            className="flex items-center"
          >
            {({ isActive }) => {
              return (
                <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                  <UsersIcon className="mr-2" /> Employees
                </Button>
              );
            }}
          </NavLink>
        )}
        {user_roles?.includes("Organization Admin") && (
          <NavLink
            to={`/${auth?.organization_name}/departments`}
            className="flex items-center"
          >
            {({ isActive }) => {
              return (
                <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                  <GanttChartSquareIcon className="mr-2" /> Departments
                </Button>
              );
            }}
          </NavLink>
        )}

        <NavLink
          to={`/${auth?.organization_name}/skills`}
          className="flex items-center"
        >
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                <AlbumIcon className="mr-2" /> Skills
              </Button>
            );
          }}
        </NavLink>
        <NavLink
          to={`/${auth?.organization_name}/projects`}
          className="flex items-center"
        >
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                <FolderGit2Icon className="mr-2" /> Projects
              </Button>
            );
          }}
        </NavLink>
        <NavLink
          to={`/${auth?.organization_name}/proposals`}
          className="flex items-center"
        >
          {({ isActive }) => {
            return (
              <Button variant={isActive ? "secondary" : "ghost"} size="sm">
                <UsersIcon className="mr-2" /> Proposals wip
              </Button>
            );
          }}
        </NavLink>
      </ul>
    </>
  );
}
