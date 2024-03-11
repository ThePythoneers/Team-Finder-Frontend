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
import { Employee } from "@/types";
import { UserIcon } from "lucide-react";

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
          {user.primary_roles.length > 0 && (
            <div className="flex flex-wrap gap-1 items-center py-2 px-4 mb-2 rounded-md border border-border border-dashed">
              {user.primary_roles.map((role) => (
                <Badge key={crypto.randomUUID()} variant="secondary">
                  {role}
                </Badge>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
