import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateMeSkillForm } from "./updateSkillForm";
import { ClipboardEditIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SkillCard() {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Card className="group">
      <CardHeader>
        <section className="flex items-center gap-2">
          <CardTitle>Skill</CardTitle>
          {!isEdit ? (
            <Button
              size="icon"
              variant="ghost"
              className="opacity-0 transition-all group-hover:opacity-100 h-8"
              onClick={() => setIsEdit(true)}
            >
              <ClipboardEditIcon />
            </Button>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="opacity-0 transition-all group-hover:opacity-100 h-8 space-x-1"
              onClick={() => setIsEdit(false)}
            >
              <XIcon /> <span>Cancel</span>
            </Button>
          )}
        </section>
        <section>
          <Badge variant="secondary">sadaw</Badge>
        </section>
      </CardHeader>
      <CardContent>
        <UpdateMeSkillForm isEdit={isEdit} setIsEdit={setIsEdit} />
      </CardContent>
    </Card>
  );
}
