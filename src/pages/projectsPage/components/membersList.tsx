import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/types";

type Props = {
  project: Project;
};

export function MembersList({ project }) {
  return (
    <>
      <Card>
        <CardContent className="py-2 space-y-4">
          <div className="flex items-center gap-2 hover:bg-secondary/60 transition-all rounded p-1">
            <Avatar className="size-12">
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg">seby.danyel@gmail.com</h4>
              <Badge variant="outline">UI/UX Design</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 hover:bg-secondary/60 transition-all rounded p-1">
            <Avatar className="size-12">
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-lg">seby.danyel@gmail.com</h4>
              <Badge variant="outline">UI/UX Design</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
