import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlbumIcon } from "lucide-react";

export function SkillsCard() {
  return (
    <>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
          <AlbumIcon />
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold">30</h3>
        </CardContent>
      </Card>
    </>
  );
}
