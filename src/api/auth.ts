import {
  GET_ORGANIZATION_BASED_REF,
  LOGIN_URL,
  REGISTER_URL_ADMIN,
  REGISTER_URL_EMPLOYEE,
} from "./URL";

type registerAdminBody = {
  username: string;
  email: string;
  password: string;
  organization_name: string;
  hq_address: string;
};

const wait = () => {
  setTimeout(() => console.log("3sec"), 3000);
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

export const checkOrganizationInvite = async (link_ref: string | undefined) => {
  wait();
  const response = await fetch(`${GET_ORGANIZATION_BASED_REF}/${link_ref}`);
  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg);
  }
  return await response.json();
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
    throw new Error(errMsg.detail);
  }
  return await response.json();
};
