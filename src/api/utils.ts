import { Token } from "@/types";
import { toast } from "sonner";

const serverErrorMsg = "Server is down at the moment please try again later!";

export const checkError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message === "Failed to fetch")
      return toast.warning(serverErrorMsg);
    toast.error(error.message);
  }
};

export const getAuthHeaders = (token: Token) => {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };
};

export const getHeaders = () => {
  return {
    "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
};
