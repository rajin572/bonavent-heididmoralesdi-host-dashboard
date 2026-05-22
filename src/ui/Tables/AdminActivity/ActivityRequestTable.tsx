/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tooltip } from "antd";
import ReuseTable from "../../../utils/ReuseTable";
import ReuseButton from "../../Button/ReuseButton";

// Define the type for the props
interface ActivityRequestTableProps {
  data: any[]; // Replace `unknown` with the actual type of your data array
  loading: boolean;
  showApproveModal: (record: any) => void; // Function to handle blocking a Category
  showDeclineModal: (record: any) => void; // Function to handle unblocking a Category
  showDetailsModal: (record: any) => void;
  setPage: (page: number) => void; // Function to handle pagination
  page: number;
  total: number;
  limit: number;
}

const ActivityRequestTable: React.FC<ActivityRequestTableProps> = ({
  data,
  loading,
  showApproveModal,
  showDeclineModal,
  showDetailsModal,
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
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {/* Block Category Tooltip */}

            <Tooltip placement="left" title="Approve this Activity">
              <button
                className="!py-1.5 px-2 rounded-lg !bg-success-color !text-primary-color !border-none text-xs lg:text-sm cursor-pointer"
                onClick={() => showApproveModal(record)}
              >
                Approve
              </button>
            </Tooltip>

            <Tooltip placement="left" title="Decline this Activity">
              <button
                className="!py-1.5 px-2 rounded-lg !border-none !bg-error-color text-primary-color text-xs lg:text-sm cursor-pointer"
                onClick={() => showDeclineModal(record)}
              >
                Decline
              </button>
            </Tooltip>
          </div>
          <ReuseButton
            variant="outline"
            className="!py-1.5 !px-5 !w-fit "
            onClick={() => showDetailsModal(record)}
          >
            See Details
          </ReuseButton>
        </div>
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

export default ActivityRequestTable;
