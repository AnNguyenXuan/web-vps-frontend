import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAccessToken } from "../../utils/Token";

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const s3Api = createApi({
  reducerPath: "s3Api",
  baseQuery,
  tagTypes: ["S3Status", "Buckets"],
  endpoints: (builder) => ({

    checkStatus: builder.query({
      query: () => "/s3/status",
      providesTags: ["S3Status"],
    }),

    generateKeyRequest: builder.mutation({
      query: (payload) => ({
        url: "/s3/generate-key",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["S3Status", "Buckets"],
    }),

    importKeys: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/s3/import-keys",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["S3Status"],
    }),

    listBuckets: builder.query({
      query: () => "/s3/buckets",
      providesTags: ["Buckets"],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useCheckStatusQuery,
  useListBucketsQuery,
  useGenerateKeyRequestMutation,
  useImportKeysMutation,
} = s3Api;
