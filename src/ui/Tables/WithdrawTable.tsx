/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Space, Tag, Tooltip } from "antd";
import { GoEye } from "react-icons/go";
import ReuseTable from "../../utils/ReuseTable";
import { formatDate } from "../../utils/dateFormet";
import { ColumnsType } from "antd/es/table";

// Define the type for the props
interface WithdrawTableProps {
    data: ITransaction[]; // Replace `unknown` with the actual type of your data array
    loading: boolean;
    showViewModal: (record: ITransaction) => void; // Function to handle viewing a user
    setPage?: (page: number) => void; // Function to handle pagination
    page?: number;
    total?: number;
    limit?: number;
}

const WithdrawTable: React.FC<WithdrawTableProps> = ({
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

    const statusColor = (status?: string) => {
        const s = (status || "").toLowerCase();
        if (s === "approved") return "green";
        if (s === "pending" || s === "processing") return "gold";
        if (s === "rejected" || s === "failed") return "red";
        return "blue";
    };

    const providerColor = (provider?: string) => {
        const p = (provider || "").toLowerCase();
        if (p === "stripe") return "purple";
        if (p === "paypal") return "blue";
        if (p === "bank") return "geekblue";
        return "default";
    };

    const columns: ColumnsType<IWithdrawTransaction> = [
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
            title: "User ID",
            dataIndex: "userId",
            key: "userId",
            render: (text: string) => (
                <span className="text-gray-700 font-medium">{text}</span>
            ),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: string) => <Tag color="cyan">{String(role).toUpperCase()}</Tag>,
        },
        {
            title: "Provider",
            dataIndex: "paymentProvider",
            key: "paymentProvider",
            render: (provider: string) => (
                <Tag color={providerColor(provider)}>{String(provider).toUpperCase()}</Tag>
            ),
        },
        {
            title: "Type",
            dataIndex: "transactionType",
            key: "transactionType",
            render: (type: string) => <Tag>{String(type).toUpperCase()}</Tag>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={statusColor(status)}>{String(status).toUpperCase()}</Tag>
            ),
        },
        {
            title: "Amount",
            key: "amount",
            align: "right",
            render: (_, record) => (
                <span className="text-red-600 font-semibold">
                    -{formatMoney(record.amount)}
                </span>
            ),
        },
        {
            title: "Stripe Transfer",
            dataIndex: "stripeTransferId",
            key: "stripeTransferId",
            render: (id?: string) => (
                <span className="text-gray-700">{id ? id : "-"}</span>
            ),
        },
        {
            title: "Action",
            key: "action",
            align: "center",
            render: (_: unknown, record: any) => (
                <Space size="middle">
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

export default WithdrawTable;
