import { removeRoleFromProject } from "@/api/project";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AuthUser, Project } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AwardIcon, BanIcon, Loader2Icon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

type Props = {
  project: Project;
};

export function TeamRolesList({ project }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeRoleFromProject,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userProjects"] }),
  });

  return (
    <>
      <Card>
        <CardContent className="py-2 space-y-4">
          {project.project_roles.map((role, index) => (
            <div
              key={index}
              className="flex items-center justify-between hover:bg-secondary/60 transition-all rounded p-1"
            >
              <div className="flex items-center gap-1">
                <AwardIcon />
                <h4 className="text-lg">{role.role_name}</h4>
              </div>
              {auth?.roles.includes("Project Manager") &&
                auth.id === project.project_manager && (
                  <Button
                    variant="destructive"
                    onClick={async () =>
                      await mutateAsync({
                        token,
                        role_id: role.id,
                        project_id: project.project_id,
                      })
                    }
                  >
                    {isPending ? (
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                    ) : (
                      <BanIcon className="mr-1" />
                    )}
                    Remove
                  </Button>
                )}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
