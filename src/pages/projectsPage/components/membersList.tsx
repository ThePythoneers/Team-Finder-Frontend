import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AuthUser, Project } from "@/types";
import { DeallocateDialog } from "./deallocateDialog";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type Props = {
  project: Project;
};

export function MembersList({ project }: Props) {
  const auth: AuthUser | null = useAuthUser();
  return (
    <>
      <Card>
        <CardContent className="py-2 space-y-4">
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
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <Badge variant="outline">UI/UX Design</Badge>
              </div>
              {auth?.roles.includes("Project Manager") &&
                project.project_manager === auth.id && (
                  <DeallocateDialog user={user} project={project} />
                )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
