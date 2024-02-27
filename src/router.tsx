import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/homePage";
import { ThemeProvider } from "./components/providers/themeProvider";
import { RegisterEmployeePage } from "./pages/registerEmployee";
import { OrganizationPage } from "./pages/organizationPage";
//import RequireAuth from '@auth-kit/react-router/RequireAuth'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/2",
    element: <RegisterEmployeePage />,
  },
  {
    path: "/3",
    element: <OrganizationPage />,
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
