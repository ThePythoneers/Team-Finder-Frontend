import { CREATE_DEPARTMENT, wait } from "./URL";

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
  const response = await fetch(`${CREATE_DEPARTMENT}`, {
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
