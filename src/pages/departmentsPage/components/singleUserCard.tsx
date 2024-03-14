import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { AuthUser } from "@/types";

type Props = {
  user: AuthUser;
};
export function SingleUserCard({ user }: Props) {
  return (
    <>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {user.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{user.username}</h4>
            <h5 className="text-sm text-muted-foreground">{user.email}</h5>
          </div>
        </div>
      </Card>
    </>
  );
}
