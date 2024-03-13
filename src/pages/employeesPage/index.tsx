import { AuthUser } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router-dom";
import { Contact2Icon, UserCogIcon, UserPlusIcon } from "lucide-react";
import { useEmployeesPageRedirect } from "@/hooks/useEmployeesPageRedirect";

export function EmployeesPage() {
  useEmployeesPageRedirect();
  const auth: AuthUser | null = useAuthUser();

  return (
    <>
      <main className="flex gap-10 mt-10">
        <aside className="mt-10 pl-5 hidden lg:block">
          <ul className="flex flex-col gap-2 w-full">
            {auth?.roles?.includes("Organization Admin") && (
              <>
                <NavLink
                  to={`/${auth?.organization_name}/employees/all`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "outline" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <Contact2Icon className="mr-2" /> All Employees
                      </Button>
                    );
                  }}
                </NavLink>
                <NavLink
                  to={`/${auth?.organization_name}/employees/roles`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "outline" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <Contact2Icon className="mr-2" /> Roles
                      </Button>
                    );
                  }}
                </NavLink>
              </>
            )}
            {auth?.department_id && (
              <>
                <NavLink
                  to={`/${auth?.organization_name}/employees/unassigned`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "outline" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <UserPlusIcon className="mr-2" /> Assign Employees
                      </Button>
                    );
                  }}
                </NavLink>
                <NavLink
                  to={`/${auth?.organization_name}/employees/assigned`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "outline" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <UserCogIcon className="mr-2" /> Current Members
                      </Button>
                    );
                  }}
                </NavLink>
              </>
            )}
          </ul>
        </aside>
        <section className="sm:container lg:w-[69%] lg:mx-0 lg:p-0">
          <Outlet />
          {/* <AllEmployeesPage />

          <UnassignedEmployeesPage /> */}

          {/* <AssignedEmployeesPage /> */}
        </section>
      </main>
    </>
  );
}
