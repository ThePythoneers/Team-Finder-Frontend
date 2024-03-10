export type Token = string | null;

export type AuthUser = {
  id: string;
  username: string;
  email: string;
  organization_id: string;
  organization_name: string;
  roles: string[];
};

export type User = {
  id: string;
  username: string;
  email: string;
  primary_roles: string[];
};

export type Department = {
  id: string;
  department_name: string;
  department_manager?: string;
  organization_id: string;
  created_at: Date;
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
