/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Typography } from "antd";
import ReuseButton from "../../../ui/Button/ReuseButton";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const ChangePassword = () => {
  const [form] = Form.useForm();
  const [updatePassword] = useChangePasswordMutation();

  const onFinish = async (values: any) => {
    const data = {
      oldPassword: values.currentPassword,
      newPassword: values.reEnterPassword,
    };

    const res = await tryCatchWrapper(
      updatePassword,
      { body: data },
      {
        toastLoadingMessage: "Changing Password...",
        toastSuccessMessage: "Password Changed Successfully!",
        toastErrorMessage: "Failed to change password. Please try again later.",
      }
    );
    if (res.statusCode === 200) {
      form.resetFields();
      console.log(res)
      Cookies.set("host.bonavent_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
    }
  };
  return (
    <div className="bg-white rounded-lg p-10 border border-gray-200 shadow-md">
      <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
      <div className="mt-10">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="bg-transparent w-full"
        >
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Current password
          </Typography.Title>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your current password!",
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
          <Typography.Title level={5} style={{ color: "#222222" }}>
            New password
          </Typography.Title>
          <Form.Item
            rules={[
              { required: true, message: "Please enter your new password!" },
            ]}
            name="newPassword"
            className="text-white"
          >
            <Input.Password
              placeholder="Enter your password"
              className="!py-2.5 px-3 text-xl !border-none !text-base-color !bg-input-color"
            />
          </Form.Item>
          <Typography.Title level={5} style={{ color: "#222222" }}>
            Re-enter new Password
          </Typography.Title>
          <Form.Item
            name="reEnterPassword"
            className="text-white"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="!py-2.5 px-3 text-xl !border-none !text-base-color !bg-input-color"
            />
          </Form.Item>

          <Form.Item>
            <ReuseButton variant="secondary" htmlType="submit">
              Update password
            </ReuseButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;
