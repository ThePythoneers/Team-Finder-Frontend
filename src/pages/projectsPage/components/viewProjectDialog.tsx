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
              {project.start_date && `Date: ${project.start_date}`}
              {project.deadline_date && ` - ${project.deadline_date}`}
            </DialogDescription>
            <div className="flex justify-between">
              <Badge variant="secondary">{project.project_period}</Badge>
              <Badge variant="secondary">{project.project_status}</Badge>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
              quidem numquam quas, deleniti dolorum ad eveniet repudiandae
              fugit! Eaque numquam veniam eligendi esse amet. Quo obcaecati ab
              aliquid dicta autem?
            </p>
          </DialogHeader>
          <Tabs defaultValue="members">
            <TabsList className="flex">
              <TabsTrigger value="members" className="flex-1">
                Members
              </TabsTrigger>
              <TabsTrigger value="pastMembers" className="flex-1">
                Past Members
              </TabsTrigger>
              <TabsTrigger value="teamRoles" className="flex-1">
                Team Roles
              </TabsTrigger>
              <TabsTrigger value="technologies" className="flex-1">
                Technologies
              </TabsTrigger>
            </TabsList>
            <TabsContent value="members">
              <MembersList project={project} />
            </TabsContent>
            <TabsContent value="pastMembers">
              <MembersList project={project} />
            </TabsContent>
            <TabsContent value="teamRoles">
              <TeamRolesList project={project} />
            </TabsContent>
            <TabsContent value="technologies">
              <TechnologiesList project={project} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
