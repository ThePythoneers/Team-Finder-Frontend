import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateMeSkillForm } from "./updateSkillForm";
import { ClipboardEditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { userSkill } from "@/types";
import { SkillCategoriesBadge } from "@/pages/skillsPage/components/data-table-skillCategoriesBadge";
import { Switch } from "@/components/ui/switch";

type Props = {
  skill: userSkill;
};

export function SkillCard({ skill }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card className="group">
      <CardHeader>
        <section className="flex items-center justify-between">
          <div className="flex gap-2">
            <CardTitle>{skill.skill_name}</CardTitle>
            {!isEdit && (
              <Button
                size="icon"
                variant="ghost"
                className="opacity-0 transition-all group-hover:opacity-100 h-8"
                onClick={() => setIsEdit(true)}
              >
                <ClipboardEditIcon />
              </Button>
            )}
          </div>
          <Switch disabled />
        </section>
        <section>
          <SkillCategoriesBadge skill={skill} />
        </section>
      </CardHeader>
      <CardContent>
        <UpdateMeSkillForm
          skill={skill}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      </CardContent>
    </Card>
  );
}
