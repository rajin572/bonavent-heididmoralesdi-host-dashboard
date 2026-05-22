/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { Form } from "antd";
import Cookies from "js-cookie";

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(
      forgetPassword,
      { body: values },
      {
        toastLoadingMessage: "Processing...",
        toastSuccessMessage: "OTP sent to your email!",
        toastErrorMessage: "Failed to send OTP. Please try again later.",
      },
    );
    if (res?.statusCode === 200) {
      form.resetFields();
      Cookies.set("host.bonavent_forgetToken", res.data.forgetToken, {
        path: "/",
        expires: 1,
      });
      Cookies.set("host.bonavent_forgetEmail", JSON.stringify(values.email), {
        path: "/",
        expires: 1,
      });
      Cookies.remove("host.bonavent_forgetOtpMatchToken");
      router("/forgot-password/otp-verify");
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
                  Forgot Password?
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-medium mb-2">
                  Enter your email to receive a verification code
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <ReusableForm handleFinish={onFinish}>
              <ReuseInput
                name="email"
                label="Email"
                placeholder="Enter Your Email"
                inputClassName="!py-2"
              />
              <ReuseButton
                variant="secondary"
                htmlType="submit"
              // icon={allIcons.arrowRight}
              >
                Send Verification Code
              </ReuseButton>
            </ReusableForm>

            <div className="p-3 rounded-lg bg-[#F3F3F5] flex items-center justify-center gap-2 mt-10">
              💡Remember your password?{" "}
              <Link
                to="/sign-in"
                className="text-secondary-color font-semibold"
              >
                Sign In here
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ForgotPassword;
