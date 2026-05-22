/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";

interface AddCategoryModalProps {
  isAddModalVisible: boolean;
  activeTab: string;
  handleCancel: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isAddModalVisible,
  activeTab,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[500px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8">
          Create{" "}
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
            Add
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
