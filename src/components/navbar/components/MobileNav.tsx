import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { GanttChartSquareIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthUser } from "@/types";

import { XIcon, FolderGit2Icon, NotebookTabsIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
type Props = {
  auth: AuthUser | null;
};

export function MobileNav({ auth }: Props) {
  auth;
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
            <DrawerTitle className="text-xl">ASSIST SOFTWARE</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <XIcon />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <Separator className="mb-4" />
          <ul className="flex flex-col gap-2 w-full max-w-[75%] mx-auto">
            <NavLink to={"/org/employees"} className="text-center">
              {({ isActive }) => {
                return (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full text-lg"
                  >
                    <NotebookTabsIcon className="mr-2" /> Employees
                  </Button>
                );
              }}
            </NavLink>
            <NavLink to={"/sajdbjwajdw"} className="w-full text-center">
              {({ isActive }) => {
                return (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full text-lg"
                  >
                    <FolderGit2Icon className="mr-2" /> Projects
                  </Button>
                );
              }}
            </NavLink>
            <NavLink to={"/sadkwka"} className="text-center">
              {({ isActive }) => {
                return (
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full text-lg"
                  >
                    <GanttChartSquareIcon className="mr-2" /> Departments
                  </Button>
                );
              }}
            </NavLink>
          </ul>
        </DrawerContent>
      </Drawer>
    </>
  );
}
