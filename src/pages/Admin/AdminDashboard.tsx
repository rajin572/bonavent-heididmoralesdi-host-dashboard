import OverviewCard from "../../Components/Dashboard/Overview/OverviewCards";
import QuickStats from "../../Components/Dashboard/Overview/QuickStats";
import RecentBookings from "../../Components/Dashboard/Overview/RecentBookings";
import RevenueOverview from "../../Components/Dashboard/Overview/RevenueOverview";
import { useDashboardOverviewQuery } from "../../redux/features/booking/bookingApi";

const AdminDashboard = () => {
  const { data, isFetching } = useDashboardOverviewQuery({}, {
    refetchOnMountOrArgChange: true
  });
  const overviewData = data?.data
  console.log(data)

  return (
    <div>
      <>
        <div className="mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl  font-bold mb-5 ">
            Welcome back!
          </h1>
          <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-34xl font-semibold text-[#667085] mb-5">
            Here's what's happening with your fleet today.
          </h3>
        </div>
        <div className="my-5">
          <OverviewCard overviewData={overviewData} isFetching={isFetching} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          <div className="lg:col-span-2">
            <RevenueOverview />
          </div>
          <QuickStats overviewData={overviewData} isFetching={isFetching} />
        </div>
        <div>
          <RecentBookings />
        </div>
      </>
    </div>
  );
};

export default AdminDashboard;
