import { Navbar } from "@/components/navbar/Navbar";
import { AuthUser } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Outlet, useParams } from "react-router-dom";
import { NotFoundPage } from "../homePage/components/NotFoundPage";
import { useQuery } from "@tanstack/react-query";
import { getUserInfoByToken } from "@/api/auth";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export function OrganizationPage() {
  const token = useAuthHeader();
  const signIn = useSignIn();
  const params = useParams();
  const auth: AuthUser | null = useAuthUser();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["connectedUser", { token }],
    queryFn: () => getUserInfoByToken(token),
  });
  if (userData) {
    signIn({
      auth: {
        token: userData.access_token,
        type: userData.token_type,
      },
      userState: { ...userData.user },
    });
    if (params.organization_name !== userData.user.organization_name)
      return <NotFoundPage errorMsg="This is not your organization" />;
  }

  return (
    <>
      {isLoading ? (
        <Skeleton className="mx-auto mt-48 w-[70%] h-[500px]" />
      ) : (
        <>
          <Navbar auth={auth} />
          <Outlet />
        </>
      )}
    </>
  );
}
