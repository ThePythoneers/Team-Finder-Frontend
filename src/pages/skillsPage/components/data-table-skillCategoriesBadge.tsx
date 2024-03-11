import { getSkillCategory } from "@/api/skill";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@/types";
import { useQueries } from "@tanstack/react-query";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: Skill;
};

export function SkillCategoriesBadge({ skill }: Props) {
  const token = useAuthHeader();
  const skill_categories = skill.skill_category;

  const results = useQueries({
    queries: skill_categories.map((category_id) => ({
      queryKey: ["category", category_id],
      queryFn: () => getSkillCategory({ token, category_id }),
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
          <div className="flex gap-1">
            {results.data.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.category_name}
              </Badge>
            ))}
          </div>
        </>
      )}
    </>
  );
}
