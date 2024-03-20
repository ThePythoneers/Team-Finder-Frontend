import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { ThemeProvider } from "./components/providers/themeProvider";
import { RegisterEmployeePage } from "./pages/registerEmployee";
import { OrganizationPage } from "./pages/organizationPage";
import { Toaster } from "./components/ui/sonner";
import { SignInPage } from "./pages/signInPage";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import { NotFoundPage } from "./pages/homePage/components/NotFoundPage";
import { DepartmentsPage } from "./pages/departmentsPage";
import { SkillsPage } from "./pages/skillsPage";
import { EmployeesPage } from "./pages/employeesPage/index";
import { ProjectsPage } from "./pages/projectsPage";
import { AllEmployeesPage } from "./pages/employeesPage/components/allEmployees";
import { UnassignedEmployeesPage } from "./pages/employeesPage/components/unassignedEmployees";
import { AssignedEmployeesPage } from "./pages/employeesPage/components/assignedEmployees";
import { ProfilePage } from "./pages/profilePage";
import { ProposalsPage } from "./pages/proposalsPage/index.tsx";
import { ValidateSkillsPage } from "./pages/validateSkills/index.tsx";
import { DepartmentProjects } from "./pages/departmentProjectsPage/index.tsx";
import { OrganizationDashboard } from "./pages/dashboard/index.tsx";
import { RolesPage } from "./pages/roles/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/authentication/signIn",
    element: <SignInPage />,
  },
  {
    path: "/invite/:organization_invite_id",
    element: <RegisterEmployeePage />,
  },
  {
    path: "/:organization_name",
    element: (
      <RequireAuth fallbackPath="/">
        <OrganizationPage />
      </RequireAuth>
    ),
    children: [
      {
        path: "/:organization_name/employees",
        element: <EmployeesPage />,
        children: [
          {
            path: "/:organization_name/employees/all",
            element: <AllEmployeesPage />,
          },
          {
            path: "/:organization_name/employees/unassigned",
            element: <UnassignedEmployeesPage />,
          },
          {
            path: "/:organization_name/employees/assigned",
            element: <AssignedEmployeesPage />,
          },
          {
            path: "/:organization_name/employees/validate",
            element: <ValidateSkillsPage />,
          },
          {
            path: "/:organization_name/employees/departmentProjects",
            element: <DepartmentProjects />,
          },
        ],
      },
      {
        path: "/:organization_name/departments",
        element: <DepartmentsPage />,
      },
      {
        path: "/:organization_name/skills",
        element: <SkillsPage />,
      },
      {
        path: "/:organization_name/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/:organization_name/profile",
        element: <ProfilePage />,
      },
      {
        path: "/:organization_name/proposals",
        element: <ProposalsPage />,
      },
      {
        path: "/:organization_name/dashboard",
        element: <OrganizationDashboard />,
      },
      {
        path: "/:organization_name/roles",
        element: <RolesPage />,
      },
    ],
  },
]);

export function Router() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
