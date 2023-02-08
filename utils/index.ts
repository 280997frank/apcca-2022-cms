export const getAccessToken = (): string => {
  if ((process.env.NEXT_PUBLIC_COOKIE_NAME as string) !== "") {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string
      );
      return token !== null ? token : "";
    }
  }

  return "";
};
export const storeAccessToken = (accessToken: string) => {
  if (typeof process.env.NEXT_PUBLIC_COOKIE_NAME === "string") {
    window.localStorage.setItem(
      process.env.NEXT_PUBLIC_COOKIE_NAME,
      accessToken
    );
  } else {
    throw new Error("Token cannot be stored");
  }
};

export const removeAccessToken = () => {
  if (typeof process.env.NEXT_PUBLIC_COOKIE_NAME === "string") {
    window.localStorage.removeItem(process.env.NEXT_PUBLIC_COOKIE_NAME);
  }
};
