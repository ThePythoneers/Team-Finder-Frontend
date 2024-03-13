export type Token = string | null;

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  organization_id: string;
  organization_name: string;
  roles: string[];
  department_id?: string;
};

export type Employee = {
  id: string;
  username: string;
  email: string;
  primary_roles: string[];
};

export type Department = {
  id: string;
  department_name: string;
  department_manager?: string;
  manager_email?: string;
  department_users?: string[];
};

export type SkillCategory = {
  id: string;
  organization_id: string;
  category_name: string;
};

export type Skill = {
  id: string;
  skill_name: string;
  skill_category: string[];
  organization_id: string;
  author: string;
  skill_description: string;
};

export type Project = {
  id: string;
  project_name: string;
  project_period: string;
  start_date: string;
  deadline_date: string;
  project_status: string;
  description: string;
  users: { id: string; username: string }[];
  project_roles: string[];
  technology_stack: string[];
};

export type teamRole = {
  id: string;
  organization_id: string;
  custom_role_name: string;
};
