import { getAccessToken, removeAccessToken } from "@/utils";

export const defaultOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export async function checkErrorResponse(response: Response) {
  let errorMessage = "";
  const clonedResponse = response.clone();

  if (!response.ok) {
    try {
      const json = await response.json();
      if (json.message) {
        errorMessage = json.message;
      } else {
        errorMessage = "unknown";
      }
    } catch (error) {
      const text = await clonedResponse.text();
      errorMessage = text;
    }
  }

  const errorMsgInLowerCase = errorMessage.toLowerCase().trim();
  const INVALID_TOKEN_ERROR_MESSAGES = [
    "token expired",
    "failed to verify token",
  ];

  if (INVALID_TOKEN_ERROR_MESSAGES.includes(errorMsgInLowerCase)) {
    removeAccessToken();
  }

  return errorMessage;
}

export const getHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getAccessToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
