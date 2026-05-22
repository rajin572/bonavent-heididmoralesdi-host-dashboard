/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Tag } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import ReuseButton from "../../Button/ReuseButton";
interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any;
}
const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-2">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary-color">
            User Details
          </h3>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <img
              src={AllImages.profile}
              alt={currentRecord?.name}
              className="w-32 h-32 object-cover rounded"
            />
            <h2 className="text-base sm:text-lg lg:text-xl font-bold text-secondary-color">
              {currentRecord?.name}
            </h2>
          </div>

          <div className="my-5">
            <div className="text-xs sm:text-sm lg:text-base  mt-3">
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Email:</span>
                <span>{currentRecord?.email}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Location:</span>
                <span>{currentRecord?.location || "George Town"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                <span className="font-semibold">Activity Complete: </span>
                <span className="">{currentRecord?.activityCompleted}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                <span className="font-semibold">Activity Cancelled: </span>
                <span className="">{currentRecord?.activityCancelled}</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1 gap-2 mb-2">
                <span className="font-semibold">Favorite Activity: </span>
                <span className="">
                  {currentRecord?.favoriteActivities?.map(
                    (activity: string, index: number) => (
                      <Tag color="blue" key={index}>
                        {activity}
                      </Tag>
                    )
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Date of Birth:</span>
                <span>01/01/2025</span>
              </div>
              <div className="flex items-center justify-between border-b border-input-color py-1  gap-2 mb-2">
                <span className="font-semibold">Joining Date:</span>
                <span>30/08/2025</span>
              </div>
            </div>
          </div>

          <ReuseButton variant="secondary">Message</ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
