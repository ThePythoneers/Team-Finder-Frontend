import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllocationPage } from "./components/allocationPage";

export function ProposalsPage() {
  return (
    <>
      <main className="container mx-auto py-4">
        <Tabs defaultValue="allocation">
          <TabsList>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="deallocation">DeAllocation</TabsTrigger>
          </TabsList>
          <TabsContent value="allocation">
            {/* <DataTable columns={columns} data={projectsData} type="project" /> */}
            <AllocationPage />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
