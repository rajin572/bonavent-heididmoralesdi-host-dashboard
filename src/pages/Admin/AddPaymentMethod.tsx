/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Radio, message, Alert } from "antd";
import ReuseInput from "../../ui/Form/ReuseInput";
import { MdLock } from "react-icons/md";
import ReuseButton from "../../ui/Button/ReuseButton";

const AddPaymentMethod = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form Data:", values);
    message.success("Payment method added successfully!");
    alert(`Form Data:\n${JSON.stringify(values, null, 2)}`);
  };

  return (
    <div className=" mt-10 space-y-6">
      {/* Info Alert */}
      <Alert
        message="You won’t be charged until you book a trip or receive a payout"
        type="info"
        showIcon
        className="rounded-lg !text-sm sm:!text-base lg:!text-lg !p-5 !font-bold"
      />

      {/* Payment Type */}
      <div className="my-10">
        <Form form={form} onFinish={onFinish}>
          <div className="!rounded-xl border border-gray-200 bg-primary-color p-5">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold tex-[#1E1E1E] mb-3">
              Payment Type
            </h3>
            <Form.Item name="paymentType" initialValue="card" className="!mb-0">
              <Radio.Group className="flex !flex-col space-y-2">
                <Radio value="card">Credit/Debit Card</Radio>
                <Radio value="bank">Bank Account</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          {/* Card Details */}
          <div className="mt-6 border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-bold tex-[#1E1E1E] mb-3">
              Card Details
            </h3>

            <ReuseInput
              name="cardNumber"
              label="Card Number"
              placeholder="Enter Card Number"
              rules={[{ required: true, message: "Please enter card number" }]}
              labelClassName="!font-semibold"
            />

            <ReuseInput
              name="cardHolderName"
              label="Card Holder Name"
              placeholder="Enter Card Holder Name"
              rules={[
                { required: true, message: "Please enter card holder name" },
              ]}
              labelClassName="!font-semibold"
            />

            <div className="grid grid-cols-2 gap-3">
              <ReuseInput
                name="expiryDate"
                label="Expiry Date"
                placeholder="MM/YY"
                rules={[
                  { required: true, message: "Please enter expiry date" },
                ]}
                labelClassName="!font-semibold"
              />

              <ReuseInput
                name="cvv"
                label="CVV"
                placeholder="CVV"
                rules={[{ required: true, message: "Please enter CVV" }]}
                labelClassName="!font-semibold"
              />
            </div>

            <ReuseInput
              name="billingAddress"
              label="Billing Address"
              placeholder="Enter Billing Address"
              rules={[
                { required: true, message: "Please enter billing address" },
              ]}
              labelClassName="!font-semibold"
            />
          </div>

          {/* Security Info */}
          <div className="my-6 bg-[#F0FDF4] border border-green-100 text-sm rounded-xl p-3 flex items-center space-x-2 ">
            <MdLock className="mt-0.5 text-2xl text-green-600" />
            <div>
              <p className="text-xs sm:text-sm lg:text-base font-bold  text-[#1D2939]">
                Your information is secure:
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                We use bank-level encryption to protect your payment details.
                Your information is never shared with third parties.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Form.Item className="mt-6">
            <ReuseButton
              variant="secondary"
              htmlType="submit"
              className="w-full"
            >
              Add Payment Method
            </ReuseButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddPaymentMethod;
