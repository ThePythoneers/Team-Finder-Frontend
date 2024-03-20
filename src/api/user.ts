import { Token } from "@/types";
import {
  GET_POST_DELETE_ASSIGN_SKILL_USER,
  GET_USER,
  NOTIFICATIONS,
  PAST_PROJECTS_USER,
} from "./URL";
import { checkError, getAuthHeaders } from "./utils";
import { toast } from "sonner";

type getUserInfoParams = {
  token: Token;
  user: string | undefined;
};

export const getUserInfo = async ({ token, user }: getUserInfoParams) => {
  try {
    const response = await fetch(`${GET_USER}/${user}`, {
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

type assignSkillMeParams = {
  token: Token;
  user_id: string | undefined;
  skill_id: string;
  level: number;
  experience: number;
  training_title?: string;
  training_description?: string;
  project_link?: string;
};

export const assignSkillMe = async (values: assignSkillMeParams) => {
  try {
    const { token, ...body } = values;
    console.log(body);
    const response = await fetch(`${GET_POST_DELETE_ASSIGN_SKILL_USER}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You assigned a new skill to yourself with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const editSkillMe = async (values: assignSkillMeParams) => {
  try {
    const { token, ...body } = values;
    console.log(body);
    const response = await fetch(`${GET_POST_DELETE_ASSIGN_SKILL_USER}`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You assigned a new skill to yourself with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type getPastProjectsParams = {
  token: Token;
  _id?: string;
};

export const getPastProjects = async ({
  token,
  _id,
}: getPastProjectsParams) => {
  try {
    const response = await fetch(`${PAST_PROJECTS_USER}/${_id}`, {
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

export const getNotifications = async (token: Token) => {
  try {
    const response = await fetch(`${NOTIFICATIONS}`, {
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

type deleteNotificationParams = {
  token: Token;
  _id: string;
};

export const deleteNotification = async ({
  token,
  _id,
}: deleteNotificationParams) => {
  try {
    const response = await fetch(`${NOTIFICATIONS}?_id=${_id}`, {
      method: "DELETE",
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
