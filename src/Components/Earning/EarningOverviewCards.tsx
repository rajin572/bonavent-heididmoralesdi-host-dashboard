/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaRegCalendar } from "react-icons/fa6";
import { IoTrendingUpSharp } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";

const EarningOverviewCards = ({ allStatus, isFetching }: { allStatus: any, isFetching: boolean }) => {

  const countData = [
    {
      id: 1,
      background: "linear-gradient(0deg, #4A5FD8 0%, #6078EA 100%)",
      color: "#fff",
      border: "#6078EA00",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#FFFFFF33] rounded-lg">
          <LuDollarSign className="size-7 text-white" />
        </div>
      ),
      name: "Total Earnings",
      count: `$${isFetching ? "--" : allStatus?.totalTrip}`,
    },
    {
      id: 2,
      background: "linear-gradient(0deg, #fff 0%, #fff 100%)",
      border: "#6078EA",
      color: "#101828",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#DBEAFE] rounded-lg">
          <FaRegCalendar className="size-7 text-[#155DFC]" />
        </div>
      ),

      name: "This Month",
      count: `$${isFetching ? "--" : allStatus?.currentMonthEarning}`,
    },
    {
      id: 3,
      background: "linear-gradient(0deg, #fff 0%, #fff 100%)",
      border: "#AD46FF",
      color: "#101828",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#F3E8FF] rounded-lg">
          <LuDollarSign className="size-7 text-[#AD46FF]" />
        </div>
      ),
      name: "Pending Payout",
      count: `$${isFetching ? "--" : allStatus?.pendingAmount}`,
    },
    {
      id: 4,
      background: "linear-gradient(0deg, #fff 0%, #fff 100%)",
      border: "#FF6900",
      color: "#101828",
      icon: (
        <div className="w-fit h-fit p-2 bg-[#FFEDD4] rounded-lg">
          <IoTrendingUpSharp className="size-7 text-[#F54900]" />
        </div>
      ),
      name: "Average per Trip",
      count: `$${isFetching ? "--" : (allStatus?.totalEarning / allStatus?.totalTrip).toFixed(2)}`,
      description: "+$12 vs last month",
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
            border: `1px solid ${item.border}`,
            borderLeft: `4px solid ${item.border}`,
          }}
        >
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              {item.icon}
              {/* {item.state && (
                <p className="text-xs sm:text-sm lg:text-base text-nowrap flex items-center gap-2">
                  <LuArrowUpRight className="size-5" /> {item.state}
                </p>
              )} */}
            </div>
            <div className="flex flex-col gap-4 items-start justify-between w-full mt-4">
              <p className="text-xs sm:text-sm lg:text-base font-semibold mb-1 tracking-tight w-full text-nowrap opacity-90">
                {item.name}
              </p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold capitalize">
                {item.count}
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EarningOverviewCards;
