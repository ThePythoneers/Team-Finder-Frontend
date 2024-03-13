import { Token } from "@/types";
import {
  REMOVE_ASSIGN_USER_TO_DEPARTMENT,
  DELETE_ASSIGN_DEPARTMENT_MANAGER,
  DELETE_GET_CREATE_DEPARTMENT,
  GET_ASSIGNED_EMPLOYEES,
  GET_DEPARTMENTS,
  GET_UNASSIGNED_EMPLOYEES,
} from "./URL";
import { checkError, getAuthHeaders } from "./utils";
import { toast } from "sonner";

export const getDepartments = async (token: Token) => {
  try {
    const response = await fetch(`${GET_DEPARTMENTS}`, {
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

type createDepartmentParams = {
  newDepartment: string;
  token: Token;
};

export const createDepartment = async ({
  newDepartment,
  token,
}: createDepartmentParams) => {
  try {
    const body = {
      department_name: newDepartment,
    };
    const response = await fetch(`${DELETE_GET_CREATE_DEPARTMENT}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You created a new department with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type deleteDepartmentParams = {
  department_id: string;
  token: string | null;
};
export const deleteDepartment = async ({
  token,
  department_id,
}: deleteDepartmentParams) => {
  try {
    const body = { department_id };
    const response = await fetch(`${DELETE_GET_CREATE_DEPARTMENT}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You deleted a department with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type assignDepartmentManagerParams = {
  token: string | null;
  department_id: string;
  manager_id: string;
};
export const assignDepartmentManager = async ({
  token,
  department_id,
  manager_id,
}: assignDepartmentManagerParams) => {
  try {
    const body = { department_id, manager_id };
    const response = await fetch(`${DELETE_ASSIGN_DEPARTMENT_MANAGER}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You assigned a new department manager with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type removeDepartmentManagerParams = {
  token: string | null;
  department_id: string;
};
export const removeDepartmentManager = async ({
  token,
  department_id,
}: removeDepartmentManagerParams) => {
  try {
    const body = { department_id };
    const response = await fetch(`${DELETE_ASSIGN_DEPARTMENT_MANAGER}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
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

export const getUnassignedEmployees = async (token: string | null) => {
  try {
    const response = await fetch(`${GET_UNASSIGNED_EMPLOYEES}`, {
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
export const getAssignedEmployees = async (token: string | null) => {
  try {
    const response = await fetch(`${GET_ASSIGNED_EMPLOYEES}`, {
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

type assignUserToDepartmentParams = {
  token: Token;
  user_id: string;
};

export const assignUserToDepartment = async ({
  token,
  user_id,
}: assignUserToDepartmentParams) => {
  try {
    const body = { user_id };
    const response = await fetch(`${REMOVE_ASSIGN_USER_TO_DEPARTMENT}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You assigned a user to a department with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const removeUserFromDepartment = async ({
  token,
  user_id,
}: assignUserToDepartmentParams) => {
  try {
    const body = { user_id };
    const response = await fetch(`${REMOVE_ASSIGN_USER_TO_DEPARTMENT}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You assigned a user to a department with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type getDepartmentEmployeesParams = {
  token: string | null;
  department_id: string | undefined;
};

export const getDepartmentEmployees = async ({
  token,
  department_id,
}: getDepartmentEmployeesParams) => {
  try {
    const response = await fetch(`${GET_ASSIGNED_EMPLOYEES}/${department_id}`, {
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

export const getDepartmentInfo = async ({
  token,
  department_id,
}: getDepartmentEmployeesParams) => {
  try {
    const response = await fetch(
      `${DELETE_GET_CREATE_DEPARTMENT}?_id=${department_id}`,
      {
        method: "GET",
        headers: getAuthHeaders(token),
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
