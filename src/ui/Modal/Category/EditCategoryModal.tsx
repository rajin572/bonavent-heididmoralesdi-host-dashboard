/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";

interface EditCategoryModalProps {
  isEditModalVisible: boolean;
  activeTab: string;
  currentRecord: any;
  handleCancel: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isEditModalVisible,
  activeTab,
  currentRecord,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log({ values, currentRecord });
  };
  return (
    <Modal
      open={isEditModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8">
          Update{" "}
          {activeTab === "mainCategory" ? "Main Category" : "Sub Category"}
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          {activeTab === "mainCategory" ? (
            <>
              <ReuseInput
                name="name"
                label="Category Name"
                placeholder="Enter Category Name"
                rules={[
                  { required: true, message: "Category Name is required" },
                ]}
                labelClassName="!font-semibold"
              />

              <ReuseUpload
                label="Upload Icon"
                name="icon"
                buttonText="Upload Icon In SVG Format"
                accept="image/svg+xml"
                maxCount={1}
                labelClassName="!font-semibold"
              />
            </>
          ) : (
            <>
              <ReuseInput
                name="name"
                label="Category Name"
                placeholder="Enter Sub Category Name"
                rules={[
                  { required: true, message: "Sub Category Name is required" },
                ]}
                labelClassName="!font-semibold"
              />

              <ReuseUpload
                label="Upload Image"
                name="image"
                buttonText="Upload Image"
                accept="image/svg+xml"
                maxCount={1}
                labelClassName="!font-semibold"
              />
            </>
          )}
          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Update
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
