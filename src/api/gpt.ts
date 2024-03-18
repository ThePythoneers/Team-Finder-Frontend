import { Token } from "@/types";
import { checkError, getAuthHeaders } from "./utils";
import { GPT } from "./URL";

type gptParams = {
  token: Token;
  message: string;
};

export const gpt = async ({ token, message }: gptParams) => {
  try {
    const response = await fetch(`${GPT}`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ message }),
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
