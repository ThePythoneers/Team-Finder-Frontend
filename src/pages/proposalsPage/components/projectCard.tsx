import { getProjectInfo } from "@/api/project";
import { Skeleton } from "@/components/ui/skeleton";
import { Proposal } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  proposal: Proposal;
};

export function ProjectCard({ proposal }: Props) {
  const token = useAuthHeader();
  const { data, isLoading } = useQuery({
    queryKey: ["allocationProjectInfo"],
    queryFn: () => getProjectInfo({ token, id: proposal.project_id }),
    enabled: !!proposal.project_id,
  });

  return (
    <>
      {isLoading ? (
        <Skeleton className="size-[100px]" />
      ) : (
        <p>{data.project_name}</p>
      )}
    </>
  );
}
