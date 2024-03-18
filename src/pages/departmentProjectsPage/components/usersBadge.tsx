import { Badge } from "@/components/ui/badge";

type Props = {
  users: { id: string; username: string }[];
};

export function UsersBadge({ users }: Props) {
  return (
    <>
      <div className="flex items-center gap-1 flex-wrap">
        {users &&
          users.map &&
          users.map((user) => <Badge>{user.username}</Badge>)}
      </div>
    </>
  );
}
