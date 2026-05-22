/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import ReuseTable from "../../../utils/ReuseTable";
import { Link } from "react-router-dom";

// Define the type for the props
interface AdminHostsReviewTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showDeleteModal: (record: any) => void; // Function to handle blocking a user
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminHostsReviewTable: React.FC<AdminHostsReviewTableProps> = ({
  data,
  loading,
  showViewModal,
  showDeleteModal,
  setPage,
  page,
  total,
  limit,
}) => {
  const columns = [
    {
      title: "Serial ID",
      dataIndex: "serialId",
      key: "serialId",
      render: (_: unknown, __: unknown, index: number) =>
        page * limit - limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Average Rating",
      dataIndex: "avgRating",
      key: "avgRating",
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="right" title="View All Reviews">
            <Link to={`/host/hosts/reviews/${record.serialId}`}>
              <button
                className="!p-0 !bg-transparent !border !border-[#6078EA] !px-2 !py-1 !rounded !text-secondary-color cursor-pointer flex gap-1 items-center"
                onClick={() => showViewModal(record)}
              >
                <GoEye style={{ fontSize: "16px" }} /> View All Reviews
              </button>
            </Link>
          </Tooltip>

          <Tooltip placement="left" title="Delete this User">
            <button
              className="!p-0 !bg-transparent !border-none !text-error-color cursor-pointer"
              onClick={() => showDeleteModal(record)}
            >
              <MdDelete
                className="text-error-color"
                style={{ fontSize: "24px" }}
              />
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

export default AdminHostsReviewTable;
