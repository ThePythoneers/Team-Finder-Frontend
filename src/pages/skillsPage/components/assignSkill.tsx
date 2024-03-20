import { getSkillCategory } from "@/api/skill";
import { getUserInfo } from "@/api/user";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Skill } from "@/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { MilestoneIcon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { AssignMeSkillForm } from "./assignSkillForm";

type Props = {
  skill: Skill;
};

export function AssignSkill({ skill }: Props) {
  const token = useAuthHeader();

  const { data: authorInfo, isLoading } = useQuery({
    queryKey: ["authorInfo", { user: skill.author }],
    queryFn: () => getUserInfo({ token, user: skill.author }),
  });

  const results = useQueries({
    queries: skill.skill_category.map((category_id) => ({
      queryKey: ["category", { category_id }],
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
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <MilestoneIcon className="size-5 mr-2" /> Assign Skill
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{skill.skill_name}</DialogTitle>
            {isLoading ? (
              <Skeleton className="h-50px w-full" />
            ) : (
              <DialogDescription>Author: {authorInfo.email}</DialogDescription>
            )}
          </DialogHeader>

          <section>
            {results.pending ? (
              <Skeleton className="size-[100px]" />
            ) : (
              <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
                {results.data &&
                  results.data.map &&
                  results.data.map((category, index) => (
                    <Badge key={index} variant="secondary">
                      {category.category_name}
                    </Badge>
                  ))}
              </div>
            )}
            {skill.skill_description}
          </section>
          <AssignMeSkillForm skill={skill} />
        </DialogContent>
      </Dialog>
    </>
  );
}
