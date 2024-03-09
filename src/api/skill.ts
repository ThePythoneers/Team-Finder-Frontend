import { toast } from "sonner";
import { CREATE_NEW_SKILL_CATEGORY } from "./URL";
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
