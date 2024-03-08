export type AuthUser = {
  user_id: string;
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
