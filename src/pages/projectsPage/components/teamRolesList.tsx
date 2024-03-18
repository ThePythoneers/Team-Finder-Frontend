import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types";
import { AwardIcon } from "lucide-react";

type Props = {
  project: Project;
};

export function TeamRolesList({ project }: Props) {
  return (
    <>
      <Card>
        <CardContent className="py-2 space-y-4">
          {project.project_roles.map((role, index) => (
            <div
              key={index}
              className="flex items-center gap-2 hover:bg-secondary/60 transition-all rounded p-1"
            >
              <AwardIcon />
              <h4 className="text-lg">{role.role_name}</h4>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
