import { Token } from "@/types";
import { TEAM_FINDER, UPDATE_PROJECT } from "./URL";
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
  deadline?: Date;
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
  technologies: string[];
  general_description: string;
  project_roles: string[];
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
