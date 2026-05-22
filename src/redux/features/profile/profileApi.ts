import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myAllNotification: builder.query({
      query: ({ page, limit }) => ({
        url: `/notifications/my-notifications`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.profile],
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/users/get-my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    updateProfile: builder.mutation({
      query: (req) => {
        return {
          url: `/users/update-my-profile`,
          method: "PATCH",
          body: req.body, // Passing the body from the request
        };
      },
      invalidatesTags: [tagTypes.profile],
    }),

    myPerformance: builder.query({
      query: () => ({
        url: `/host-business/host-current-month-summary-performance`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    getLocation: builder.query({
      query: ({ id }) => ({
        url: `/vehicle/get-company-location/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),

    updateLocation: builder.mutation({
      query: (req) => {
        return {
          url: `/vehicle/upsert-return-location`,
          method: "PATCH",
          body: req.body, // Passing the body from the request
        };
      },
      invalidatesTags: [tagTypes.profile],
    }),
    deleteProfile: builder.mutation({
      query: (req) => {
        return {
          url: `/users/delete-my-account`,
          method: "DELETE",
          body: req.body,
        };
      },
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const {
  useMyAllNotificationQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useMyPerformanceQuery,
  useGetLocationQuery,
  useUpdateLocationMutation,
  useDeleteProfileMutation,
} = profileApi;
