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
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/user";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type Props = {
  user: Employee;
};

export function ViewEmployeeDialog({ user }: Props) {
  const token = useAuthHeader();
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo", { user: user.id }],
    // queryFn: () => getUserInfo({ token, user: user.id }),
  });
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
            <section className="flex items-center gap-2">
              <Avatar className="size-12">
                <AvatarFallback>
                  {user.username.at(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{user.username}</DialogTitle>
                <DialogDescription>{user.email}</DialogDescription>
              </div>
            </section>
          </DialogHeader>
          <RoleBadges roles={user.primary_roles} />
        </DialogContent>
      </Dialog>
    </>
  );
}
