export type AuthUser = {
  user_id: string;
  username: string;
  email: string;
  organization: string;
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
  department_name: string;
  id: string;
  created_at: Date;
  department_manager?: string;
  organization_id: string;
}