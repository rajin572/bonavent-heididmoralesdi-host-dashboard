import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { formatDate } from "../../../utils/dateFormet";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useCreateConversationMutation } from "../../../redux/features/conversation/conversationApi";

// import Testimonial from "../../Testimonial";

interface ViewRecentBookingReqModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITrip | null;
}
const ViewRecentBookingReqModal: React.FC<ViewRecentBookingReqModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {

  const [addConversation] = useCreateConversationMutation();



  const handleCreateChat = async (id: string) => {

    const data = {
      targetId: id,
    };

    await tryCatchWrapper(
      addConversation,
      { body: data },
      {
        toastLoadingMessage: "Creating conversation...",
        toastSuccessMessage: "Conversation created successfully!",
        toastErrorMessage: "Failed to create conversation. Please try again later.",
      }
    );

  };
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="!w-full lg:!w-[600px] rounded-3xl"
    >
      <div className="p-4">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold ">
            Booking Details
          </h3>
          <h6 className="text-xs sm:text-sm lg:text-base text-[#667085] mt-2">
            Booking information and guest details
          </h6>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Guest Name
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.guestId?.fullName}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Status
            </p>
            <p
              className={`text-xs sm:text-sm lg:text-base w-fit ${currentRecord?.tripStatus === "pending"
                ? "text-warning-color"
                : "text-secondary-color bg-[#BEDBFF] px-2 py-0.5 rounded"
                }`}
            >
              {currentRecord?.tripStatus}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Vehicle
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.vehicleId?.vehicleName}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Dates
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.startDate && currentRecord?.returnDate
                ? `${formatDate(currentRecord.startDate)} - ${formatDate(currentRecord.returnDate)}`
                : ""}
            </p>

          </div>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Total Amount
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.netFare}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Admin Amount
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.adminAmount}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Net Amount
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.hostAmount}
            </p>
          </div>
        </div>
        <div className="mt-7 flex items-center gap-4">
          <ReuseButton
            variant="highlight"
            className="!px-6 !py-5 mr-4  flex items-center justify-center gap-2"
            onClick={handleCancel}
          >
            Cancel
          </ReuseButton>
          <ReuseButton
            variant="secondary"
            className="!px-6 !py-5  flex items-center justify-center gap-2"
            onClick={() => handleCreateChat(currentRecord?.guestId?._id as string)}
          >
            Contact Guest
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRecentBookingReqModal;
