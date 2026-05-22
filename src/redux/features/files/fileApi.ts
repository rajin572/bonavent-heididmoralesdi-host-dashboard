import { baseApi } from "../../api/baseApi";

const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    downloadFile: builder.query<Blob, { url: string }>({
      query: ({ url }) => ({
        url: `/download`,
        method: "GET",
        params: { url },
        responseHandler: (response) => response.blob(), // ✅ handle binary
        cache: "no-cache",
      }),
    }),
  }),
});

export const { useLazyDownloadFileQuery } = fileApi;
