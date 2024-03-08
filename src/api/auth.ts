import {
  GET_ORGANIZATION_BASED_REF,
  GET_USER,
  LOGIN_URL,
  REGISTER_URL_ADMIN,
  REGISTER_URL_EMPLOYEE,
  wait,
} from "./URL";

type registerAdminBody = {
  username: string;
  email: string;
  password: string;
  organization_name: string;
  hq_address: string;
};

export const registerAdminUser = async (body: registerAdminBody) => {
  wait();
  const response = await fetch(REGISTER_URL_ADMIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};

export const checkOrganizationInvite = async (link_ref: string | undefined) => {
  wait();
  const response = await fetch(`${GET_ORGANIZATION_BASED_REF}/${link_ref}`);
  console.log(response);
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};
type registerEmployeeBody = {
  username: string;
  email: string;
  password: string;
  link_ref: string | undefined;
};
export const registerEmployee = async (values: registerEmployeeBody) => {
  wait();
  const body = {
    username: values.username,
    email: values.email,
    password: values.password,
  };
  const response = await fetch(`${REGISTER_URL_EMPLOYEE}/${values.link_ref}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};

type loginBody = {
  email: string;
  password: string;
};

export const signInUser = async (body: loginBody) => {
  wait();
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=password&clientId=my-trusted-client&username=${body.email}&password=${body.password}&scope=user_info`,
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};

type getUserInfoParams = {
  token: string | null;
  user: string | undefined;
};

export const getUserInfo = async ({ token, user }: getUserInfoParams) => {
  wait();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const response = await fetch(`${GET_USER}/${user}`, {
    method: "GET",
    headers: headers,
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};
