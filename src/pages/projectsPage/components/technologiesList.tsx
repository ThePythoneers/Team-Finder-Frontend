import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types";
import { CpuIcon } from "lucide-react";

type Props = {
  project: Project;
};

export function TechnologiesList({ project }: Props) {
  return (
    <>
      <Card>
        <CardContent className="py-2 space-y-4">
          {project.technology_stack.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-2 hover:bg-secondary/60 transition-all rounded p-1"
            >
              <CpuIcon />
              <h4 className="text-lg">{tech.technology_name}</h4>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
