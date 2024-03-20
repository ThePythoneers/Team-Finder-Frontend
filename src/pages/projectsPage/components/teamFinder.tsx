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
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Project, findResponseData } from "@/types";
import {
  BotIcon,
  HeartHandshakeIcon,
  Loader2Icon,
  UsersIcon,
} from "lucide-react";
import { TeamFinderForm } from "./teamFinderForm";
import { useState } from "react";
import { TeamFinderResult } from "./teamFinderResult";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { gpt } from "@/api/gpt";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { toast } from "sonner";

type Props = {
  project: Project;
};

export function TeamFinderDialog({ project }: Props) {
  const token = useAuthHeader();
  const [isSearch, setIsSearch] = useState(false);
  const [responseData, setResponseData] = useState<findResponseData[]>([]);

  const [aiMessage, setAiMessage] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: gpt,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            className="space-x-2"
            onSelect={(e) => e.preventDefault()}
            onClick={() => {
              setIsSearch(false);
              setResponseData([]);
            }}
          >
            <UsersIcon /> <span>Add members</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="lg:max-w-[50%]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-2xl">
              <UsersIcon /> Team Finder
            </DialogTitle>
          </DialogHeader>
          {!isSearch && (
            <div className="flex justify-between">
              <p className="text-xl">Let AI help you find your teammates</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <HeartHandshakeIcon /> Additional Context
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-1">
                      <BotIcon /> OpenAI
                    </DialogTitle>
                    <DialogDescription>
                      Let AI help you finding your best team
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Label htmlFor="input" className="text-lg">
                      Message
                    </Label>
                    <Textarea
                      id="input"
                      placeholder="Message"
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                    />
                    <DialogFooter className="mt-2">
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={async () => {
                          const data = await mutateAsync({
                            token,
                            message: aiMessage,
                            project_id: project.project_id,
                          });
                          console.log(data);
                          toast.success("Look in the console [F12]");
                        }}
                      >
                        {isPending && (
                          <Loader2Icon className="mr-2 size-4 animate-spin" />
                        )}
                        Submit
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {!isSearch ? (
            <TeamFinderForm
              setIsSearch={setIsSearch}
              setResponseData={setResponseData}
            />
          ) : (
            <TeamFinderResult responseData={responseData} project={project} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
