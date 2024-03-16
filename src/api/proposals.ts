import { Token } from "@/types";
import { checkError, getAuthHeaders } from "./utils";
import { CREATE_ALLOCATION, CREATE_DEALLOCATION } from "./URL";
import { toast } from "sonner";

type createAllocationProposalParams = {
  token: Token;
  project_id_allocation: string | undefined;
  user_id: string;
  work_hours: number;
  team_roles: string[];
  comments: string;
};

export const createAllocationProposal = async (
  values: createAllocationProposalParams
) => {
  try {
    const { token, ...body } = values;
    const response = await fetch(`${CREATE_ALLOCATION}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You sent an allocation proposal with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

type createDeAllocationProposalParams = {
  token: Token;
  project_id_allocation: string | undefined;
  user_id: string;
  comments: string;
};

export const createDeAllocationProposal = async (
  values: createDeAllocationProposalParams
) => {
  try {
    const { token, ...body } = values;
    const response = await fetch(`${CREATE_DEALLOCATION}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You sent a deallocation proposal with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};