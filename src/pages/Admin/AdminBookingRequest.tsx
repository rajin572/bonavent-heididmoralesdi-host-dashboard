/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import BookingRequestOverviewCards from "../../Components/BookingRequest/BookingRequestOverviewCards";
import ReuseSearchInput from "../../ui/Form/ReuseSearchInput";
import ReusableTabs from "../../ui/ReusableTabs";
import BookingRequestTable from "../../ui/Tables/BookingRequestTable";
import ViewRecentBookingReqModal from "../../ui/Modal/BookingReq/ViewRecentBookingReqModal";
import { useGetBookingQuery } from "../../redux/features/booking/bookingApi";

const AdminBookingRequest = () => {
  const [activeTab, setActiveTab] = useState("totalTrip");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetBookingQuery({
    page,
    limit,
    searchTerm: search,
    status: activeTab,
  }, {
    refetchOnMountOrArgChange: true
  });


  const allBookings: ITrip[] = data?.data?.trips;
  const totalBookings = data?.data?.meta?.total;

  const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  const [currentRecord, setCurrentRecord] = useState(null);

  const showViewUserModal = (record: any) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-bold mb-3">
          Bookings Management
        </h1>
        <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold text-[#667085] mb-5">
          Track and manage all your vehicle bookings
        </h3>
      </div>
      <BookingRequestOverviewCards />
      <div className="bg-primary-color p-4 rounded-xl shadow">
        <ReuseSearchInput
          placeholder="Search by booking ID"
          setSearch={setSearch}
          setPage={setPage}
        />
      </div>
      <div className="mt-10 bg-primary-color p-4 rounded-xl">
        <ReusableTabs
          tabs={[
            {
              label: "All",
              value: "totalTrip",
              content: (
                null
              ),
            },
            {
              label: "Upcoming",
              value: "upComing",
              content: (
                null
              ),
            },
            {
              label: "Active",
              value: "startTrip",
              content: (
                null
              ),
            },
            {
              label: "Completed",
              value: "completeTrip ",
              content: (
                null
              ),
            },
          ]}
          align="left"
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      <BookingRequestTable
        data={allBookings}
        loading={isFetching}
        showViewModal={showViewUserModal}
        setPage={setPage}
        page={page}
        total={totalBookings}
        limit={limit}
      />
      <ViewRecentBookingReqModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default AdminBookingRequest;
