import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, LogOutIcon, SunMoonIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "@/components/providers/themeProvider";
import { Badge } from "@/components/ui/badge";
import { AuthUser } from "@/types";
import { Slider } from "@/components/ui/slider";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  auth: AuthUser | null;
};

export function Profile({ auth }: Props) {
  const { setTheme } = useTheme();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Avatar className="cursor-pointer">
            <AvatarFallback>
              {auth?.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent className="w-full">
          <SheetHeader className="mb-2">
            <SheetTitle className="lg:text-2xl">{auth?.username}</SheetTitle>
            <SheetDescription className="lg:text-lg">
              {auth?.email}
            </SheetDescription>
            <ul className="flex gap-x-2 flex-wrap justify-center sm:justify-start">
              {auth?.roles.map((role) => {
                if (role === "Organization Admin")
                  return (
                    <Badge
                      variant="destructive"
                      key={crypto.randomUUID()}
                      className="block w-fit mt-2"
                    >
                      {role}
                    </Badge>
                  );
                else if (role === "Department Manager")
                  return (
                    <Badge
                      key={crypto.randomUUID()}
                      className="block w-fit mt-2"
                    >
                      {role}
                    </Badge>
                  );
                else if (role === "Project Manager")
                  return (
                    <Badge
                      variant="secondary"
                      key={crypto.randomUUID()}
                      className="block w-fit mt-2"
                    >
                      {role}
                    </Badge>
                  );
                else if (role === "Employee")
                  return (
                    <Badge
                      variant="outline"
                      key={crypto.randomUUID()}
                      className="block w-fit mt-2"
                    >
                      {role}
                    </Badge>
                  );
              })}
            </ul>
            <Separator />
          </SheetHeader>
          <ul className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                  <SunIcon className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="space-x-1"
                    onClick={() => setTheme("light")}
                  >
                    <SunIcon /> <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="space-x-1"
                    onClick={() => setTheme("dark")}
                  >
                    <MoonIcon /> <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="space-x-1"
                    onClick={() => setTheme("system")}
                  >
                    <SunMoonIcon /> <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="destructive" className="ml-auto" onClick={logOut}>
              <LogOutIcon className="size-5" />
            </Button>
          </ul>

          <Separator className="my-2" />
          <h3 className="text-center text-lg">Edit your skills</h3>
          <div>
            <h3 className="text-lg mb-2">
              Python <span>4</span>
            </h3>
            <Slider max={5} step={1} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
