import { getUserInfo } from "@/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { userSkill } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: userSkill;
};

export function UserCard({ skill }: Props) {
  const token = useAuthHeader();
  const { data, isLoading } = useQuery({
    queryKey: ["allocationUserInfo"],
    queryFn: () => getUserInfo({ token, user: skill.user_id }),
    enabled: !!skill.user_id,
  });

  return (
    <>
      {isLoading ? (
        <Skeleton className="size-[100px]" />
      ) : (
        <>
          <h3>{data.username}</h3>
          <p className="text-muted-foreground">{data.email}</p>
        </>
      )}
    </>
  );
}
