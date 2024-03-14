import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AuthUser, userSkill } from "@/types";
import { UserIcon } from "lucide-react";
import { RoleBadges } from "./roleBadges";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAnyUserSkills } from "@/api/skill";
import { SkillCard } from "@/pages/profilePage/components/skillCard";
import { getDepartmentInfo } from "@/api/department";

type Props = {
  user: AuthUser;
};

export function ViewEmployeeDialog({ user }: Props) {
  const token = useAuthHeader();

  const { data: userSkills, isLoading: skillsLoading } = useQuery({
    queryKey: ["userSkills"],
    queryFn: () => getAnyUserSkills(token, user.id),
  });

  const { data: userDepartment, isLoading: departmentLoading } = useQuery({
    queryKey: ["userDepartment"],
    queryFn: () =>
      getDepartmentInfo({ token, department_id: user.department_id }),
    enabled: !!user.department_id,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UserIcon className="size-5 mr-1" /> View Employee
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="max-w-[700px] max-h-[90%] overflow-hidden">
          <DialogHeader className="w-full">
            <section className="flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarFallback>
                  {user.username.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{user.username}</DialogTitle>
                <DialogDescription>{user.email}</DialogDescription>
              </div>
            </section>
          </DialogHeader>
          <RoleBadges roles={user.roles} />
          {departmentLoading ? (
            <Skeleton className="size-[100px]" />
          ) : (
            <Badge className="w-fit" variant="secondary">
              {userDepartment
                ? userDepartment.department_name
                : "No Department"}
            </Badge>
          )}

          {skillsLoading ? (
            <Skeleton className="h-[100px] w-full" />
          ) : (
            userSkills &&
            userSkills.map && (
              <section className="space-y-2 max-h-[500px] overflow-auto w-full">
                {userSkills.map((skill: userSkill) => (
                  <SkillCard key={skill.skill_id} skill={skill} />
                ))}
              </section>
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
