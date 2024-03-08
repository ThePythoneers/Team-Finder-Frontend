import {
  DELETE_ASSIGN_DEPARTMENT_MANAGER,
  DELETE_GET_CREATE_DEPARTMENT,
  GET_DEPARTMENTS,
  wait,
} from "./URL";

export const getDepartments = async (token: string | null) => {
  wait();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const response = await fetch(`${GET_DEPARTMENTS}`, {
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

type createDepartmentParams = {
  newDepartment: string;
  token: string | null;
};

export const createDepartment = async ({
  newDepartment,
  token,
}: createDepartmentParams) => {
  wait();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const body = {
    department_name: newDepartment,
  };
  const response = await fetch(`${DELETE_GET_CREATE_DEPARTMENT}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};

type deleteDepartmentParams = {
  department_id: string;
  token: string | null;
};
export const deleteDepartment = async ({
  token,
  department_id,
}: deleteDepartmentParams) => {
  wait();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const body = { department_id };
  const response = await fetch(`${DELETE_GET_CREATE_DEPARTMENT}`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
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
  wait();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const body = { department_id, manager_id };
  const response = await fetch(`${DELETE_ASSIGN_DEPARTMENT_MANAGER}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};

type removeDepartmentManagerParams = {
  token: string | null;
  department_id: string;
};
export const removeDepartmentManager = async ({
  token,
  department_id,
}: removeDepartmentManagerParams) => {
  wait();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const body = { department_id };
  const response = await fetch(`${DELETE_ASSIGN_DEPARTMENT_MANAGER}`, {
    method: "DELETE",
    headers: headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};
