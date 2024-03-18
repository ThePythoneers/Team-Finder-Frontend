import {
  acceptAllocationProposal,
  rejectAllocationProposal,
} from "@/api/proposals";
import { Button } from "@/components/ui/button";
import { Proposal } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BanIcon, HeartHandshakeIcon, Loader2Icon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  proposal: Proposal;
};

export function AllocationActions({ proposal }: Props) {
  const token = useAuthHeader();
  const queryClient = useQueryClient();
  const { mutateAsync: acceptMutation, isPending: acceptPending } = useMutation(
    {
      mutationFn: acceptAllocationProposal,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["departmentAllocations"] }),
    }
  );
  const { mutateAsync: rejectMutation, isPending: rejectPending } = useMutation(
    {
      mutationFn: rejectAllocationProposal,
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["departmentAllocations"] }),
    }
  );

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={async () =>
            await acceptMutation({ token, _id: proposal.proposal_id })
          }
        >
          {acceptPending ? (
            <Loader2Icon className="mr-2 size-4 animate-spin" />
          ) : (
            <HeartHandshakeIcon className="mr-1" />
          )}
          Accept
        </Button>
        <Button
          variant="destructive"
          onClick={async () =>
            await rejectMutation({ token, _id: proposal.proposal_id })
          }
        >
          {rejectPending ? (
            <Loader2Icon className="mr-2 size-4 animate-spin" />
          ) : (
            <BanIcon className="mr-1" />
          )}
          Reject
        </Button>
      </div>
    </>
  );
}
