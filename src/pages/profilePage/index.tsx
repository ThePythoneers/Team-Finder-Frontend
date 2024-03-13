import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { AuthUser } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { RoleBadges } from "../employeesPage/components/roleBadges";
import { useQuery } from "@tanstack/react-query";
import { getDepartmentInfo } from "@/api/department";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { UserSkills } from "./components/userSkills";

export function ProfilePage() {
  const auth: AuthUser | null = useAuthUser();
  const token = useAuthHeader();

  const { data: userDepartmentInfo, isLoading } = useQuery({
    queryKey: ["userDepartment"],
    queryFn: () => {
      if (!auth?.department_id) return { department_name: "No department" };
      return getDepartmentInfo({ token, department_id: auth?.department_id });
    },
  });

  if (!auth) return;
  return (
    <>
      <main className="md:container pt-[2%]">
        <Card className=" overflow-hidden">
          <CardContent className="pt-[2%] flex flex-col gap-4 lg:grid lg:grid-cols-2">
            <aside className="space-y-4">
              <section className="flex items-center space-x-4">
                <Avatar className="size-16">
                  <AvatarFallback className="text-2xl">
                    {auth?.username.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-3xl">{auth?.username}</CardTitle>
                  <CardDescription className="text-lg">
                    {auth?.email}
                  </CardDescription>
                </div>
              </section>
              <RoleBadges roles={auth.roles} />
              {isLoading ? (
                <Skeleton className="h-4 w-[250px]" />
              ) : (
                <>
                  {userDepartmentInfo?.department_name && (
                    <Badge variant="secondary">
                      {userDepartmentInfo?.department_name}
                    </Badge>
                  )}
                </>
              )}
            </aside>
            <section className="overflow-auto h-[calc(100vh-20vh)]">
              <UserSkills token={token} />
            </section>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
