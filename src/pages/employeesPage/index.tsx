import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { UnassignedEmployeesPage } from "./components/assignEmployees";

export function EmployeesPage() {
  return (
    <>
      <main className="container mx-auto py-4">
        <Tabs defaultValue="unassigned">
          <TabsList className="w-full lg:h-auto">
            <TabsTrigger value="unassigned" className="w-full lg:text-lg">
              Assign Employees
            </TabsTrigger>
            <TabsTrigger value="assigned" className="w-full lg:text-lg">
              Current Employees
            </TabsTrigger>
          </TabsList>
          <TabsContent value="unassigned">
            <UnassignedEmployeesPage />
          </TabsContent>
          <TabsContent value="assigned">
            {/* <UnassignedEmployeesPage /> */}
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
