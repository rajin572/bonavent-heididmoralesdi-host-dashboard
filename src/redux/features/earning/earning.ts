import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarningStatus: builder.query({
      query: () => ({
        url: `/host-business/host-earning-summary-for-dashboard`,
        method: "GET",
      }),
      providesTags: [tagTypes.vechicle],
    }),
    getEarningChart: builder.query({
      query: ({ year }) => ({
        url: `/host-business/host-earning-with-chart-data`,
        method: "GET",
        params: { year },
      }),
      providesTags: [tagTypes.vechicle],
    }),
    getEarning: builder.query({
      query: ({ page, limit }) => ({
        url: `/payment/payment-history`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.vechicle],
    }),
    getWithdraw: builder.query({
      query: ({ page, limit }) => ({
        url: `/transaction/withdraw-recharge-history?transactionType=withdraw`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: [tagTypes.vechicle],
    }),
  }),
});

export const {
  useGetEarningStatusQuery,
  useGetEarningChartQuery,
  useGetEarningQuery,
  useGetWithdrawQuery,
} = earningApi;
