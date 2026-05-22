import React from "react";
import { Space, Tag } from "antd";
import ReuseTable from "../../utils/ReuseTable";
import { IoMdEye } from "react-icons/io";
import { formatDate } from "../../utils/dateFormet";

interface BookingRequestTableProps {
  data: ITrip[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ITrip) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const BookingRequestTable: React.FC<BookingRequestTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {

  console.log(data)
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "tripCustomID",
      key: "tripCustomID",
    },
    {
      title: "Guest",
      dataIndex: "guestId",
      key: "guestId",
      render: (guestId: User) => guestId?.fullName,
    },
    {
      title: "Vehicle",
      dataIndex: "vehicleId",
      key: "vehicleId",
      render: (vehicleId: Vehicle) => `${vehicleId?.vehicleName} ${vehicleId?.vehicleModel}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_: unknown, record: ITrip) => {
        return `${formatDate(record?.startDate)} - ${formatDate(record?.returnDate)}`;
      },
    },
    {
      title: "Total Amount",
      dataIndex: "netFare",
      key: "netFare",
      render: (amount: ITrip) => `$${amount?.toLocaleString()}`,
    },
    {
      title: "Admin Amount",
      dataIndex: "adminAmount",
      key: "adminAmount",
      render: (amount: ITrip) => `$${amount?.toLocaleString()}`,
    },
    {
      title: "Total Amount",
      dataIndex: "hostAmount",
      key: "hostAmount",
      render: (amount: ITrip) => `$${amount?.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "tripStatus",
      key: "tripStatus",
      render: (tripStatus: string) => {
        let color: string;
        let label: string;

        switch (tripStatus) {
          case "completed":
            color = "blue";
            label = "Completed";
            break;
          case "pending":
            color = "gold";
            label = "Upcoming";
            break;
          case "confirmed":
            color = "green";
            label = "Active";
            break;
          case "cancelled":
            color = "red";
            label = "Cancelled";
            break;
          default:
            color = "red";
            label = "Inactive";
        }

        return (
          <Tag
            color={color}
            style={{
              fontWeight: 600,
              textTransform: "capitalize",
              borderRadius: 6,
              padding: "2px 10px",
            }}
          >
            {label}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ITrip) => (
        <Space size="middle">
          <IoMdEye
            className="cursor-pointer"
            size={25}
            onClick={() => showViewModal(record)}
          ></IoMdEye>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <ReuseTable
      columns={columns}
      data={data}
      loading={loading}
      setPage={setPage}
      total={total}
      limit={limit}
      page={page}
      keyValue={"email"}
    />
  );
};

export default BookingRequestTable;
