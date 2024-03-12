import { Token } from "@/types";
import { GET_POST_DELETE_ASSIGN_SKILL_USER, GET_USER } from "./URL";
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
};

export const assignSkillMe = async (values: assignSkillMeParams) => {
  try {
    const { token, ...body } = values;
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
    toast.success("You assigned a new skill to yourself with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
