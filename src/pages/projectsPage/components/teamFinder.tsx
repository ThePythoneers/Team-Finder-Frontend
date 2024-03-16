import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Project } from "@/types";
import { UsersIcon } from "lucide-react";
import { TeamFinderForm } from "./teamFinderForm";
import { useState } from "react";
import { TeamFinderResult } from "./teamFinderResult";

type Props = {
  project: Project;
};

export function TeamFinderDialog({ project }: Props) {
  project;

  const [isSearch, setIsSearch] = useState(false);
  const [responseData, setResponseData] = useState([{}]);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            className="space-x-2"
            onSelect={(e) => e.preventDefault()}
            onClick={() => {
              setIsSearch(false);
              setResponseData([{}]);
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
            <DialogDescription className="text-lg">
              Let us help you find the best team!
            </DialogDescription>
          </DialogHeader>
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
