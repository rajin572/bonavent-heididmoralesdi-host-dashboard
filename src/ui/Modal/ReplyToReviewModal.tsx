/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { StarFilled } from "@ant-design/icons";
import ReusableForm from "../Form/ReuseForm";
import ReuseInput from "../Form/ReuseInput";
import ReuseButton from "../Button/ReuseButton";

interface ReviewRecord {
  name: string;
  initials: string;
  car: string;
  tripDates: string;
  datePosted: string;
  rating: number;
  review: string;
}

interface ReplyToReviewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ReviewRecord | null;
  handleReplySubmit?: (reply: string) => void;
}

const ReplyToReviewModal: React.FC<ReplyToReviewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  handleReplySubmit,
}) => {
  const handleFinish = (values: any) => {
    if (handleReplySubmit) {
      handleReplySubmit(values.reply);
    }
    handleCancel(); // Close modal after submitting
  };

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={false}
      centered
    >
      <div className="text-base-color">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
          Reply to Review
        </h3>
        <h6 className="text-xs sm:text-sm lg:text-base text-[#667085] mt-2">
          Respond to Sarah Johnson's review
        </h6>
      </div>

      {/* Review Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-5 mt-4">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-blue-600 text-white font-bold rounded-full h-12 w-12">
              {currentRecord?.initials || "?"}
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold text-base text-[#1A202C]">
                {currentRecord?.name}
              </h3>
              <span className="text-sm text-[#718096] font-medium">
                {currentRecord?.car}
              </span>
              <span className="text-sm text-[#718096] font-medium">
                {currentRecord?.tripDates}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mt-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarFilled
                  key={i}
                  className={
                    i < (currentRecord?.rating || 0)
                      ? "!text-[#FB6514] text-xl"
                      : "text-gray-300 text-xl"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-[#718096] font-semibold">
              • {currentRecord?.datePosted}
            </span>
          </div>

          {/* Review Text */}
          <p className="mt-3 text-gray-800 text-base font-semibold">
            {currentRecord?.review}
          </p>
        </div>
      </div>

      {/* Reply Form */}
      <ReusableForm handleFinish={handleFinish}>
        <ReuseInput
          rules={[{ required: true, message: "Reply is required" }]}
          inputType="textarea"
          name="reply"
          label="Reply"
          placeholder="Write your reply here..."
        />
        <ReuseButton variant="secondary" htmlType="submit">
          Reply
        </ReuseButton>
      </ReusableForm>
    </Modal>
  );
};

export default ReplyToReviewModal;
