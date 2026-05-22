import Area_Chart from "../../Chart/AreaChart";
import YearOption from "../../../utils/YearOption";
import { useState } from "react";
import { useGetChartStatusQuery } from "../../../redux/features/booking/bookingApi";

const RevenueOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const { data, isFetching } = useGetChartStatusQuery({ year }, {
    refetchOnMountOrArgChange: true,
  });

  const chartData = data?.data?.yearlyData
  console.log(chartData);
  return (
    <div
      className="w-full p-5 bg-[#FFFFFF] rounded-lg"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center text-base-color my-5">
        <div>
          <p className="text-base sm:text-lg lg:text-xl  text-base-color font-bold mb-1">
            Revenue Overview
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-[#4A5565] font-semibold">
            Monthly earnings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        <Area_Chart chartData={chartData} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default RevenueOverview;
