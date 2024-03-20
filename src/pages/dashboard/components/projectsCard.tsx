import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderGit2Icon } from "lucide-react";

export function ProjectsCard() {
  return (
    <>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <FolderGit2Icon />
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold">15</h3>
        </CardContent>
      </Card>
    </>
  );
}
