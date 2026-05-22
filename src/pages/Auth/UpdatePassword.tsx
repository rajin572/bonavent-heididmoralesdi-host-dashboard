/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AllImages } from "../../../public/images/AllImages";
import { Form } from "antd";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [resetPassword] = useResetPasswordMutation();
  const router = useNavigate();
  const onFinish = async (values: any) => {
    const data = {
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };

    const res = await tryCatchWrapper(
      resetPassword,
      { body: data },
      {
        toastLoadingMessage: "Updating Password...",
        toastSuccessMessage: "Password Updated Successfully!",
        toastErrorMessage: "Failed to update password. Please try again later.",
      }
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.remove("host.bonavent_forgetOtpMatchToken");
      router("/sign-in");
    }
  };


  return (
    <div className="text-base-color bg-[#6078EA]  min-h-screen flex justify-center items-center">
      <Container>
        <div className=" w-fit mx-auto bg-primary-color shadow-lg rounded-2xl">
          <div className=" p-8 rounded-2xl md:min-w-[500px]">
            <div className="text-base-color w-fit me-auto !text-sm mb-5">
              <Link
                to="/sign-in"
                className="flex justify-center items-center  gap-2 "
              >
                <FaArrowLeftLong className="size-3" />
                <span>Back to Sign In</span>
              </Link>
            </div>
            <img src={AllImages.logo} alt="" className="w-auto h-20 mx-auto" />
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-10 mb-5">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4">
                  Set New Password
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-medium mb-2">
                  Create a strong password for your account
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                rules={[{ required: true, message: "Password is required" }]}
                inputClassName="!py-2"
              />
              <ReuseInput
                inputType="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Your Password "
                rules={[
                  { required: true, message: "Confirm Password is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
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
                inputClassName="!py-2"
              />

              <ReuseButton
                variant="secondary"
                htmlType="submit"
              // icon={allIcons.arrowRight}
              >
                Change Password
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default UpdatePassword;
