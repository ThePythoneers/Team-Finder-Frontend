import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { viewDepartment } from "@/types";
import { SingleSkillCard } from "./singleSkillCard";

type Props = {
  department: viewDepartment;
};

export function SkillsCard({ department }: Props) {
  return (
    <>
      <Card>
        <CardContent className="space-y-2 max-h-[600px] overflow-auto">
          <CardHeader>
            <CardTitle>Department Skills</CardTitle>

            <CardDescription>
              {department.skills.length > 1
                ? `${department.skills.length} Skills`
                : `${department.skills.length} Skill`}
            </CardDescription>
          </CardHeader>

          {department.skills.map((skill, index) => (
            <SingleSkillCard key={index} skill={skill} />
          ))}
        </CardContent>
      </Card>
    </>
  );
}
