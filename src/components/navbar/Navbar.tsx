import { AuthUser } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AvatarNav } from "./components/Profile";
import { MobileNav } from "./components/MobileNav";
import { Link } from "react-router-dom";
import { InviteEmployeesPopover } from "@/components/navbar/components/invite-employee";
import { Notifications } from "./components/notifications";
import { DesktopNav } from "@/components/navbar/components/desktopNav";

type NavbarProps = {
  auth: AuthUser | null;
};

export function Navbar({ auth }: NavbarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur min-h-12 py-2 px-4 flex items-center justify-between border-b border-border/40 bg-background/25 md:px-[10%]">
        <div className="flex gap-2 items-center space-x-2">
          <Link to={`/${auth?.organization_name}`} className="text-xl">
            {auth?.organization_name}
          </Link>
          {isDesktop && <DesktopNav auth={auth} />}
        </div>
        <div className="flex gap-2 items-center">
          {auth?.roles.includes("Organization Admin") && (
            <InviteEmployeesPopover />
          )}
          <Notifications />
          <AvatarNav auth={auth} />

          {!isDesktop && <MobileNav auth={auth} />}
        </div>
      </nav>
    </>
  );
}
