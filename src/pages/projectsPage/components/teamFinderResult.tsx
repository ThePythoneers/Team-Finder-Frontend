import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProposeDialog } from "./proposeDialog";
import { Project } from "@/types";

type Props = {
  responseData: object[];
  project: Project;
};

export function TeamFinderResult({ responseData, project }: Props) {
  return (
    <>
      {responseData.length < 1 && <div>No employees</div>}
      {responseData.length > 0 &&
        responseData.map((employee, index) => (
          <div
            key={index}
            className="flex items-center  hover:bg-secondary/60 transition-all rounded p-1 justify-between"
          >
            <div className="flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-lg">Crintea Sebastian</h4>
                <p className="text-sm text-muted-foreground">
                  seby.danyel@gmail.com
                </p>
              </div>
            </div>
            <ProposeDialog employee={employee} project={project} />
          </div>
        ))}
    </>
  );
}
