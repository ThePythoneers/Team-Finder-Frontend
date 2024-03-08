import {
  ASSIGN_PRIMARY_ROLE,
  GET_ORGANIZATION_BASED_ID,
  GET_ORGANIZATION_EMPLOYEES,
  REFRESH_ORGANIZATION_INVITE_LINK,
  REMOVE_PRIMARY_ROLE,
  wait,
} from "./URL";

export const fetchEmployeesData = async (token: string | null) => {
  wait();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

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
};

export const refreshInviteLink = async (token: string | null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
  const response = await fetch(`${REFRESH_ORGANIZATION_INVITE_LINK}`, {
    method: "PUT",
    headers: headers,
  });
  if (!response.ok) {
    const errMsg = await response.json();
    if (errMsg.detail) throw new Error(errMsg.detail);
    throw new Error(errMsg);
  }
  return await response.json();
};

type getOrganizationParams = {
  token: string | null;
  organization_id: string | undefined;
};

export const getOrganization = async ({
  token,
  organization_id,
}: getOrganizationParams) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
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
};

type test = {
  accessToken: string | null;
  user_id: string;
  role_name: string;
};

export const addPrimaryRole = async ({
  accessToken,
  user_id,
  role_name,
}: test) => {
  wait();
  const body = {
    user_id,
    role_name,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${accessToken}`,
  };

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
  return await response.json();
};

export const removePrimaryRole = async ({
  accessToken,
  user_id,
  role_name,
}: test) => {
  wait();
  const body = {
    user_id,
    role_name,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `${accessToken}`,
  };

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
  return await response.json();
};
