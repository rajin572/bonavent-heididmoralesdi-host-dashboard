/* eslint-disable @typescript-eslint/no-explicit-any */
import ProgressBar from "../../../ui/ProgressBar";



const QuickStats = ({
  overviewData,
  isFetching,
}: {
  overviewData: any;
  isFetching: boolean;
}) => {
  // totalTrip: 7,
  //   totalCompleteTrip: 4,
  //     totalCancellationTrip: 1,

  const stats = [
    {
      title: "Booking Rate",
      value: isFetching ? "--" : ((overviewData?.totalCompleteTrip / overviewData?.totalTrip) * 100)?.toFixed(1) || 0,
      label: "Above average",
      barColor: "bg-indigo-500",
    },
    // {
    //   title: "Response Time",
    //   value: isFetching ? "--" : overviewData?.totalCompleteTrip || 0,
    //   label: "Excellent",
    //   barColor: "bg-sky-500",
    //   unit: " min",
    // },
    {
      title: "Guest Satisfaction",
      value: isFetching ? "--" : (((overviewData?.totalTrip - overviewData?.totalCancellationTrip) / overviewData?.totalTrip) * 100)?.toFixed(1) || 0,
      label: "Outstanding",
      barColor: "bg-green-500",
    },
  ];

  return (
    <div className=" w-full p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-bold">Quick Stats</h2>
      <div className="space-y-4 mt-10">
        {stats.map((item, index) => (
          <ProgressBar key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
