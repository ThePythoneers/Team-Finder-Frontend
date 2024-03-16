import { Token } from "@/types";
import { checkError, getAuthHeaders } from "./utils";
import { CREATE_ALLOCATION } from "./URL";
import { toast } from "sonner";

type createAllocationProposalParams = {
  token: Token;
  project_id: string;
  user_id: string;
  wokr_hours: number;
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
    toast.success("You send an allocation proposal with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
