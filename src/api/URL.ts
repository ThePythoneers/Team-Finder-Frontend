// export const BASE_URL = "http://localhost:8000";
export const BASE_URL = "https://atc-2024-thepythoneers-be-linux-web-app.azurewebsites.net/";

// AUTHENTICATION
export const LOGIN = `${BASE_URL}/auth/token`;
export const REGISTER_ADMIN = `${BASE_URL}/auth/register/organization`;
export const REGISTER_EMPLOYEE = `${BASE_URL}/auth/employee`;
export const LOGIN_BY_TOKEN = `${BASE_URL}/auth/token-info`;

// USER
export const GET_USER = `${BASE_URL}/user/get`;
export const GET_POST_DELETE_ASSIGN_SKILL_USER = `${BASE_URL}/user/skills`;
export const GET_SKILLS_ANY_USER = `${BASE_URL}/user/skills/any`;

// ORGANIZATION
export const GET_ORGANIZATION_BASED_REF = `${BASE_URL}/organization/link`;
export const GET_ORGANIZATION_BASED_ID = `${BASE_URL}/organization/`;
export const GET_ORGANIZATION_EMPLOYEES = `${BASE_URL}/organization/employees`;
export const REFRESH_ORGANIZATION_INVITE_LINK = `${BASE_URL}/organization/ref/refresh`;

// MAIN ROLES
export const ASSIGN_PRIMARY_ROLE = `${BASE_URL}/roles/assign`;
export const REMOVE_PRIMARY_ROLE = `${BASE_URL}/roles/remove`;

// CUSTOM ROLES
export const CREATE_GET_ALL_CUSTOM_ROLES = `${BASE_URL}/roles/custom/`;

// DEPARTMENT
export const DELETE_GET_CREATE_DEPARTMENT = `${BASE_URL}/department/`;
export const GET_DEPARTMENTS = `${BASE_URL}/departments`;
export const DELETE_ASSIGN_DEPARTMENT_MANAGER = `${BASE_URL}/department/manager/`;
export const GET_UNASSIGNED_EMPLOYEES = `${BASE_URL}/department/unassigned/`;
export const GET_ASSIGNED_EMPLOYEES = `${BASE_URL}/department/users/`;
export const REMOVE_ASSIGN_USER_TO_DEPARTMENT = `${BASE_URL}/department/user`;

// SKILLS
export const CREATE_NEW_SKILL_CATEGORY = `${BASE_URL}/skill/category`;
export const GET_SKILL_CATEGORIES = `${BASE_URL}/skill/categories/`;
export const GET_CREATE_DELETE_SKILLS = `${BASE_URL}/skill/`;
export const GET_SKILL_CATEGORY = `${BASE_URL}/skill/category`;

// TECH
export const GET_UPDATE_ALL_TECH = `${BASE_URL}/technology/`;

// PROJECT
export const UPDATE_PROJECT = `${BASE_URL}/project/`;
export const TEAM_FINDER = `${BASE_URL}/project/find`;
export const CREATE_ALLOCATION = `${BASE_URL}/proposal/allocation`;
export const CREATE_DEALLOCATION = `${BASE_URL}/proposal/deallocation`;
export const GET_ALLOCATION_ID = `${BASE_URL}/proposal/allocation/`
