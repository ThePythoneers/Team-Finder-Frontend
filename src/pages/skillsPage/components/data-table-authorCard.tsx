import { getUserInfo } from "@/api/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: Skill;
};

export function AuthorCard({ skill }: Props) {
  const token = useAuthHeader();
  const user = skill.author;

  const { data: authorData, isLoading } = useQuery({
    queryKey: ["author", { user }],
    queryFn: () => getUserInfo({ token, user }),
  });
  return (
    <>
      {isLoading ? (
        <Skeleton className="h-50px w-full" />
      ) : (
        <span>{authorData.email}</span>
      )}
    </>
  );
}
