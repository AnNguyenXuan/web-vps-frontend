// redux/services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { saveTokens, clearTokens, getAccessToken, getRefreshToken } from "../../utils/Token";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "/", // đổi nếu API có prefix
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extra) => {
  let result = await rawBaseQuery(args, api, extra);

  if (result.error?.status === 401) {
    const rt = getRefreshToken();
    if (rt) {
      const refreshResult = await rawBaseQuery(
        { url: "/auth/refresh", method: "POST", body: { refreshToken: rt } },
        api,
        extra
      );
      const newAT = refreshResult.data?.accessToken;
      if (newAT) {
        saveTokens(newAT, rt);
        // retry original
        result = await rawBaseQuery(args, api, extra);
      } else {
        clearTokens();
      }
    } else {
      clearTokens();
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { username, password },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // đổi key theo backend bạn: accessToken/refreshToken
          saveTokens(data.accessToken, data.refreshToken);
        } catch {
          /* noop */
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_, { queryFulfilled }) {
        try { await queryFulfilled; } finally { clearTokens(); }
      },
    }),

    me: builder.query({
      query: () => "/auth/me", // trả về thông tin user hiện tại
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useMeQuery } = authApi;
