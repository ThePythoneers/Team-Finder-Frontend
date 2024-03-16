import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateMeSkillForm } from "./updateSkillForm";
import { ClipboardEditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { userSkill } from "@/types";
import { SkillCategoriesBadge } from "@/pages/skillsPage/components/data-table-skillCategoriesBadge";
import { Switch } from "@/components/ui/switch";
import { AddEndorsementDialog } from "./addEndorsement";

type Props = {
  skill: userSkill;
  edit?: boolean;
};

export function SkillCard({ skill, edit }: Props) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card className="group">
      <CardHeader>
        <section className="flex items-center justify-between mb-1">
          <div className="flex gap-2">
            <CardTitle>{skill.skill_name}</CardTitle>
            {!isEdit && edit && (
              <Button
                size="icon"
                variant="ghost"
                className="opacity-0 transition-all group-hover:opacity-100 h-8"
                onClick={() => setIsEdit(true)}
              >
                <ClipboardEditIcon />
              </Button>
            )}
            {isEdit && edit && <AddEndorsementDialog />}
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
          edit={edit}
        />
      </CardContent>
    </Card>
  );
}
