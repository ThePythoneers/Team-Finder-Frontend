import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AuthUser } from "@/types";

type Props = {
  user: AuthUser;
};
export function SingleUserCard({ user }: Props) {
  return (
    <>
      <div className="flex items-center gap-2 p-1 hover:bg-secondary/50 rounded transition-all">
        <Avatar>
          <AvatarFallback>{user.username.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h4>{user.username}</h4>
          <h5 className="text-sm text-muted-foreground">{user.email}</h5>
        </div>
      </div>
    </>
  );
}
