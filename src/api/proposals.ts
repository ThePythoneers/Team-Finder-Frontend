import { Token } from "@/types";
import { checkError, getAuthHeaders } from "./utils";
import {
  ACCEPT_ALLOCATION,
  ACCEPT_DEALLOCATION,
  CREATE_ALLOCATION,
  CREATE_DEALLOCATION,
  DEPARTMENT_ALLOCATION,
  DEPARTMENT_DEALLOCATION,
  REJECT_DEALLOCATION,
} from "./URL";
import { toast } from "sonner";

type createAllocationProposalParams = {
  token: Token;
  project_id_allocation: string;
  user_id: string;
  work_hours: number;
  roles: string[];
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
  project_id?: string;
  user_id: string;
  comment: string;
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
  _id?: string;
};

export const getAllocationProposals = async ({
  token,
  _id,
}: getAllocationProposalsParams) => {
  try {
    const response = await fetch(`${DEPARTMENT_ALLOCATION}/${_id}`, {
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

export const getDeAllocationProposals = async ({
  token,
  _id,
}: getAllocationProposalsParams) => {
  try {
    const response = await fetch(`${DEPARTMENT_DEALLOCATION}/${_id}`, {
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

export const rejectDeAllocationProposal = async ({
  token,
  _id,
}: getAllocationProposalsParams) => {
  try {
    const response = await fetch(`${REJECT_DEALLOCATION}?_id=${_id}`, {
      method: "POST",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You rejected a deallocation proposal with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};

export const acceptDeAllocationProposal = async ({
  token,
  _id,
}: getAllocationProposalsParams) => {
  try {
    const response = await fetch(`${ACCEPT_DEALLOCATION}?_id=${_id}`, {
      method: "POST",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errMsg = await response.json();
      if (errMsg.detail) throw new Error(errMsg.detail);
      throw new Error(errMsg);
    }
    toast.success("You accepted a deallocation proposal with success!");
    return await response.json();
  } catch (error) {
    checkError(error);
  }
};
