import { Token } from "@/types";
import {
  ADD_ROLE_TO_PROJECT,
  ADD_TECH_PROJECT,
  DEPARTMENT_PROJECTS,
  GET_ACTIVE_PROJECTS,
  GET_INACTIVE_PROJECTS,
  PROJECT_MEMBERS,
  REMOVE_TECH_PROJECT,
  TEAM_FINDER,
  UPDATE_PROJECT,
} from "./URL";
import { checkError, getAuthHeaders } from "./utils";
import { toast } from "sonner";

type createProjectParams = {
  token: Token;
  project_name: string;
  project_period: string;
  start_date: Date;
  deadline_date?: Date;
  project_status: string;
  technologies: string[];
  general_description: string;
  project_roles: string[];
};

export const createProject = async (values: createProjectParams) => {
  try {
    console.log(values);
    const { token, ...body } = values;
    const response = await fetch(`${UPDATE_PROJECT}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You created a new project with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const getUserProjects = async (token: Token) => {
  try {
    const response = await fetch(`${UPDATE_PROJECT}all/`, {
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

type teamFinderParams = {
  token: Token;
  partially_available: boolean;
  close_to_finish: boolean;
  deadline?: number;
  unavailable: boolean;
};

export const teamFinder = async (values: teamFinderParams) => {
  try {
    const { token, ...body } = values;
    const response = await fetch(`${TEAM_FINDER}`, {
      method: "POST",
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

type updateProjectParams = {
  token: Token;
  id: string | undefined;
  project_name: string;
  project_period: string;
  start_date: Date;
  deadline_date?: Date;
  project_status: string;
  description: string;
};

export const updateProject = async (values: updateProjectParams) => {
  try {
    const { token, ...body } = values;
    const response = await fetch(`${UPDATE_PROJECT}`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You updated the project with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type getProjectInfoParams = {
  token: Token;
  id: string | undefined;
};

export const getProjectInfo = async ({ token, id }: getProjectInfoParams) => {
  try {
    const response = await fetch(`${UPDATE_PROJECT}${id}`, {
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

export const getDepartmentProjects = async ({
  token,
  id,
}: getProjectInfoParams) => {
  try {
    const response = await fetch(`${DEPARTMENT_PROJECTS}${id}`, {
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

export const getProjectMembers = async ({
  token,
  id,
}: getProjectInfoParams) => {
  try {
    const response = await fetch(`${PROJECT_MEMBERS}/${id}`, {
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

export const deleteProject = async ({ token, id }: getProjectInfoParams) => {
  try {
    const response = await fetch(`${UPDATE_PROJECT}?_id=${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You deleted a project with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type addRoleToProjectParams = {
  token: Token;
  role_id: string;
  project_id?: string;
};

export const addRoleToProject = async ({
  token,
  role_id,
  project_id,
}: addRoleToProjectParams) => {
  try {
    const response = await fetch(`${ADD_ROLE_TO_PROJECT}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ role_id, project_id }),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You added a new role to your project with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const removeRoleFromProject = async ({
  token,
  role_id,
  project_id,
}: addRoleToProjectParams) => {
  try {
    const response = await fetch(`${ADD_ROLE_TO_PROJECT}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ role_id, project_id }),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You removed a role from your project with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type addTechToProjectParams = {
  token: Token;
  tech_id: string;
  project_id?: string;
};

export const addTechToProject = async ({
  token,
  tech_id,
  project_id,
}: addTechToProjectParams) => {
  try {
    const response = await fetch(`${ADD_TECH_PROJECT}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ tech_id, project_id }),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You added a new technology to your project with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const removeTechFromProject = async ({
  token,
  tech_id,
  project_id,
}: addTechToProjectParams) => {
  try {
    const response = await fetch(`${REMOVE_TECH_PROJECT}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ tech_id, project_id }),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You removed a technology from your project with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const getActiveUserProjects = async (token: Token) => {
  try {
    const response = await fetch(`${GET_ACTIVE_PROJECTS}`, {
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
export const getInActiveUserProjects = async (token: Token) => {
  try {
    const response = await fetch(`${GET_INACTIVE_PROJECTS}`, {
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
