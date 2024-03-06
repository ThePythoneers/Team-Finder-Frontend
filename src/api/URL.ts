const BASE_URL = "http://localhost:8000";

export const serverErrorMsg =
  "Server is down at the moment please try again later!";

export const LOGIN_URL = `${BASE_URL}/auth/token`;
export const REGISTER_URL_ADMIN = `${BASE_URL}/auth/register/organization`;
export const REGISTER_URL_EMPLOYEE = `${BASE_URL}/auth/employee`;

export const GET_ORGANIZATION_BASED_REF = `${BASE_URL}/organization/get/link`;
