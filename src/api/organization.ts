import { Token } from "@/types";
import {
  ASSIGN_PRIMARY_ROLE,
  GET_ORGANIZATION_BASED_ID,
  GET_ORGANIZATION_EMPLOYEES,
  REFRESH_ORGANIZATION_INVITE_LINK,
  REMOVE_PRIMARY_ROLE,
} from "./URL";
import { checkError, getAuthHeaders } from "./utils";
import { toast } from "sonner";

export const getEmployees = async (token: Token) => {
  try {
    const headers = getAuthHeaders(token);

    const response = await fetch(`${GET_ORGANIZATION_EMPLOYEES}`, {
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

export const refreshInviteLink = async (token: Token) => {
  try {
    const headers = getAuthHeaders(token);
    const response = await fetch(`${REFRESH_ORGANIZATION_INVITE_LINK}`, {
      method: "PUT",
      headers: headers,
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You generated a new invite link");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type getOrganizationParams = {
  token: Token;
  organization_id: string | undefined;
};

export const getOrganization = async ({
  token,
  organization_id,
}: getOrganizationParams) => {
  try {
    const headers = getAuthHeaders(token);
    const response = await fetch(
      `${GET_ORGANIZATION_BASED_ID}?org=${organization_id}`,
      {
        method: "GET",
        headers: headers,
      }
    );
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

type primaryRoleParams = {
  token: Token;
  user_id: string;
  role_name: string;
};

export const addPrimaryRole = async ({
  token,
  user_id,
  role_name,
}: primaryRoleParams) => {
  try {
    const body = {
      user_id,
      role_name,
    };
    const headers = getAuthHeaders(token);

    const response = await fetch(`${ASSIGN_PRIMARY_ROLE}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You added the role with succes!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const removePrimaryRole = async ({
  token,
  user_id,
  role_name,
}: primaryRoleParams) => {
  try {
    const body = {
      user_id,
      role_name,
    };
    const headers = getAuthHeaders(token);

    const response = await fetch(`${REMOVE_PRIMARY_ROLE}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You removed a role with succes!");

    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
