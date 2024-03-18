import { getPastProjects } from "@/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthUser } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export function PastProjectsList() {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const { data, isLoading } = useQuery({
    queryKey: ["userPastProjects", { token }],
    queryFn: () => getPastProjects({ token, _id: auth?.id }),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="size-[100px]" />
      ) : (
        <div>
          <p>{data.project_name}</p>
        </div>
      )}
    </>
  );
}
