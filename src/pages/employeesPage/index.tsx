import { AuthUser } from "@/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router-dom";
import {
  BookmarkIcon,
  Contact2Icon,
  CpuIcon,
  UserCogIcon,
  UserPlusIcon,
} from "lucide-react";
import { useEmployeesPageRedirect } from "@/hooks/useEmployeesPageRedirect";

export function EmployeesPage() {
  useEmployeesPageRedirect();
  const auth: AuthUser | null = useAuthUser();

  return (
    <>
      <main className="flex gap-10 lg:mt-10 flex-col lg:flex-row">
        <aside className="mt-5 pl-5 lg:block">
          <ul className="flex lg:flex-col flex-wrap gap-2 w-full">
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
                  to={`/${auth?.organization_name}/employees/teamroles`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "outline" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <BookmarkIcon className="mr-2" /> Team Roles
                      </Button>
                    );
                  }}
                </NavLink>
                <NavLink
                  to={`/${auth?.organization_name}/employees/technologies`}
                  className="flex items-center"
                >
                  {({ isActive }) => {
                    return (
                      <Button
                        variant={isActive ? "outline" : "ghost"}
                        className="w-full text-lg"
                        size="lg"
                      >
                        <CpuIcon className="mr-2" /> Technologies
                      </Button>
                    );
                  }}
                </NavLink>
              </>
            )}
            {auth?.department_id &&
              auth.roles.includes("Department Manager") && (
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

        <section className="container lg:w-[69%] lg:mx-0 lg:p-0 mb-2">
          <Outlet />
        </section>
      </main>
    </>
  );
}
