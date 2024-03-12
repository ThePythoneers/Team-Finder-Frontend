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
