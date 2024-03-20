import { DepartmentsCard } from "./components/departmentsCard";
import { EmployeesCard } from "./components/employeesCard";
import { ProjectsCard } from "./components/projectsCard";
import { SkillsCard } from "./components/skillsCard";

export function OrganizationDashboard() {
  return (
    <>
      <main className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row gap-2">
          <EmployeesCard />
          <ProjectsCard />
          <DepartmentsCard />
          <SkillsCard />
        </div>
      </main>
    </>
  );
}
