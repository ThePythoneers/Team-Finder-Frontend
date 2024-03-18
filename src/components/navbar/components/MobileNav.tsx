import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import {
  GanttChartSquareIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
  AlbumIcon,
  ShieldCheckIcon,
  FolderGit2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthUser } from "@/types";

import { NavLink } from "react-router-dom";
type Props = {
  auth: AuthUser | null;
};

export function MobileNav({ auth }: Props) {
  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="size-7" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex justify-between items-center">
            <DrawerTitle className="text-xl">
              {auth?.organization_name}
            </DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <XIcon />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <Separator className="mb-4" />
          <ul className="flex flex-col gap-2 w-full max-w-[75%] mx-auto">
            {auth?.roles?.includes("Organization Admin") && (
              <>
                <NavLink
                  to={`/${auth?.organization_name}/employees`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <UsersIcon className="mr-2" /> Employees
                      </Button>
                    );
                  }}
                </NavLink>
                <NavLink
                  to={`/${auth?.organization_name}/departments`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <GanttChartSquareIcon className="mr-2" /> Departments
                      </Button>
                    );
                  }}
                </NavLink>
              </>
            )}

            <NavLink
              to={`/${auth?.organization_name}/skills`}
              className="flex items-center"
            >
              {({ isActive }) => {
                return (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full text-lg"
                    size="lg"
                  >
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
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full text-lg"
                    size="lg"
                  >
                    <FolderGit2Icon className="mr-2" /> Projects
                  </Button>
                );
              }}
            </NavLink>

            {auth?.roles.includes("Department Manager") &&
              auth.department_id && (
                <NavLink
                  to={`/${auth?.organization_name}/proposals`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <ShieldCheckIcon className="mr-2" /> Proposals
                      </Button>
                    );
                  }}
                </NavLink>
              )}
          </ul>
        </DrawerContent>
      </Drawer>
    </>
  );
}
