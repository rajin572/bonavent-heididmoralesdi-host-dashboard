import { Switch } from "antd";
import { MdDelete, MdEdit } from "react-icons/md";
import ReuseButton from "../Button/ReuseButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
const PromoCard = ({
  data,
  showEditModal,
  showDeleteModal,
  showViewModal,
}: {
  data: any;
  showEditModal: (data: any) => void;
  showDeleteModal: (data: any) => void;
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
        <div className="flex items-center gap-2">
          <Switch defaultChecked onChange={() => {}} size="small" />
          <MdEdit
            className="text-secondary-color size-6 cursor-pointer"
            onClick={() => showEditModal(data)}
          />
          <MdDelete
            className="text-red-500 size-6 cursor-pointer"
            onClick={() => showDeleteModal(data)}
          />
        </div>
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
          <span className="font-semibold">Expires:</span>
          <span>{data.expiryDate}</span>
        </div>
        <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
          <span className="font-semibold">Status:</span>
          <span>{data.status}</span>
        </div>
      </div>
      <ReuseButton onClick={() => showViewModal(data)} variant="secondary">
        View Details
      </ReuseButton>
    </div>
  );
};

export default PromoCard;
