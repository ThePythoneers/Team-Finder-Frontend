import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AuthUser, Project } from "@/types";
import { DeallocateDialog } from "./deallocateDialog";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type Props = {
  project: Project;
  type: string;
};

export function MembersList({ project, type }: Props) {
  const auth: AuthUser | null = useAuthUser();

  return (
    <>
      <Card>
        {type === "members" && (
          <CardContent className="space-y-4 p-2">
            {project.users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-secondary/60 transition-all rounded p-1"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarFallback>
                      {user?.username.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg">{user.username}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                {auth?.roles.includes("Project Manager") &&
                  project.project_manager === auth.id && (
                    <DeallocateDialog user={user} project={project} />
                  )}
              </div>
            ))}
          </CardContent>
        )}
        {type === "past" && (
          <CardContent className="space-y-4 p-2">
            {project.deallocated_users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-secondary/60 transition-all rounded p-1"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarFallback>
                      {user?.username.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg">{user.username}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                {auth?.roles.includes("Project Manager") &&
                  project.project_manager === auth.id && (
                    <DeallocateDialog user={user} project={project} />
                  )}
              </div>
            ))}
          </CardContent>
        )}
        {type === "proposed" && (
          <CardContent className="space-y-4 p-2">
            {project.proposed_users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between hover:bg-secondary/60 transition-all rounded p-1"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="size-12">
                    <AvatarFallback>
                      {user?.username.at(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg">{user.username}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                {auth?.roles.includes("Project Manager") &&
                  project.project_manager === auth.id && (
                    <DeallocateDialog user={user} project={project} />
                  )}
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </>
  );
}
