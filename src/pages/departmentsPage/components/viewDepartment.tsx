import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Department } from "@/types";
import {
  BadgePlusIcon,
  Code2Icon,
  MessageCircleCodeIcon,
  UsersIcon,
} from "lucide-react";
import { UsersCard } from "./usersCard";
import { SkillsCard } from "./skillsCard";

type Props = {
  department: Department;
};

export function ViewDepartmentDialog({ department }: Props) {
  if (!department) return;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <MessageCircleCodeIcon className="size-5 mr-1" /> View Department
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Code2Icon />
              {department.department_name}
            </DialogTitle>
            <DialogDescription>
              Manager: {department.manager_email}
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="users">
            <TabsList>
              <TabsTrigger value="users" className="space-x-2">
                <UsersIcon /> <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="skills" className="space-x-2">
                <BadgePlusIcon /> <span>Skills</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <UsersCard department={department} />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsCard department={department} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
