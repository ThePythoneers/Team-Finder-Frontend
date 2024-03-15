import { Token } from "@/types";
import { checkError, getAuthHeaders } from "./utils";
import { GET_UPDATE_ALL_TECH } from "./URL";
import { toast } from "sonner";

export const getAllTechnologies = async (token: Token) => {
  try {
    const response = await fetch(`${GET_UPDATE_ALL_TECH}`, {
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

type createTechParams = {
  token: Token;
  technology_name: string;
};

export const createTech = async ({
  token,
  technology_name,
}: createTechParams) => {
  try {
    const response = await fetch(`${GET_UPDATE_ALL_TECH}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ technology_name }),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You deleted a technology with success!");

    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type deleteTechParams = {
  token: Token;
  _id: string;
};

export const deleteTech = async ({ token, _id }: deleteTechParams) => {
  try {
    const response = await fetch(`${GET_UPDATE_ALL_TECH}?_id=${_id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You deleted a technology with success!");

    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
