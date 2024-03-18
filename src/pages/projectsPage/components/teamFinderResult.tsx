import { Project, findResponseData } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeList } from "./employeeList";

type Props = {
  responseData: findResponseData[];
  project: Project;
};

export function TeamFinderResult({ responseData, project }: Props) {
  console.log("🚀 ~ TeamFinderResult ~ responseData:", responseData);
  return (
    <>
      {responseData && responseData.length < 1 && <div>No employees</div>}
      {responseData && responseData.length > 0 && (
        <>
          <Tabs defaultValue="available">
            <TabsList>
              <TabsTrigger value="available">Available</TabsTrigger>
              <TabsTrigger value="unavailable">Unavailable</TabsTrigger>
              <TabsTrigger value="close_to_finish">Close to Finish</TabsTrigger>
              <TabsTrigger value="partially_available">
                Partially Available
              </TabsTrigger>
            </TabsList>
            <TabsContent value="available">
              <EmployeeList
                users={responseData}
                project={project}
                type="available"
              />
            </TabsContent>
            <TabsContent value="unavailable">
              <EmployeeList
                users={responseData}
                project={project}
                type="unavailable"
              />
            </TabsContent>
            <TabsContent value="close_to_finish">
              <EmployeeList
                users={responseData}
                project={project}
                type="close_to_finish"
              />
            </TabsContent>
            <TabsContent value="partially_available">
              <EmployeeList
                users={responseData}
                project={project}
                type="partially_available"
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );
}
