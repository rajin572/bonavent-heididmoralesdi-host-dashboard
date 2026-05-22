/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCarSide, FaRegCalendar, FaRegStar } from "react-icons/fa6";
import { LuArrowUpRight, LuDollarSign } from "react-icons/lu";

const OverviewCards = ({
  overviewData,
  isFetching,
}: {
  overviewData: any;
  isFetching: boolean;
}) => {
  console.log(overviewData)
  // safe access
  const earningCurrent = overviewData?.earning?.current ?? 0;
  const earningPrevious = overviewData?.earning?.previous ?? 0;

  const activeTrip = overviewData?.booking?.activeTrip ?? 0;
  const upcomingTrip = overviewData?.booking?.upcomingTrip ?? 0;

  const totalVehicle = overviewData?.vehicle?.total ?? 0;
  const availableVehicle = overviewData?.vehicle?.available ?? 0;

  const avgRating = overviewData?.rating?.average ?? 0;
  const totalReview = overviewData?.rating?.total ?? 0;

  // calculate earning percentage
  const earningPercent =
    earningPrevious > 0
      ? (((earningCurrent - earningPrevious) / earningPrevious) * 100).toFixed(1)
      : "0.0";

  const countData = [
    {
      id: 1,
      background: "linear-gradient(0deg, #4A5FD8 0%, #6078EA 100%)",
      color: "#fff",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#FFFFFF33] rounded-lg">
          <LuDollarSign className="size-7 text-white" />
        </div>
      ),
      state: `+${earningPercent}%`,
      name: "Total Earnings",
      count: `$${earningCurrent}`,
      description: "This month",
    },
    {
      id: 2,
      background: "linear-gradient(0deg, #00A63E 0%, #00C950 100%)",
      color: "#fff",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#FFFFFF33] rounded-lg">
          <FaRegCalendar className="size-7 text-white" />
        </div>
      ),
      state: "",
      name: "Active Bookings",
      count: `${activeTrip}`,
      description: `${upcomingTrip} upcoming`,
    },
    {
      id: 3,
      background: "linear-gradient(0deg, #fff 0%, #fff 100%)",
      color: "#101828",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#F3E8FF] rounded-lg">
          <FaCarSide className="size-7 text-[#9810FA]" />
        </div>
      ),
      name: "Total Vehicles",
      count: `${totalVehicle}`,
      description: `${availableVehicle} available now`,
    },
    {
      id: 4,
      background: "linear-gradient(0deg, #fff 0%, #fff 100%)",
      color: "#101828",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#FEF9C2] rounded-lg">
          <FaRegStar className="size-7 text-[#D08700]" />
        </div>
      ),
      name: "Average Rating",
      count: `${avgRating}`,
      description: `From ${totalReview} reviews`,
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-3 mb-5">
      {countData.map((item) => (
        <div
          key={item.id}
          className="flex rounded-2xl w-full my-2 lg:my-0 flex-1 p-6 text-white"
          style={{
            color: item.color,
            background: item.background,
            boxShadow: "0px 2px 8px 1px #00000020",
          }}
        >
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              {item.icon}
              {item.state && (
                <p className="text-xs sm:text-sm lg:text-base text-nowrap flex items-center gap-2">
                  <LuArrowUpRight className="size-5" /> {item.state}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-4 items-start justify-between w-full mt-4">
              <p className="text-xs sm:text-sm lg:text-base font-semibold mb-1 tracking-tight w-full text-nowrap opacity-90">
                {item.name}
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize">
                {isFetching ? "..." : item.count}
              </p>
              <p className="text-xs lg:text-sm capitalize mt-2 font-medium opacity-90">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
