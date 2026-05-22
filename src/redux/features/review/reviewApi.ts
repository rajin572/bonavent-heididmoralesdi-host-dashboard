import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewStatus: builder.query({
      query: ({ id }) => ({
        url: `/rating/host-total-rating-and-info/${id}`,
        method: "GET",
      }),
    }),
    getReview: builder.query({
      query: ({ id, page, limit, searchTerm, rating }) => ({
        url: `/rating/host-vehicle-rating-with-comments/${id}`,
        method: "GET",
        params: { page, limit, rating, searchTerm },
      }),
    }),
  }),
});

export const { useGetReviewStatusQuery, useGetReviewQuery } = reviewApi;
