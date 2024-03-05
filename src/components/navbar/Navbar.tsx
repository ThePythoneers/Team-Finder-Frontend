import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { AuthUser } from "@/types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NewProjectModal } from "./components/NewProjectModal";
import { Profile } from "./components/Profile";
import { MobileNav } from "./components/MobileNav";
import { DesktopNav } from "./components/DesktopNav";
import { Link } from "react-router-dom";

export function Navbar() {
  const auth: AuthUser | null = useAuthUser();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur min-h-12 py-2 px-4 flex items-center justify-between border-b border-border/40 bg-background/25 md:px-[10%]">
        <div className="flex gap-2 items-center">
          <Link to="#" className="text-xl mr-4">
            ASSIST Software
          </Link>
          <DesktopNav auth={auth} />
        </div>
        <div className="flex gap-2 items-center">
          <NewProjectModal />
          <Profile auth={auth} />

          {!isDesktop && <MobileNav auth={auth} />}
        </div>
      </nav>
    </>
  );
}