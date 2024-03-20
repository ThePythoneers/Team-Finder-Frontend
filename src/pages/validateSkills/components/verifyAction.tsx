import { rejectVerifySkill, verifySkill } from "@/api/skill";
import { Button } from "@/components/ui/button";
import { userSkill } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BanIcon, BookCheckIcon, Loader2Icon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: userSkill;
};

export function VerifySkillAction({ skill }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();
  const { mutateAsync: verifyMutation, isPending: verifyPending } = useMutation(
    {
      mutationFn: verifySkill,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["validateSkills"] });
        queryClient.invalidateQueries({ queryKey: ["userSkills"] });
      },
    }
  );

  const { mutateAsync: rejectMutation, isPending: rejectPending } = useMutation(
    {
      mutationFn: rejectVerifySkill,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["validateSkills"] });
        queryClient.invalidateQueries({ queryKey: ["userSkills"] });
      },
    }
  );

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={async () => await verifyMutation({ token, _id: skill.id })}
        >
          {verifyPending ? (
            <Loader2Icon className="mr-1 size-4 animate-spin" />
          ) : (
            <BookCheckIcon className="mr-1" />
          )}
          Verify
        </Button>
        <Button
          variant="destructive"
          onClick={async () => await rejectMutation({ token, _id: skill.id })}
        >
          {rejectPending ? (
            <Loader2Icon className="mr-1 size-4 animate-spin" />
          ) : (
            <BanIcon className="mr-1" />
          )}
          Reject
        </Button>
      </div>
    </>
  );
}
