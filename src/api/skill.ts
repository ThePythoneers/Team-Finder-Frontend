import { toast } from "sonner";
import {
  CREATE_NEW_SKILL_CATEGORY,
  GET_CREATE_SKILLS,
  GET_SKILL_CATEGORIES,
} from "./URL";
import { checkError, getAuthHeaders } from "./utils";
import { Token } from "@/types";

type createSkillCategoryParams = {
  token: Token;
  newSkillCategory: string;
};

export const createSkillCategory = async ({
  token,
  newSkillCategory,
}: createSkillCategoryParams) => {
  try {
    const headers = getAuthHeaders(token);
    const response = await fetch(
      `${CREATE_NEW_SKILL_CATEGORY}/${newSkillCategory}`,
      {
        method: "POST",
        headers: headers,
      }
    );

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }

    toast.success("You created a new skill category with success!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type createSkillParams = {
  token: Token;
  skill_category: string[];
  skill_name: string;
  description: string;
  author: string | undefined;
  departments: string[];
};

export const createSkill = async ({
  token,
  skill_category,
  skill_name,
  description,
  author,
  departments,
}: createSkillParams) => {
  try {
    const body = {
      skill_category,
      skill_name,
      description,
      author,
      departments,
    };
    const headers = getAuthHeaders(token);
    const response = await fetch(`${GET_CREATE_SKILLS}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You created a new skill with success!!!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const getSkillCategories = async (token: Token) => {
  try {
    const headers = getAuthHeaders(token);
    const response = await fetch(`${GET_SKILL_CATEGORIES}`, {
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

export const getSkills = async (token: Token) => {
  try {
    const headers = getAuthHeaders(token);
    const response = await fetch(`${GET_CREATE_SKILLS}`, {
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
