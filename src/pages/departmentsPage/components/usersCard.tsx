import { getUserInfo } from "@/api/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Department } from "@/types";
import { useQueries } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { SingleUserCard } from "./singleUserCard";

type Props = {
  department: Department;
};

export function UsersCard({ department }: Props) {
  const token = useAuthHeader();

  const results = useQueries({
    queries: department.department_users.map((employee) => ({
      queryKey: ["category", employee],
      queryFn: () => getUserInfo({ token, user: employee }),
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
      <Card>
        <CardContent className="space-y-2 max-h-[600px] overflow-auto">
          <CardHeader>
            <CardTitle>Department employees</CardTitle>
            {results.pending ? (
              <Skeleton className="h-100px w-full" />
            ) : (
              <CardDescription>
                {results.data.length > 1
                  ? `${results.data.length} Employees`
                  : `${results.data.length} Employee`}
              </CardDescription>
            )}
          </CardHeader>
          {results.pending ? (
            <Skeleton className="h-100px w-full" />
          ) : (
            <>
              {results.data.map((user, index) => (
                <SingleUserCard key={index} user={user} />
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
