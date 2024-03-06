import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon, LogOutIcon } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AuthUser } from "@/types";
import { Slider } from "@/components/ui/slider";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

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
                return <Badge className="block w-fit mt-2">{role}</Badge>;
              })}
            </ul>
            <Separator />
          </SheetHeader>
          <ul className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">
                  <SunIcon className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="max-w-36 p-2">
                <Button
                  variant={"ghost"}
                  className="w-full"
                  onClick={() => setTheme("light")}
                >
                  Light
                </Button>
                <Button
                  variant={"ghost"}
                  className="w-full"
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </Button>
                <Button
                  variant={"ghost"}
                  className="w-full"
                  onClick={() => setTheme("system")}
                >
                  System
                </Button>
              </PopoverContent>
            </Popover>
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
