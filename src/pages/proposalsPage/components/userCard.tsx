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
    queryKey: ["allocationUserInfo", { id: proposal.user_id }],
    queryFn: () => getUserInfo({ token, user: proposal.user_id }),
    enabled: !!proposal.user_id,
  });

  console.log("🚀 ~ UserCard ~ data:", data);
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
