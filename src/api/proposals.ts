import { Token } from "@/types";
import { checkError, getAuthHeaders } from "./utils";
import {
  ACCEPT_ALLOCATION,
  CREATE_ALLOCATION,
  CREATE_DEALLOCATION,
  GET_ALLOCATION_ID,
} from "./URL";
import { toast } from "sonner";

type createAllocationProposalParams = {
  token: Token;
  project_id_allocation: string;
  user_id: string;
  work_hours: number;
  project_roles: string[];
  comment: string;
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
  project_id_allocation: string;
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

type getAllocationProposalsParams = {
  token: Token;
  _id: string;
};

export const getAllocationProposals = async ({
  token,
  _id,
}: getAllocationProposalsParams) => {
  try {
    const response = await fetch(`${GET_ALLOCATION_ID}?_id=${_id}`, {
      method: "GET",
      headers: getAuthHeaders(token),
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

export const acceptAllocationProposal = async ({
  token,
  _id,
}: getAllocationProposalsParams) => {
  try {
    const response = await fetch(`${ACCEPT_ALLOCATION}?_id=${_id}`, {
      method: "POST",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You accepted an allocation proposal with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
export const rejectAllocationProposal = async ({
  token,
  _id,
}: getAllocationProposalsParams) => {
  try {
    const response = await fetch(`${ACCEPT_ALLOCATION}?_id=${_id}`, {
      method: "POST",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You rejected an allocation proposal with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
