import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: () => ({
        url: `/host-business/host-dashboard-overview`,
        method: "GET",
      }),
      providesTags: [tagTypes.vechicle],
    }),
    getChartStatus: builder.query({
      query: ({ year }) => ({
        url: `/host-business/host-earning-with-chart-data`,
        method: "GET",
        params: { year },
      }),
      providesTags: [tagTypes.vechicle],
    }),
    getBookingStatus: builder.query({
      query: () => ({
        url: `/trip/host-booking-stats-for-dashboard`,
        method: "GET",
      }),
      providesTags: [tagTypes.vechicle],
    }),
    getBooking: builder.query({
      query: ({ page, limit, searchTerm, status }) => ({
        url: `/trip/all?status=${status}&apiType=dashboard`,
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: [tagTypes.vechicle],
    }),
  }),
});

export const {
  useDashboardOverviewQuery,
  useGetChartStatusQuery,
  useGetBookingStatusQuery,
  useGetBookingQuery,
} = bookingApi;
