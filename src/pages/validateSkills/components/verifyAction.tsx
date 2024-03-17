import { verifySkill } from "@/api/skill";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookCheckIcon, Loader2Icon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

export function VerifySkillAction() {
  const token = useAuthHeader();
  const queryClient = useQueryClient();
  const { mutateAsync: verifyMutation, isPending } = useMutation({
    mutationFn: verifySkill,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["validateSkills"] }),
  });

  return (
    <>
      <Button onClick={async () => await verifyMutation({ token })}>
        {isPending ? (
          <Loader2Icon className="mr-1 size-4 animate-spin" />
        ) : (
          <BookCheckIcon className="mr-1" />
        )}
        Verify
      </Button>
    </>
  );
}