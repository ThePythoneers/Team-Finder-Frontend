import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Project, findResponseData } from "@/types";
import { ProposeDialog } from "./proposeDialog";

type Props = {
  users: findResponseData[];
  project: Project;
  type: string;
};

export function EmployeeList({ users, project, type }: Props) {
  return (
    <>
      {type === "available" &&
        users
          .filter((user) => user.method.includes("available"))
          .map((employee, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-secondary/60 transition-all
        rounded p-1 justify-between"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg">{employee.username}</h4>
                  <p className="text-sm text-muted-foreground">
                    {employee.email}
                  </p>
                </div>
              </div>
              <ProposeDialog employee={employee} project={project} />
            </div>
          ))}

      {type === "partially_available" &&
        users
          .filter((user) => user.method.includes("partially_available"))
          .map((employee, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-secondary/60 transition-all
        rounded p-1 justify-between"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg">{employee.username}</h4>
                  <p className="text-sm text-muted-foreground">
                    {employee.email}
                  </p>
                </div>
              </div>
              <ProposeDialog employee={employee} project={project} />
            </div>
          ))}

      {type === "close_to_finish" &&
        users
          .filter((user) => user.method.includes("close_to_finish"))
          .map((employee, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-secondary/60 transition-all
        rounded p-1 justify-between"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg">{employee.username}</h4>
                  <p className="text-sm text-muted-foreground">
                    {employee.email}
                  </p>
                </div>
              </div>
              <ProposeDialog employee={employee} project={project} />
            </div>
          ))}

      {type === "unavailable" &&
        users
          .filter((user) => user.method.includes("unavailable"))
          .map((employee, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-secondary/60 transition-all
        rounded p-1 justify-between"
            >
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg">{employee.username}</h4>
                  <p className="text-sm text-muted-foreground">
                    {employee.email}
                  </p>
                </div>
              </div>
              <ProposeDialog employee={employee} project={project} />
            </div>
          ))}
    </>
  );
}
