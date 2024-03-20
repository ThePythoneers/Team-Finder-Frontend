import { getProjectInfo } from "@/api/project";
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
import { Skeleton } from "@/components/ui/skeleton";
import { userSkill } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AwardIcon } from "lucide-react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

type Props = {
  skill: userSkill;
};

export function SkillEndorsementDialog({ skill }: Props) {
  const token = useAuthHeader();

  const { data, isLoading } = useQuery({
    queryKey: ["projectinfoSkill"],
    queryFn: () => getProjectInfo({ token, id: skill.project_link }),
  });

  return (
    <>
      {isLoading ? (
        <Skeleton className="size-[100px]" />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 flex">
              <AwardIcon /> {skill.training_title}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex gap-2 items-center">
                <AwardIcon /> {skill.training_title}
              </DialogTitle>
              <DialogDescription>
                {skill.training_description}
              </DialogDescription>
            </DialogHeader>
            <div>{data.project_name}</div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
