import { Card } from "@/components/ui/card";

type Props = {
  skill: {
    skill_name: string;
    skill_description: string;
    skill_category: string[];
  };
};
export function SingleSkillCard({ skill }: Props) {
  return (
    <>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <div>
            <h4>{skill.skill_name}</h4>
            <h5 className="text-sm text-muted-foreground"></h5>
          </div>
        </div>
      </Card>
    </>
  );
}
