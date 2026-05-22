import React from "react";
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { formatDate } from "../../utils/dateFormet";
import { ColumnsType } from "antd/es/table";

// Define the type for the props
interface TransactionTableProps {
  data: ITransaction[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: ITransaction) => void; // Function to handle viewing a user
  setPage?: (page: number) => void; // Function to handle pagination
  page?: number;
  total?: number;
  limit?: number;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  data,
  loading,
  showViewModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const formatMoney = (value?: number) => {
    const n = Number(value ?? 0);
    return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
  };
  const columns: ColumnsType<ITransaction> = [
    {
      title: "Date",
      key: "date",
      render: (_, record) => (
        <span className="font-medium text-gray-800">
          {formatDate(record.createdAt)}
        </span>
      ),
    },
    {
      title: "Trip",
      key: "trip",
      render: (_, record) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">
            {record.tripId?.tripCustomID ?? record.tripId?._id ?? "-"}
          </span>
          <span className="text-xs text-gray-500">
            {record.tripId?.tripStatus ?? "-"}
          </span>
        </div>
      ),
    },
    {
      title: "Schedule",
      key: "schedule",
      render: (_, record) => {
        const start = record.tripId?.startTimeSchedule?.start;
        const end = record.tripId?.startTimeSchedule?.end;
        return (
          <div className="flex flex-col">
            <span className="text-sm text-gray-800">
              {start ? formatDate(start) : "-"}
            </span>
            <span className="text-xs text-gray-500">
              {end ? `to ${formatDate(end)}` : ""}
            </span>
          </div>
        );
      },
    },
    {
      title: "Guest ID",
      dataIndex: "guestId",
      key: "guestId",
      render: (_text: string, record) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-800">
            {record?.guestId?.fullName ?? "-"}
          </span>
          <span className="text-xs text-gray-500">
            {record?.guestId?.email ?? "-"}
          </span>
        </div>
      ),
    },
    {
      title: "Type",
      key: "type",
      render: (_, record) => {
        // You can improve this when you have real type field
        const status = record.tripId?.tripStatus ?? "unknown";
        const color =
          status === "completed" ? "green" : status === "cancelled" ? "red" : status === "refund" ? "red" : "blue";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Amount",
      key: "amount",
      align: "right",
      render: (_, record) => (
        <span className={`${record?.tripId?.tripStatus === "refund" ? "text-red-600" : "text-green-600 "} font-semibold`}>
          {formatMoney(record.amount)}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: ITransaction) => (
        <Space size="middle">
          {/* View Details Tooltip */}
          <Tooltip placement="right" title="View Details">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>
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

export default TransactionTable;
