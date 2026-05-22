/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";
import ReuseDatePicker from "../../Form/ReuseDatePicker";

const EditPromoModal = ({
  isEditModalVisible,
  currentRecord,
  handleCancel,
}: {
  isEditModalVisible: boolean;
  currentRecord: any;
  handleCancel: () => void;
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
          Update Promo
        </h1>
        <ReusableForm form={form} handleFinish={onSubmit}>
          <ReuseInput
            name="title"
            label="Promo Title"
            placeholder="Enter Promo Title"
            rules={[{ required: true, message: "Promo Title is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="description"
            label="Description"
            inputType="textarea"
            rows={4}
            placeholder="Enter Description"
            rules={[{ required: true, message: "Description is required" }]}
            labelClassName="!font-semibold"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReuseInput
              name="discount"
              label="Discount"
              placeholder="Enter Discount"
              rules={[{ required: true, message: "Discount is required" }]}
              labelClassName="!font-semibold"
            />
            <ReuseSelect
              name="type"
              label="Type"
              placeholder="Select Type"
              rules={[{ required: true, message: "Type is required" }]}
              labelClassName="!font-semibold"
              options={[
                { value: "fixed", label: "Fixed Amount" },
                { value: "percentage", label: "Percentage" },
              ]}
            />
          </div>

          <ReuseInput
            name="minSpend"
            label="Minimumn Spend (Optional)"
            placeholder="Enter Minimumn Spend"
            labelClassName="!font-semibold"
          />
          <ReuseDatePicker name="expiryDate" label="Expiry Date" />
          <ReuseSelect
            name="status"
            label="Status"
            placeholder="Select Status"
            rules={[{ required: true, message: "Status is required" }]}
            labelClassName="!font-semibold"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />

          <ReuseButton htmlType="submit" variant="secondary" className="mt-2">
            Update
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditPromoModal;
