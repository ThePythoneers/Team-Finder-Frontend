import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GanttChartSquareIcon } from "lucide-react";

export function DepartmentsCard() {
  return (
    <>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Departments
          </CardTitle>
          <GanttChartSquareIcon />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">30</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
    </>
  );
}
