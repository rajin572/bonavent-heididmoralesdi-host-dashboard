import ReuseButton from "../Button/ReuseButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PromoRequestCard = ({
  data,
  showApproveModal,
  showDeclineModal,
  showViewModal,
}: {
  data: any;
  showApproveModal: (data: any) => void;
  showDeclineModal: (data: any) => void;
  showViewModal: (data: any) => void;
}) => {
  return (
    <div
      className="p-4 bg-primary-color rounded-lg mt-5"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between items-center gap-5 mb-2">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-color capitalize">
          {data.name}
        </h1>
      </div>
      <p className="text-xs sm:text-sm lg:text-base text-base-color/60 mb-5">
        {data.description}
      </p>
      <div>
        <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
          <span className="font-semibold">Discount:</span>
          <span>{data.discount}%</span>
        </div>
        <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
          <span className="font-semibold">Min Spend:</span>
          <span>${data.minSpend}</span>
        </div>
        <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
          <span className="font-semibold">Requested:</span>
          <span>{data.expiryDate}</span>
        </div>
        <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
          <span className="font-semibold">Status:</span>
          <span>{data.status}</span>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <ReuseButton
          onClick={() => showApproveModal(data)}
          variant="secondary"
          className=" !bg-success-color !text-primary-color !border-none"
        >
          Approve
        </ReuseButton>
        <ReuseButton
          onClick={() => showDeclineModal(data)}
          variant="secondary"
          className=" !bg-error-color !text-primary-color !border-none"
        >
          Decline
        </ReuseButton>
      </div>
      <ReuseButton
        onClick={() => showViewModal(data)}
        variant="secondary"
        className="!bg-[#667085] !border-[#667085] !text-primary-color mt-5"
      >
        View Details
      </ReuseButton>
    </div>
  );
};

export default PromoRequestCard;
