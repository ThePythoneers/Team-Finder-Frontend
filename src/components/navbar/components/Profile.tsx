import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  SunIcon,
  MoonIcon,
  LogOutIcon,
  SunMoonIcon,
  UserIcon,
} from "lucide-react";

import { useTheme } from "@/components/providers/themeProvider";
import { AuthUser } from "@/types";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  auth: AuthUser | null;
};

export function AvatarNav({ auth }: Props) {
  const { setTheme } = useTheme();
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate("/");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarFallback>
              {auth?.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{auth?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => navigate(`/${auth?.organization_name}/profile`)}
            >
              <UserIcon className="mr-2 size-4" />
              <span>View Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <SunIcon className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="ml-1">Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="space-x-1"
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => setTheme("light")}
                    >
                      <SunIcon /> <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="space-x-1"
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => setTheme("dark")}
                    >
                      <MoonIcon /> <span>Dark</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="space-x-1"
                      onSelect={(e) => e.preventDefault()}
                      onClick={() => setTheme("system")}
                    >
                      <SunMoonIcon /> <span>System</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={logOut}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
