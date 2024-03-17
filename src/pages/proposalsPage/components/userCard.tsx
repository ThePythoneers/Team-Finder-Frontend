import { getUserInfo } from "@/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Proposal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  proposal: Proposal;
};

export function UserCard({ proposal }: Props) {
  const token = useAuthHeader();
  const { data, isLoading } = useQuery({
    queryKey: ["projectInfo"],
    queryFn: () => getUserInfo({ token, user: proposal.user_id }),
  });

  return (
    <>
      {isLoading ? (
        <Skeleton className="size-[100px]" />
      ) : (
        <p>{data.username}</p>
      )}
    </>
  );
}
