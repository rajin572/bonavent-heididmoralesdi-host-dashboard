/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tooltip } from "antd";
import ReuseTable from "../../../utils/ReuseTable";

interface AdminHostRequestTableProps {
  data: any; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showViewModal: (record: any) => void; // Function to handle viewing a user
  showApproveModal: (record: any) => void; // Function to handle blocking a user
  showDeclineModal: (record: any) => void; // Function to handle unblocking a user
  setPage?: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const AdminHostRequestTable: React.FC<AdminHostRequestTableProps> = ({
  data,
  loading,
  showViewModal,
  showApproveModal,
  showDeclineModal,
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
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Host Type", dataIndex: "hostType", key: "hostType" },
    {
      title: "Documents",
      dataIndex: "documents",
      key: "documents",
      render: (record: any) => {
        return (
          <Tooltip placement="right" title="View Documents">
            <button
              className="py-1.5 px-3 !bg-[#EFF7FF] border rounded-lg !border-secondary-color  !text-secondary-color text-xs lg:text-sm cursor-pointer flex items-center gap-2"
              onClick={() => showViewModal(record)}
            >
              View Documents{" "}
              <p className="w-6 h-6 rounded-full bg-secondary-color text-primary-color flex items-center justify-center">
                2
              </p>
            </button>
          </Tooltip>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: unknown, record: any) => (
        <Space size="middle">
          <Tooltip placement="left" title="Approve this host">
            <button
              className="!py-1.5 px-2 rounded-lg !bg-success-color !text-primary-color !border-none text-xs lg:text-sm cursor-pointer"
              onClick={() => showApproveModal(record)}
            >
              Approve
            </button>
          </Tooltip>

          <Tooltip placement="left" title="Decline this host">
            <button
              className="!py-1.5 px-2 rounded-lg !border-none !bg-error-color text-primary-color text-xs lg:text-sm cursor-pointer"
              onClick={() => showDeclineModal(record)}
            >
              Decline
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

export default AdminHostRequestTable;
