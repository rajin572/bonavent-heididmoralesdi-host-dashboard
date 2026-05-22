import { useGetVehicleStatisQuery } from "../../redux/features/vehicle/vehicleApi";

const VechiclesOverviewCards = () => {

  const { data, isFetching } = useGetVehicleStatisQuery({}, {
    refetchOnMountOrArgChange: true
  });

  console.log(data)

  const countData = [
    {
      id: 1,
      background: "#ffffff",
      border: "#6078EA",
      name: "Total Vehicles",
      count: isFetching ? "--" : data?.data?.vehicleTotal,
    },

    {
      id: 3,
      background: "#ffffff",
      border: "#00C950",
      name: "Available",
      count: isFetching ? "--" : data?.data?.vehicleAvailable,
    },
    {
      id: 4,
      background: "#ffffff",
      border: "#2B7FFF",
      name: "Currently Rented",
      count: isFetching ? "--" : data?.data?.bookingStats?.activeTrip,
    },
    {
      id: 4,
      background: "#ffffff",
      border: "#FF6900",
      name: "Upcoming Trip",
      count: isFetching ? "--" : data?.data?.bookingStats?.upcomingTrip,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-3 mb-5 ">
      {/* Company  */}
      {countData.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-4 rounded-xl w-full my-2 lg:my-0 flex-1 border-2 border-secondary-color p-6`}
          style={{
            backgroundColor: item.background,
            border: `1px solid ${item.border}`,
            borderLeft: `4px solid ${item.border}`,
          }}
        >
          <div className="!w-full">
            <p className="text-xs sm:text-sm lg:text-base text-[#667085]  font-semibold tracking-tight w-full text-nowrap mb-5">
              {item.name}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl  font-bold capitalize">
              {item.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VechiclesOverviewCards;
