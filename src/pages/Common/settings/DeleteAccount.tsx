/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Typography, Modal } from "antd";
import ReuseButton from "../../../ui/Button/ReuseButton";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import Cookies from "js-cookie";
import { useDeleteProfileMutation } from "../../../redux/features/profile/profileApi";

const DeleteAccount = () => {
  const [form] = Form.useForm();
  const [deleteProfile] = useDeleteProfileMutation();

  const onFinish = async (values: any) => {
    Modal.confirm({
      title: "Confirm account deletion",
      content:
        "Are you sure you want to delete your account? This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      async onOk() {
        const data = {
          password: values.currentPassword,
        };

        const res = await tryCatchWrapper(
          deleteProfile,
          { body: data },
          {
            toastLoadingMessage: "Deleting account...",
            toastSuccessMessage: "Account deleted successfully!",
            toastErrorMessage:
              "Failed to delete account. Please try again later.",
          }
        );

        if (res?.statusCode === 200) {
          form.resetFields();
          Cookies.remove("host.bonavent_accessToken");
          window.location.reload();
        }
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-10 border border-[#FFC9C9] shadow-md">
      <h2 className="text-xl font-bold text-[#D4183D]">Delete Account</h2>

      <div className="mt-3 mb-10">
        <p className="text-base text-gray-600 font-medium">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <Typography.Title level={5} style={{ color: "#222222" }}>
          password
        </Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter your  password!",
            },
          ]}
          name="currentPassword"
          className="text-white "
        >
          <Input.Password
            placeholder="Enter your password"
            className="!py-2.5 px-3 text-xl !border-none !text-base-color !bg-input-color"
          />
        </Form.Item>

        <Form.Item>
          <ReuseButton
            variant="secondary"
            htmlType="submit"
            className="!bg-[#D4183D] !border-[#D4183D]"
          >
            Delete
          </ReuseButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DeleteAccount;
