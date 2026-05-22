import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicle: builder.query({
      query: ({ searchTerm }) => ({
        url: `/vehicle/host-get-all-vehicles?searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vechicle],
    }),
    getVehicleStatis: builder.query({
      query: () => ({
        url: `/vehicle/host-vehicle-stats-dashboard`,
        method: "GET",
      }),
      providesTags: [tagTypes.vechicle],
    }),
    addVehicle: builder.mutation({
      query: (req) => ({
        url: `/vehicle/add-new-vehicle`,
        method: "POST",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.vechicle],
    }),
    updateVehicle: builder.mutation({
      query: (req) => ({
        url: `/vehicle/vehicle-data-update/${req.params.id}`,
        method: "PATCH",
        body: req.body, // Passing the body from the request
      }),
      invalidatesTags: [tagTypes.vechicle],
    }),
    deleteVehicle: builder.mutation({
      query: (req) => ({
        url: `/category/${req.params.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.vechicle],
    }),
    getVehicleAlwaysAvailable: builder.query({
      query: ({ id }) => ({
        url: `/weekly-availability/weekly-availability/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vechicle],
    }),
    vehicleAlwaysAvailable: builder.mutation({
      query: (req) => ({
        url: `/weekly-availability/update-weekly-availability/${req.params.id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.vechicle],
    }),
    vehicleDailyAvailable: builder.mutation({
      query: (req) => ({
        url: `/weekly-availability/update-daily-availability/${req.params.id}`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.vechicle],
    }),
  }),
});

export const {
  useGetVehicleQuery,
  useGetVehicleStatisQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehicleAlwaysAvailableQuery,
  useVehicleAlwaysAvailableMutation,
  useVehicleDailyAvailableMutation,
} = settingApi;
