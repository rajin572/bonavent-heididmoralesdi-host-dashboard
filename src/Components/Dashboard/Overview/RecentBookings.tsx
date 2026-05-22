/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import BookingRequestTable from "../../../ui/Tables/BookingRequestTable";
import ViewRecentBookingReqModal from "../../../ui/Modal/BookingReq/ViewRecentBookingReqModal";
import { useGetBookingQuery } from "../../../redux/features/booking/bookingApi";
const RecentBookings = () => {
  const { data, isFetching } = useGetBookingQuery({
    page: 1,
    limit: 6,
  }, {
    refetchOnMountOrArgChange: true
  });

  const allBookings: ITrip[] = data?.data?.trips;

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
    <div
      className="mt-10  rounded-xl p-4 bg-primary-color "
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center mx-3 py-2">
        <p className="text-lg sm:text-xl lg:text-2xl  text-base-color font-bold ">
          Recent Bookings
        </p>
      </div>

      <div>
        <BookingRequestTable
          data={allBookings}
          loading={isFetching}
          showViewModal={showViewUserModal}
          setPage={() => { }}
          page={1}
          total={allBookings?.length}
          limit={6}
        />
      </div>
      <ViewRecentBookingReqModal
        isViewModalVisible={isViewModalVisible}
        handleCancel={handleCancel}
        currentRecord={currentRecord}
      />
    </div>
  );
};

export default RecentBookings;
