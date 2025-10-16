// src/redux/services/s3Api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const s3Api = createApi({
  reducerPath: "s3Api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["S3"],
  endpoints: (builder) => ({
    checkStatus: builder.query({
      query: () => "/s3/status",
    }),
    buckets: builder.query({
      query: () => "/s3/buckets",
      providesTags: ["S3"],
    }),
    createAccount: builder.mutation({
      query: (body) => ({ url: "/s3/create-account", method: "POST", body }),
      // sau khi tạo account, refetch status + buckets
      invalidatesTags: ["S3"],
    }),
    importKeys: builder.mutation({
      query: (file) => {
        const form = new FormData();
        form.append("file", file);
        return { url: "/s3/import-keys", method: "POST", body: form };
      },
      invalidatesTags: ["S3"],
    }),
  }),
});

export const {
  useCheckStatusQuery,
  useBucketsQuery,
  useCreateAccountMutation,
  useImportKeysMutation,
} = s3Api;
