import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AuthUser, Skill } from "@/types";
import { LinkIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { ViewSkill } from "./viewSkill";
import { AssignSkill } from "./assignSkill";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSkill } from "@/api/skill";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { linkSkillToDepartment } from "@/api/department";

type Props = {
  skill: Skill;
};

export function SkillsDropdown({ skill }: Props) {
  const token = useAuthHeader();
  const auth: AuthUser | null = useAuthUser();
  const queryClient = useQueryClient();
  const skill_id = skill.id;

  const { mutateAsync: deleteSkillMutation } = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });

  const { mutateAsync: linkSkillMutation } = useMutation({
    mutationFn: linkSkillToDepartment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ViewSkill skill={skill} />
          <AssignSkill skill={skill} />
          {auth?.roles?.includes("Department Manager") &&
            auth.department_id && (
              <DropdownMenuItem
                onClick={async () =>
                  await linkSkillMutation({ token, skill_id: [skill.id] })
                }
              >
                <LinkIcon className="size-5 mr-2" /> Link skill
              </DropdownMenuItem>
            )}
          {auth?.roles.includes("Department Manager") &&
            auth.id === skill.author && (
              <>
                <DropdownMenuSeparator />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      className="bg-destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2Icon className="size-5 mr-2" /> Delete Skill
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the skill from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={async () =>
                          await deleteSkillMutation({ token, skill_id })
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
