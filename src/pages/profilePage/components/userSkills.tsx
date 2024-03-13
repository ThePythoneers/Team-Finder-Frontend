import { AuthUser } from "@/types";
import { SkillCard } from "./skillCard";
import { useQuery } from "@tanstack/react-query";

type Props = {
  auth: AuthUser;
};
export function UserSkills({ auth }: Props) {
  const { data: isLoading } = useQuery({
    queryKey: ["userSkills"],
    queryFn: () => {},
  });
  return (
    <>
      <section className="flex flex-col gap-2">
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
        <SkillCard />
      </section>
    </>
  );
}
