import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon } from "lucide-react";

export function EmployeesCard() {
  return (
    <>
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <UsersIcon />
        </CardHeader>
        <CardContent>
          <h3 className="text-2xl font-bold">100 Employees</h3>
        </CardContent>
      </Card>
    </>
  );
}
