import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Employee } from "@/types";
import { UserIcon } from "lucide-react";
import { RoleBadges } from "./roleBadges";

type Props = {
  user: Employee;
};

export function ViewEmployeeDialog({ user }: Props) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UserIcon className="size-5 mr-1" /> View Employee
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">{user.username}</DialogTitle>
            <DialogDescription>{user.email}</DialogDescription>
          </DialogHeader>
          <RoleBadges roles={user.primary_roles} />
        </DialogContent>
      </Dialog>
    </>
  );
}
