import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuIcon,
  NotebookTabsIcon,
  FolderGit2Icon,
  LogOutIcon,
  SettingsIcon,
  XIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Separator } from "@/components/ui/separator";
import { AuthUser } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Card } from "./ui/card";
import { useTheme } from "./providers/themeProvider";
import { Badge } from "./ui/badge";
import { NewProjectModal } from "./NewProjectModal";

export function Navbar() {
  const auth: AuthUser | null = useAuthUser();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { setTheme } = useTheme();
  return (
    <>
      <nav className="sticky top-0 backdrop-blur min-h-12 py-2 px-4 flex items-center justify-between border-b border-border/40 bg-background/95 md:px-[10%]">
        <div className="flex gap-2 items-center">
          <h1 className="text-lg">ASSIST Software</h1>
          <ul className="hidden lg:flex gap-2">
            <Button variant={"secondary"}>
              <NotebookTabsIcon className="mr-2" /> Employees
            </Button>
            <Button variant={"secondary"}>
              <FolderGit2Icon className="mr-2" /> Projects
            </Button>
            <Button variant={"secondary"}>
              <SettingsIcon className="mr-2" /> Settings
            </Button>
          </ul>
        </div>
        <div className="flex gap-2">
          <NewProjectModal />
          <Sheet>
            <SheetTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback>O</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent className="w-full lg:max-w-[25%]">
              <SheetHeader className="mb-2">
                <SheetTitle className="lg:text-2xl">
                  {auth ? auth.username : "Obito"}
                </SheetTitle>
                <SheetDescription className="lg:text-lg">
                  {auth ? auth.email : "seby.danyel@gmail.com"}
                  <div className="flex gap-x-2 flex-wrap justify-center sm:justify-start">
                    <Badge className="block w-fit mt-2">
                      {auth ? "Manager" : "Admin"}
                    </Badge>
                    <Badge className="block w-fit mt-2">
                      {auth ? "Manager" : "Admin"}
                    </Badge>
                    <Badge className="block w-fit mt-2">
                      {auth ? "Manager" : "Admin"}
                    </Badge>
                    <Badge className="block w-fit mt-2">
                      {auth ? "Manager" : "Admin"}
                    </Badge>
                  </div>
                </SheetDescription>
                <Separator />
              </SheetHeader>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"secondary"}>
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-1">
                  <Card className="w-36 p-2">
                    <DropdownMenuItem>
                      <Button
                        variant={"ghost"}
                        className="w-full"
                        onClick={() => setTheme("light")}
                      >
                        Light
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        variant={"ghost"}
                        className="w-full"
                        onClick={() => setTheme("dark")}
                      >
                        Dark
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                        variant={"ghost"}
                        className="w-full"
                        onClick={() => setTheme("system")}
                      >
                        System
                      </Button>
                    </DropdownMenuItem>
                  </Card>
                </DropdownMenuContent>
              </DropdownMenu>
              <Separator className="my-2" />
              Python
            </SheetContent>
          </Sheet>

          {!isDesktop && (
            <Drawer direction="right">
              <DrawerTrigger>
                <Button variant={"outline"} size={"icon"}>
                  <MenuIcon className="w-7 h-7" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerClose className="ml-auto">
                    <Button variant={"ghost"} size={"icon"}>
                      <XIcon className="w-6 h-6" />
                    </Button>
                  </DrawerClose>
                  <DrawerTitle>{auth ? auth.username : "Obito"}</DrawerTitle>
                  <DrawerDescription>
                    {auth ? auth.email : "seby.danyel@gmail.com"}
                    <Separator className="my-2" />
                  </DrawerDescription>
                  <Button variant={"secondary"}>
                    <NotebookTabsIcon className="mr-2" />
                    Employees
                  </Button>
                  <Button variant={"secondary"}>
                    <FolderGit2Icon className="mr-2" />
                    Projects
                  </Button>
                  <Button variant={"secondary"}>
                    <SettingsIcon className="mr-2" />
                    Settings
                  </Button>
                </DrawerHeader>
                <DrawerFooter>
                  <Button variant={"destructive"}>
                    <LogOutIcon className="mr-2" />
                    Log Out
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </nav>
    </>
  );
}
