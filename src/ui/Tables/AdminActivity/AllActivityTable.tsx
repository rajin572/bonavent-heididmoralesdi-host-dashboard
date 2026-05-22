/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Rate, Space, Tooltip } from "antd";
import { MdDelete } from "react-icons/md";
import ReuseTable from "../../../utils/ReuseTable";
import { FaRegEye } from "react-icons/fa6";

// Define the type for the props
interface AllActivityTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle blocking a Category
  showDeletekModal: (record: any) => void; // Function to handle unblocking a Category
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AllActivityTable: React.FC<AllActivityTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeletekModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Serial ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Activity Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center gap-2">
          <Rate
            allowHalf
            value={rating}
            disabled
            className="!text-secondary-color"
          />
          <div className="flex items-center">
            <span className="">{rating}</span>
            <span className="text-sm">(5)</span>
          </div>
        </div>
      ),
    },
    {
      title: "Price Range",
      dataIndex: "priceRange",
      key: "priceRange",
    },
    {
      title: "Host Name",
      dataIndex: "host",
      key: "host",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          {/* Block Category Tooltip */}

          <Tooltip placement="left" title="View this Activity">
            <button
              className="!p-0 !bg-transparent !border-none !text-base-color cursor-pointer"
              onClick={() => showViewModal(record)}
            >
              <FaRegEye style={{ fontSize: "24px" }} />
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Delete this Activity">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showDeletekModal(record)}
            >
              <MdDelete style={{ fontSize: "24px" }} />
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

export default AllActivityTable;
