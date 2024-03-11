import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllEmployeesPage } from "./components/allEmployees";
import { AuthUser } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { UnassignedEmployeesPage } from "./components/unassignedEmployees";
import { AssignedEmployeesPage } from "./components/assignedEmployees";

export function EmployeesPage() {
  const auth: AuthUser | null = useAuthUser();
  return (
    <>
      <main className="container mx-auto py-4">
        <Tabs defaultValue="all" className="mx-auto">
          <TabsList className="lg:h-auto flex">
            <TabsTrigger value="all" className="w-full lg:text-lg">
              All Employees
            </TabsTrigger>
            {auth?.roles.includes("Department Manager") && (
              <>
                <TabsTrigger value="unassigned" className="w-full lg:text-lg">
                  Assign Employees
                </TabsTrigger>
                <TabsTrigger value="assigned" className="w-full lg:text-lg">
                  Current Employees
                </TabsTrigger>
              </>
            )}
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
        </Tabs>
      </main>
    </>
  );
}
