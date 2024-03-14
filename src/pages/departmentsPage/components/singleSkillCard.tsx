import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skill } from "@/types";

type Props = {
  user: Skill;
};
export function SingleUserCard({ skill }: Props) {
  return (
    <>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex items-center gap-2 py-2 px-4">
          <Avatar>
            <AvatarFallback>
              {skill.username.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4>{skill.username}</h4>
            <h5 className="text-sm text-muted-foreground">{skill.email}</h5>
          </div>
        </div>
      </Card>
    </>
  );
}
