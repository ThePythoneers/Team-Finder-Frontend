import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllEmployeesPage } from "./components/allEmployees";
import { AuthUser } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { UnassignedEmployeesPage } from "./components/unassignedEmployees";
import { AssignedEmployeesPage } from "./components/assignedEmployees";
import { Button } from "@/components/ui/button";

export function EmployeesPage() {
  const auth: AuthUser | null = useAuthUser();
  return (
    <>
      <main className="container mx-auto py-4">
        <Tabs defaultValue="all" className="mx-auto">
          <>
            <TabsList className="lg:h-auto flex">
              <TabsTrigger value="all" className="w-full lg:text-lg" asChild>
                {auth?.roles.includes("Organization Admin") && (
                  <Button variant="ghost"> All Employees</Button>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="unassigned"
                className="w-full lg:text-lg"
                asChild
              >
                {auth?.roles.includes("Department Manager") && (
                  <Button variant="ghost">Assign Employees</Button>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="assigned"
                className="w-full lg:text-lg"
                asChild
              >
                {auth?.roles.includes("Department Manager") && (
                  <Button variant="ghost">Current Employees</Button>
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <AllEmployeesPage />
            </TabsContent>
            <TabsContent value="unassigned">
              <UnassignedEmployeesPage />
            </TabsContent>
            <TabsContent value="assigned">
              <AssignedEmployeesPage />
            </TabsContent>
          </>
        </Tabs>
      </main>
    </>
  );
}
