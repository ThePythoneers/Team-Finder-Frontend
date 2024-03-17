import { toast } from "sonner";
import {
  CREATE_NEW_SKILL_CATEGORY,
  GET_CREATE_DELETE_SKILLS,
  GET_POST_DELETE_ASSIGN_SKILL_USER,
  GET_SKILLS_ANY_USER,
  GET_SKILL_CATEGORIES,
  GET_SKILL_CATEGORY,
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
    const response = await fetch(
      `${CREATE_NEW_SKILL_CATEGORY}/${newSkillCategory}`,
      {
        method: "POST",
        headers: getAuthHeaders(token),
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

export const createSkill = async (values: createSkillParams) => {
  try {
    const { token, ...body } = values;
    const response = await fetch(`${GET_CREATE_DELETE_SKILLS}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You created a new skill with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type deleteSkillParams = {
  token: Token;
  skill_id: string;
};

export const deleteSkill = async ({ token, skill_id }: deleteSkillParams) => {
  try {
    const response = await fetch(
      `${GET_CREATE_DELETE_SKILLS}/?_id=${skill_id}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(token),
      }
    );

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You deleted a skill with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const getSkillCategories = async (token: Token) => {
  try {
    const response = await fetch(`${GET_SKILL_CATEGORIES}`, {
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

export const getSkills = async (token: Token) => {
  try {
    const response = await fetch(`${GET_CREATE_DELETE_SKILLS}`, {
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

type getSkillCategoryParams = {
  token: Token;
  category_id: string;
};

export const getSkillCategory = async ({
  token,
  category_id,
}: getSkillCategoryParams) => {
  try {
    const response = await fetch(`${GET_SKILL_CATEGORY}/${category_id}`, {
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

export const getAuthUserSkills = async (token: Token) => {
  try {
    const response = await fetch(`${GET_POST_DELETE_ASSIGN_SKILL_USER}`, {
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
type removeUserSkillParams = {
  token: Token;
  user_id: string;
  skill_id: string;
};

export const removeUserSkill = async (values: removeUserSkillParams) => {
  try {
    const { token, ...body } = values;
    const response = await fetch(`${GET_POST_DELETE_ASSIGN_SKILL_USER}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You removed a skill with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const getAnyUserSkills = async (token: Token, _id: string) => {
  try {
    const response = await fetch(`${GET_SKILLS_ANY_USER}?_id=${_id}`, {
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

type deleteSkillCategoryParams = {
  token: Token;
  _id: string;
};

export const deleteSkillCategory = async ({
  token,
  _id,
}: deleteSkillCategoryParams) => {
  try {
    const response = await fetch(`${GET_SKILL_CATEGORY}/${_id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You deleted a skill category with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type updateSkillCategoryParams = {
  token: Token;
  category_name: string;
  category_id: string;
};

export const updateSkillCategory = async ({
  token,
  category_name,
  category_id,
}: updateSkillCategoryParams) => {
  try {
    const response = await fetch(`${GET_SKILL_CATEGORY}/${category_id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You edited a skill category with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
