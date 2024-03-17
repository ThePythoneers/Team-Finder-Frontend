import { Token, userSkill } from "@/types";
import { SkillCard } from "./skillCard";
import { useQuery } from "@tanstack/react-query";
import { getAuthUserSkills } from "@/api/skill";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  token: Token;
};
export function UserSkills({ token }: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ["authUserSkills"],
    queryFn: () => getAuthUserSkills(token),
  });
  return (
    <>
      <section className="flex flex-col gap-2">
        {isLoading ? (
          <Skeleton className="h-[500px] w-full" />
        ) : (
          data &&
          data.map &&
          data
            .filter((skill: userSkill) => !skill.verified)
            .map((skill: userSkill) => (
              <SkillCard key={skill.skill_id} skill={skill} edit={true} />
            ))
        )}
      </section>
    </>
  );
}
