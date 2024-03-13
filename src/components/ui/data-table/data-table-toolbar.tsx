"use client";

import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

import { EmployeesToolbar } from "@/pages/employeesPage/components/employees-toolbar";
import { DepartmentsToolbar } from "@/pages/departmentsPage/components/departments-toolbar";
import { SkillsToolbar } from "@/pages/skillsPage/components/skills-toolbar";
import { ProjectsToolbar } from "@/pages/projectsPage/components/projects-toolbar";
import { TeamRolesToolbar } from "@/pages/teamRolesPage.tsx/components/teamRoles-toolbar";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  type?: "employee" | "department" | "skill" | "project" | "roles";
}

export function DataTableToolbar<TData>({
  table,
  type,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      {type === "employee" && <EmployeesToolbar table={table} />}
      {type === "department" && <DepartmentsToolbar table={table} />}
      {type === "skill" && <SkillsToolbar table={table} />}
      {type === "project" && <ProjectsToolbar table={table} />}
      {type === "roles" && <TeamRolesToolbar table={table} />}
      <DataTableViewOptions table={table} />
    </div>
  );
}
