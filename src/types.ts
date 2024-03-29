export type Token = string | null;

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  organization_id: string;
  organization_name: string;
  roles: string[];
  department_id: string;
  skills: { skill_id: string }[];
};

export type Department = {
  id: string;
  department_name: string;
  department_manager: string;
  manager_email: string;
  department_users: string[];
  skills: string[];
};
export type viewDepartment = {
  id: string;
  department_name: string;
  department_manager: string;
  manager_email: string;
  department_users: string[];
  skills: {
    skill_name: string;
    skill_description: string;
    skill_category: string[];
  }[];
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
  departments: string[];
};

export type userSkill = {
  id?: string;
  user_id?: string;
  skill_id: string;
  skill_name: string;
  skill_category: string[];
  skill_level: number;
  skill_experience: number;
  training_title?: string;
  training_description?: string;
  project_link?: string;
  verified: boolean;
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
  project_roles: { id: string; role_name: string }[];
  technology_stack: {
    id: string;
    technology_name: string;
    tech_name?: string;
  }[];
  project_manager?: string;
  deallocated_users: { id: string; username: string; email: string }[];
  proposed_users: { id: string; username: string; email: string }[];
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
  username: string;
  department_id: string;
  email: string;
  organization_id: string;
  work_hours: number;
  primary_roles: string[];
};

export type Proposal = {
  proposal_id: string;
  project_id: string;
  user_id: string;
  comments: string;
  work_hours: number;
  proposed_roles: string[];
};

export type findResponseData = {
  id: string;
  username: string;
  email: string;
  department_id: string;
  method: string[];
  organization_id: string;
  projects?: string[];
  primary_roles: string[];
  work_hours: number;
};

export type Notif = {
  id: string;
  type: string;
};
