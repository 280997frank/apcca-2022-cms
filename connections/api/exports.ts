import {
  defaultOptions,
  checkErrorResponse,
  getHeaders,
} from "@/connections/api";

export async function exportNoticeboard() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/noticeboard/generateReport`,
    {
      ...defaultOptions,
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        search: {
          keyword: "",
        },
        filter: {
          status: true,
        },
        order: {
          orderBy: "title",
          sortBy: "ASC",
        },
      }),
    }
  );
  const errorMessage = await checkErrorResponse(response.clone());

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const blob = await response.blob();
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "noticeboard.csv";
  // we need to append the element to the dom -> otherwise it will not work in firefox
  document.body.appendChild(a);
  a.click();
  // afterwards we remove the element again
  a.remove();
  window.URL.revokeObjectURL(url);
}

export async function exportDiscussionThreads() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/discussion/generateReport`,
    {
      ...defaultOptions,
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        search: {
          keyword: "",
        },
        filter: {
          status: "ACTIVE",
        },
        order: {
          orderBy: "title",
          sortBy: "ASC",
        },
      }),
    }
  );
  const errorMessage = await checkErrorResponse(response.clone());

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  const blob = await response.blob();
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "discussion-threads.csv";
  // we need to append the element to the dom -> otherwise it will not work in firefox
  document.body.appendChild(a);
  a.click();
  // afterwards we remove the element again
  a.remove();
  window.URL.revokeObjectURL(url);
}
