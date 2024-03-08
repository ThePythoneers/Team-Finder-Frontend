import { getUserInfo } from "@/api/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Department } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  department: Department;
};

export function DepartmentManagerCard({ department }: Props) {
  const token = useAuthHeader();
  const user = department.department_manager;

  const { data: managerData, isLoading } = useQuery({
    queryKey: ["department_manager", { token }],
    queryFn: () => getUserInfo({ token, user }),
  });

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-[45px]" />
      ) : (
        <p>{managerData.email}</p>
      )}
    </>
  );
}
