import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Project } from "@/types";
import { FolderGit2Icon } from "lucide-react";
import { MembersList } from "./membersList";
import { TeamRolesList } from "./teamRolesList";
import { TechnologiesList } from "./technologiesList";

type Props = {
  project: Project;
};

export function ViewProjectDialog({ project }: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem
            className="space-x-2"
            onSelect={(e) => e.preventDefault()}
          >
            <FolderGit2Icon /> <span>View Project</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent className="lg:max-w-[50%]">
          <DialogHeader>
            <DialogTitle className="flex gap-2 items-center text-2xl">
              <FolderGit2Icon /> {project.project_name}
            </DialogTitle>
            <DialogDescription>
              {project.start_date &&
                `Date: ${project.start_date.toString().slice(0, 10)}`}
              {project.deadline_date &&
                ` <-> ${project.deadline_date.toString().slice(0, 10)}`}
            </DialogDescription>
            <div className="flex justify-between">
              <Badge variant="secondary">{project.project_period}</Badge>
              <Badge variant="secondary">{project.project_status}</Badge>
            </div>
            <p>{project.description}</p>
          </DialogHeader>
          <Tabs defaultValue="members">
            <TabsList className="flex">
              <TabsTrigger
                value="members"
                className="flex-1 text-[12px] lg:text-sm"
              >
                Members
              </TabsTrigger>
              <TabsTrigger
                value="proposed"
                className="flex-1 text-[12px] lg:text-sm"
              >
                Proposed
              </TabsTrigger>
              <TabsTrigger
                value="pastMembers"
                className="flex-1 text-[12px] lg:text-sm"
              >
                Past Members
              </TabsTrigger>
              <TabsTrigger
                value="teamRoles"
                className="flex-1 text-[12px] lg:text-sm"
              >
                Team Roles
              </TabsTrigger>
              <TabsTrigger
                value="technologies"
                className="flex-1 text-[12px] lg:text-sm"
              >
                Technologies
              </TabsTrigger>
            </TabsList>
            <TabsContent value="members" className="max-h-[70vh] overflow-auto">
              <MembersList project={project} type="members" />
            </TabsContent>
            <TabsContent
              value="proposed"
              className="max-h-[70vh] overflow-auto"
            >
              <MembersList project={project} type="proposed" />
            </TabsContent>
            <TabsContent
              value="pastMembers"
              className="max-h-[70vh] overflow-auto"
            >
              {project.users && <MembersList project={project} type="past" />}
            </TabsContent>
            <TabsContent
              value="teamRoles"
              className="max-h-[70vh] overflow-auto"
            >
              <TeamRolesList project={project} />
            </TabsContent>
            <TabsContent
              value="technologies"
              className="max-h-[70vh] overflow-auto"
            >
              <TechnologiesList project={project} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
