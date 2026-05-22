/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";

interface ViewPromoModalProps<T> {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: T | null;
}

const ViewPromoModal: React.FC<ViewPromoModalProps<any>> = ({
  isViewModalVisible,
  currentRecord,
  handleCancel,
}) => {
  //   const [blockUser] = useBlockUserMutation();

  return (
    <Modal
      // title="Confirm Delete"
      open={isViewModalVisible}
      onCancel={handleCancel}
      cancelText="Cancel"
      // styles.body={{ textAlign: "center" }}
      footer={false}
    >
      <div className="mt-5 ">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-base-color capitalize mb-12">
          {currentRecord?.name}
        </h1>
        <div className="flex flex-col gap-2 border-b border-base-color/20 py-1 mb-5">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color ">
            Description
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-base-color/60">
            {currentRecord?.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-base-color/20 py-1 mb-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color ">
              Discount
            </h3>
            <p className="text-xl sm:text-2xl lg:text-3xl text-secondary-color">
              {currentRecord?.discount}%
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color ">
              Description
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-base-color/60">
              Admin Created
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-b border-base-color/20 py-1 mb-5">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color ">
            Minimum Spend
          </h3>
          <p className="text-xs sm:text-sm lg:text-base text-base-color/60">
            {currentRecord?.minSpend}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 border-b border-base-color/20 py-1 mb-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color ">
              Created
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-base-color/60">
              2023-01-01
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-base-color ">
              Expires
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-base-color/60">
              {currentRecord?.expiryDate}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewPromoModal;
