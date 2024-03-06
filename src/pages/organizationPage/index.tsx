import { Navbar } from "@/components/navbar/Navbar";
import { AuthUser } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Outlet, useParams } from "react-router-dom";
import { NotFoundPage } from "../homePage/components/NotFoundPage";

export function OrganizationPage() {
  const auth: AuthUser | null = useAuthUser();
  const params = useParams();
  const currentOrganization = params.organization_name;
  if (auth) {
    if (currentOrganization !== auth.organization_name)
      return <NotFoundPage errorMsg="This is not your organization" />;
  }
  return (
    <>
      <Navbar auth={auth} />
      <Outlet />
    </>
  );
}
