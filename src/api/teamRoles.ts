import { Token } from "@/types";
import { CREATE_GET_ALL_CUSTOM_ROLES } from "./URL";
import { checkError, getAuthHeaders } from "./utils";
import { toast } from "sonner";

export const getAllTeamRoles = async (token: Token) => {
  try {
    const response = await fetch(`${CREATE_GET_ALL_CUSTOM_ROLES}`, {
      method: "GET",
      headers: getAuthHeaders(token),
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

type deleteTeamRoleParams = {
  token: Token;
  _id: string;
};

export const deleteTeamRole = async ({ token, _id }: deleteTeamRoleParams) => {
  try {
    const response = await fetch(`${CREATE_GET_ALL_CUSTOM_ROLES}?_id=${_id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You deleted a role with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type createTeamRoleParams = {
  token: Token;
  role_name: string;
};

export const createTeamRole = async ({
  token,
  role_name,
}: createTeamRoleParams) => {
  try {
    const body = { role_name };
    const response = await fetch(`${CREATE_GET_ALL_CUSTOM_ROLES}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You created a new team role with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type updateTeamRoleParams = {
  token: Token;
  role_id: string;
  role_name: string;
};

export const updateTeamRole = async ({
  token,
  role_id,
  role_name,
}: updateTeamRoleParams) => {
  try {
    const response = await fetch(`${CREATE_GET_ALL_CUSTOM_ROLES}`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ role_id, role_name }),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You edited a team role with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
