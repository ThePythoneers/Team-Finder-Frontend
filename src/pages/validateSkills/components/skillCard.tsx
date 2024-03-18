import { getAnyUserSkills } from "@/api/skill";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { userSkill } from "@/types";
import { useQuery } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: userSkill;
};

export function SkillCard({ skill }: Props) {
  const mainSkill = skill;
  const token = useAuthHeader();
  const _id = skill.user_id;
  const { data, isLoading } = useQuery({
    queryKey: ["validateIndividualSkill"],
    queryFn: () => getAnyUserSkills(token, _id),
    enabled: !!skill.user_id,
  });

  console.log("🚀 ~ SkillCard ~ data:", data);
  return (
    <>
      {isLoading ? (
        <Skeleton className="size-[100px]" />
      ) : (
        <>
          {data
            .filter((skill: userSkill) => skill.skill_id === mainSkill.skill_id)
            .map((skill: userSkill) => (
              <Badge key={skill.skill_id} variant="secondary">{skill.skill_name}</Badge>
            ))}
          <h3>{data.username}</h3>
          <p className="text-muted-foreground">{data.email}</p>
        </>
      )}
    </>
  );
}
