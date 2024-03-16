import { createDeAllocationProposal } from "@/api/proposals";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, UserIcon } from "lucide-react";
import { useState } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

type Props = {
  user: {
    id: string;
    username: string;
    email: string;
  };
  project: Project;
};

export function DeallocateDialog({ user, project }: Props) {
  const token = useAuthHeader();

  const [reason, setReason] = useState("");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createDeAllocationProposal,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reason)
      return toast.error("You have to specify a reason for the deallocation!");
    const values = {
      token,
      project_id_allocation: project.id,
      user_id: user.id,
      comments: reason,
    };
    await mutateAsync(values);
    setReason("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => setReason("")}>Deallocate</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex gap-1 items-center">
              <UserIcon /> {user.username} deallocation
            </DialogTitle>
            <DialogDescription>{user.email}</DialogDescription>
          </DialogHeader>
          <form className="space-y-2" onSubmit={(e) => handleSubmit(e)}>
            <Textarea
              placeholder="Give us a reason for the deallocation"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Cancel</Button>
              </DialogClose>
              <Button>
                {isPending && (
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
