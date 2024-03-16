export type Token = string | null;

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  organization_id: string;
  organization_name: string;
  roles: string[];
  department_id?: string;
  skills?: string;
};

export type Department = {
  id: string;
  department_name: string;
  department_manager: string;
  manager_email: string;
  department_users: string[];
  skills: string[];
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

export type userSkill = {
  skill_id: string;
  skill_name: string;
  skill_category: string[];
  skill_level: number;
  skill_experience: number;
  training_title?: string;
  training_description?: string;
  project_link?: string;
};

export type Project = {
  project_id?: string;
  id: string;
  project_name: string;
  project_period: "Fixed" | "Ongoing";
  start_date: Date;
  deadline_date: Date;
  project_status:
    | "Not Started"
    | "Starting"
    | "In Progress"
    | "Closing"
    | "Closed";
  description: string;
  users: { id: string; username: string; email: string }[];
  project_roles: { id: string; custom_role_name: string }[];
  technology_stack: { id: string; technology_name: string }[];
  project_manager?: string;
};

export type teamRole = {
  id: string;
  organization_id?: string;
  custom_role_name: string;
};
export type Tech = {
  id: string;
  technology_name: string;
};

export type Employee = {
  id: string;
  department_id?: string;
  username: string;
  email: string;
  organization_id: string;
  work_hours: number;
};
