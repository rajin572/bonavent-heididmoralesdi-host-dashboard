/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";

interface EditLocationModalProps {
  isEditModalVisible: boolean;
  currentRecord: any;
  handleCancel: () => void;
}

const EditLocationModal: React.FC<EditLocationModalProps> = ({
  isEditModalVisible,
  currentRecord,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log(values);
    console.log(currentRecord);
    form.resetFields();
    handleCancel();
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
          Update Location
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="name"
            label="Location Name"
            placeholder="Enter Sub Location Name"
            rules={[
              { required: true, message: "Sub Location Name is required" },
            ]}
            labelClassName="!font-semibold"
          />
          <ReuseInput
            name="countryName"
            label="Country Name"
            placeholder="Enter Country Name"
            rules={[{ required: true, message: "Country Name is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseUpload
            label="Location Image"
            name="image"
            buttonText="Upload Image"
            accept="image/svg+xml"
            maxCount={1}
            labelClassName="!font-semibold"
          />

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Update
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditLocationModal;
