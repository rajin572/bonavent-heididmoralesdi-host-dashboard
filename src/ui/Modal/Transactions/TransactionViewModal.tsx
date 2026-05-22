import React from "react";
import { Modal, Tag } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { formatDate } from "../../../utils/dateFormet";

type ModalOption = "transactions" | "withdrawals";
type ModalRecord = ITransaction | IWithdrawTransaction;

interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ModalRecord | null;
  option: ModalOption;
  onDownloadReceipt?: (record: ModalRecord) => void;
}

const formatMoney = (value?: number) => {
  const n = Number(value ?? 0);
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const statusColor = (status?: string) => {
  const s = (status || "").toLowerCase();
  if (s === "approved" || s === "completed") return "green";
  if (s === "pending" || s === "processing") return "gold";
  if (s === "refund" || s === "failed" || s === "cancelled") return "red";
  if (s === "rejected" || s === "failed" || s === "cancelled") return "red";
  return "blue";
};

const providerColor = (provider?: string) => {
  const p = (provider || "").toLowerCase();
  if (p === "stripe") return "purple";
  if (p === "paypal") return "blue";
  if (p === "bank") return "geekblue";
  return "default";
};

const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  option,
  onDownloadReceipt,
}) => {
  const isWithdraw = option === "withdrawals";
  const title = isWithdraw ? "Withdrawal Details" : "Transaction Details";

  if (!currentRecord) {
    return (
      <Modal open={isViewModalVisible} onCancel={handleCancel} footer={false}>
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{title}</h3>
          <p className="text-sm text-[#667085] mt-2">No details available.</p>
        </div>
      </Modal>
    );
  }

  const amountText = isWithdraw
    ? `-${formatMoney((currentRecord as IWithdrawTransaction).amount)}`
    : `+${formatMoney((currentRecord as ITransaction).amount)}`;

  const amountClass = isWithdraw ? "text-red-600" : "text-success-color";

  return (
    <Modal open={isViewModalVisible} onCancel={handleCancel} footer={false}>
      {/* Header */}
      <div className="text-base-color">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{title}</h3>
        <h6 className="text-xs sm:text-sm lg:text-base text-[#667085] mt-2">
          Complete information about this {isWithdraw ? "withdrawal" : "transaction"}.
        </h6>
      </div>

      {/* Body */}
      {!isWithdraw ? (
        // ================= TRANSACTION =================
        <div>
          <div className="text-xs sm:text-sm lg:text-base mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
            <Info label="Date" value={formatDate((currentRecord as ITransaction).createdAt)} />

            <Info
              label="Status"
              valueNode={
                <Tag color={statusColor((currentRecord as ITransaction).tripId?.tripStatus)}>
                  {String((currentRecord as ITransaction).tripId?.tripStatus ?? "UNKNOWN").toUpperCase()}
                </Tag>
              }
            />

            <Info
              label="Trip"
              value={
                (currentRecord as ITransaction).tripId?.tripCustomID ??
                (currentRecord as ITransaction).tripId?._id ??
                "-"
              }
            />

            {/* <Info label="Guest ID" value={(currentRecord as ITransaction).guestId} /> */}

            {/* <Info label="Host ID" value={(currentRecord as ITransaction).hostId} /> */}

            <Info
              label="Schedule"
              value={
                (currentRecord as ITransaction).tripId?.startTimeSchedule?.start
                  ? `${formatDate((currentRecord as ITransaction).tripId?.startTimeSchedule?.start)} → ${formatDate(
                    (currentRecord as ITransaction).tripId?.startTimeSchedule?.end
                  )}`
                  : "-"
              }
            />

            <Info
              label="Amount"
              valueNode={
                <span className={`text-sm sm:text-base lg:text-lg font-semibold ${amountClass}`}>
                  {amountText}
                </span>
              }
            />
          </div>


        </div>
      ) : (
        // ================= WITHDRAWAL =================
        <div className="text-xs sm:text-sm lg:text-base mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Info label="Date" value={formatDate((currentRecord as IWithdrawTransaction).createdAt)} />

          <Info
            label="Status"
            valueNode={
              <Tag color={statusColor((currentRecord as IWithdrawTransaction).status)}>
                {String((currentRecord as IWithdrawTransaction).status ?? "UNKNOWN").toUpperCase()}
              </Tag>
            }
          />

          <Info label="User ID" value={(currentRecord as IWithdrawTransaction).userId} />

          <Info
            label="Role"
            valueNode={
              <Tag color="cyan">
                {String((currentRecord as IWithdrawTransaction).role ?? "-").toUpperCase()}
              </Tag>
            }
          />

          <Info
            label="Provider"
            valueNode={
              <Tag color={providerColor((currentRecord as IWithdrawTransaction).paymentProvider)}>
                {String((currentRecord as IWithdrawTransaction).paymentProvider ?? "-").toUpperCase()}
              </Tag>
            }
          />

          <Info
            label="Type"
            valueNode={<Tag>{String((currentRecord as IWithdrawTransaction).transactionType ?? "-").toUpperCase()}</Tag>}
          />

          <Info
            label="Amount"
            valueNode={
              <span className={`text-sm sm:text-base lg:text-lg font-semibold ${amountClass}`}>
                {amountText}
              </span>
            }
          />

          <Info
            label="Stripe Transfer ID"
            value={(currentRecord as IWithdrawTransaction).stripeTransferId ?? "-"}
          />
        </div>
      )}

      {/* Footer */}
      <div className="mt-5">
        <ReuseButton
          variant="secondary"
          onClick={() => onDownloadReceipt?.(currentRecord)}
        >
          Download Receipt
        </ReuseButton>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;

function Info({
  label,
  value,
  valueNode,
}: {
  label: string;
  value?: string;
  valueNode?: React.ReactNode;
}) {
  return (
    <div className="space-y-2 flex flex-col">
      <span className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
        {label}:
      </span>
      {valueNode ? (
        valueNode
      ) : (
        <span className="text-xs sm:text-sm lg:text-base">{value ?? "-"}</span>
      )}
    </div>
  );
}
