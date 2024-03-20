import { getDepartmentInfo } from "@/api/department";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@/types";
import { useQueries } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: Skill;
};

export function SkillDepartmentsCard({ skill }: Props) {
  const token = useAuthHeader();

  const results = useQueries({
    queries: skill.departments.map((department) => ({
      queryKey: ["skillDepartments", { department }],
      queryFn: () => getDepartmentInfo({ token, department_id: department }),
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
  return (
    <>
      {results.pending ? (
        <Skeleton className="h-[50px] w-full" />
      ) : (
        <>
          <div className="flex gap-1 flex-wrap">
            {results &&
              results.data &&
              results.data.map((department, index) => (
                <Badge key={index} variant="outline">
                  {department.department_name}
                </Badge>
              ))}
          </div>
        </>
      )}
    </>
  );
}
