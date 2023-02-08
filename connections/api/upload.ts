import {
  defaultOptions,
  checkErrorResponse,
  getHeaders,
} from "@/connections/api";

interface FileUploadResponse {
  data: string[];
  message: string;
  success: boolean;
}

export async function uploadFiles(files: FormData) {
  const headers = getHeaders();
  delete headers["Content-Type"];

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/uploadFiles`,
    {
      ...defaultOptions,
      method: "POST",
      headers,
      body: files,
    }
  );
  const errorMessage = await checkErrorResponse(response.clone());

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const json = await response.json();
  return json as FileUploadResponse;
}
