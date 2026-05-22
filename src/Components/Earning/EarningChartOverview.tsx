import { useState } from "react";
import YearOption from "../../utils/YearOption";
import EarningChart from "../Chart/EarningChart";
import { useGetEarningChartQuery } from "../../redux/features/earning/earning";

const EarningChartOverview = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);


  const { data: earning, isFetching } = useGetEarningChartQuery({
    year
  }, {
    refetchOnMountOrArgChange: true
  });

  console.log(earning)

  const chartData = earning?.data?.yearlyData
  return (
    <div
      className="p-3 bg-[#FFFFFF] rounded-lg flex flex-col"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center text-base-color my-5">
        <div>
          <p className="text-base sm:text-lg lg:text-xl  text-base-color font-bold mb-1">
            Earnings Trend
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-[#4A5565] font-semibold">
            Monthly earnings and payouts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <YearOption currentYear={currentYear} setThisYear={setYear} />
          </div>
        </div>
      </div>
      <div>
        {
          isFetching ? <p>Loading...</p> :
            <EarningChart chartData={chartData} />
        }
      </div>
    </div>
  );
};

export default EarningChartOverview;
