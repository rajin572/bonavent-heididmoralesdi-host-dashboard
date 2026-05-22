"use client";
import { Form } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReuseButton from "../../ui/Button/ReuseButton";
import { FaArrowLeftLong } from "react-icons/fa6";
import { AllImages } from "../../../public/images/AllImages";
import { useForgetOtpVerifyMutation, useResendForgetOTPMutation } from "../../redux/features/auth/authApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Cookies from "js-cookie";

const OTPVerify = () => {

  const [form] = Form.useForm();
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const forgottenEmail = JSON.parse(Cookies.get("host.bonavent_forgetEmail") || "null");
  const forgotToken = Cookies.get(
    "host.bonavent_forgetToken",
  );
  const [otpMatch] = useForgetOtpVerifyMutation();
  const [resendOtp] = useResendForgetOTPMutation();

  const handleOTPSubmit = async () => {
    if (otp.length === 4) {
      const res = await tryCatchWrapper(
        otpMatch,
        {
          body: {
            otp: otp,
            token: forgotToken
          }
        },
        {
          toastLoadingMessage: "Verifying OTP...",
          toastSuccessMessage: "OTP Matched!",
          toastErrorMessage: "Failed to verify OTP. Please try again later.",
        },
      );
      if (res?.statusCode === 200) {
        form.resetFields();
        Cookies.remove("host.bonavent_forgetToken");
        Cookies.remove("host.bonavent_forgetEmail");
        Cookies.set("host.bonavent_forgetOtpMatchToken", res.data, {
          path: "/",
          expires: 1,
        });

        setOtp("");
        router("/update-password");
      }
    }
  };

  const handleResendOtp = async () => {
    await tryCatchWrapper(resendOtp, {}, {
      toastLoadingMessage: "Resending OTP...",
      toastSuccessMessage: "OTP Resent Successfully!",
      toastErrorMessage: "Failed to resend OTP. Please try again later.",
    });
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
                  Enter Verification Code
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-medium mb-2">
                  We've sent a 6-digit code to{" "}
                  <span className="font-semibold text-secondary-color">
                    {forgottenEmail}
                  </span>
                </p>
              </div>
            </div>
            {/* -------- Form Start ------------ */}
            <Form layout="vertical" className="bg-transparent w-full">
              <Form.Item className="">
                <div className="flex justify-center items-center">
                  <OTPInput
                    inputStyle="!w-[30px] h-[45px] md:!w-[60px] md:!h-[50px] lg:!h-[80px] text-[20px] sm:text-[30px] !bg-primary-color border !border-secondary-color/30
                      rounded-lg mr-[10px] sm:mr-[20px] !text-base-color outline-secondary-color/30  focus:ring-secondary-color/30"
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} required />}
                  />
                </div>
              </Form.Item>

              <p onClick={handleResendOtp} className="text-sm sm:text-base lg:text-lg font-medium text-secondary-color mb-7 text-center cursor-pointer">
                Resend OTP
              </p>

              <ReuseButton
                htmlType="submit"
                variant="secondary"
                onClick={handleOTPSubmit}
              >
                Verify OTP
              </ReuseButton>
            </Form>

            <div className="p-3 rounded-lg bg-[#F3F3F5] flex items-center justify-center gap-2 mt-10">
              💡 <p>Didn't receive the code? Check your spam folder or try
                resending.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default OTPVerify;
