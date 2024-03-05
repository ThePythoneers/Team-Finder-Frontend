import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { ThemeProvider } from "./components/providers/themeProvider";
import { RegisterEmployeePage } from "./pages/registerEmployee";
import { OrganizationPage } from "./pages/organizationPage";
import { EmployeesPage } from "./pages/employeesPage";
//import RequireAuth from '@auth-kit/react-router/RequireAuth'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "invite/:organization_invite_id",
    element: <RegisterEmployeePage />,
  },
  {
    path: "/org",
    element: <OrganizationPage />,
    children: [
      {
        path: "/org/employees",
        element: <EmployeesPage />,
      },
    ],
  },
]);

export function Router() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}
