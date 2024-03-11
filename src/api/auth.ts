import { toast } from "sonner";
import {
  GET_ORGANIZATION_BASED_REF,
  GET_USER,
  LOGIN_BY_TOKEN,
  LOGIN,
  REGISTER_ADMIN,
  REGISTER_EMPLOYEE,
  GET_POST_DELETE_ASSIGN_SKILL_USER,
} from "./URL";
import { checkError, getAuthHeaders } from "./utils";
import { Token } from "@/types";

type registerAdminBody = {
  username: string;
  email: string;
  password: string;
  organization_name: string;
  hq_address: string;
};

export const registerAdminUser = async (body: registerAdminBody) => {
  try {
    const response = await fetch(REGISTER_ADMIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You registered with succes");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const checkOrganizationInvite = async (link_ref: string | undefined) => {
  try {
    const response = await fetch(`${GET_ORGANIZATION_BASED_REF}/${link_ref}`);
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type registerEmployeeBody = {
  username: string;
  email: string;
  password: string;
  link_ref: string | undefined;
};
export const registerEmployee = async (values: registerEmployeeBody) => {
  try {
    const body = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    const response = await fetch(`${REGISTER_EMPLOYEE}/${values.link_ref}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You registered with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type loginBody = {
  email: string;
  password: string;
};

export const signInUser = async (body: loginBody) => {
  try {
    const response = await fetch(LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=password&clientId=my-trusted-client&username=${body.email}&password=${body.password}&scope=user_info`,
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You signed in with succes!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type getUserInfoParams = {
  token: Token;
  user: string | undefined;
};

export const getUserInfo = async ({ token, user }: getUserInfoParams) => {
  try {
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
  } catch (error) {
    checkError(error);
  }
};

type assignSkillMeParams = {
  token: Token;
  user_id: string | undefined;
  skill_id: string;
  level: number;
  experience: number;
};

export const assignSkillMe = async ({
  token,
  user_id,
  skill_id,
  level,
  experience,
}: assignSkillMeParams) => {
  try {
    const body = { user_id, skill_id, level, experience };
    const headers = getAuthHeaders(token);
    const response = await fetch(`${GET_POST_DELETE_ASSIGN_SKILL_USER}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You assigned a new skill to yourself with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const getUserInfoByToken = async (token: Token) => {
  try {
    const response = await fetch(`${LOGIN_BY_TOKEN}/${token?.slice(7)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
