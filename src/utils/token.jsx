export const saveTokens = (accessToken, refreshToken) => {
  sessionStorage.setItem("accessToken", accessToken);
  if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken || "");
};

export const clearTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
};

export const getAccessToken = () => sessionStorage.getItem("accessToken");
export const getRefreshToken = () => sessionStorage.getItem("refreshToken");

export const decodeJwt = (token) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};
