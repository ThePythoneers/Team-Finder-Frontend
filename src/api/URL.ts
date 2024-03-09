const BASE_URL = "http://localhost:8000";

// AUTHENTICATION
export const LOGIN_URL = `${BASE_URL}/auth/token`;
export const REGISTER_URL_ADMIN = `${BASE_URL}/auth/register/organization`;
export const REGISTER_URL_EMPLOYEE = `${BASE_URL}/auth/employee`;
export const GET_USER_INFO_BY_TOKEN = `${BASE_URL}/auth/token-info`;

export const GET_USER = `${BASE_URL}/user/get`;

// ORGANIZATION
export const GET_ORGANIZATION_BASED_REF = `${BASE_URL}/organization/link`;
export const GET_ORGANIZATION_BASED_ID = `${BASE_URL}/organization/`;
export const GET_ORGANIZATION_EMPLOYEES = `${BASE_URL}/organization/employees`;
export const REFRESH_ORGANIZATION_INVITE_LINK = `${BASE_URL}/organization/ref/refresh`;

export const ASSIGN_PRIMARY_ROLE = `${BASE_URL}/roles/assign`;
export const REMOVE_PRIMARY_ROLE = `${BASE_URL}/roles/remove`;

export const DELETE_GET_CREATE_DEPARTMENT = `${BASE_URL}/department/`;
export const GET_DEPARTMENTS = `${BASE_URL}/departments`;
export const DELETE_ASSIGN_DEPARTMENT_MANAGER = `${BASE_URL}/department/manager/`;
export const GET_UNASSIGNED_EMPLOYEES = `${BASE_URL}/department/unassigned/`;
export const GET_ASSIGNED_EMPLOYEES = `${BASE_URL}/department/users`;
export const ASSIGN_USER_TO_DEPARTMENT = `${BASE_URL}/department/user`;

export const CREATE_NEW_SKILL_CATEGORY = `${BASE_URL}/skill/category`;
