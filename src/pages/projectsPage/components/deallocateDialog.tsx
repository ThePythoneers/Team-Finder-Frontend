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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { BanIcon, Loader2Icon, UserIcon } from "lucide-react";
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
  console.log("🚀 ~ DeallocateDialog ~ project:", project);
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
      project_id: project.project_id,
      user_id: user.id,
      comment: reason,
    };
    await mutateAsync(values);
    setReason("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={() => setReason("")}
            variant="destructive"
            className="flex gap-1"
          >
            <BanIcon />
            Deallocate
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex gap-1 items-center text-2xl">
              <UserIcon /> {user.username} deallocation
            </DialogTitle>
            <DialogDescription>{user.email}</DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Label className="text-lg">Reason</Label>
            <Textarea
              placeholder="Give us a reason for the deallocation"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <DialogFooter className="mt-2">
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
