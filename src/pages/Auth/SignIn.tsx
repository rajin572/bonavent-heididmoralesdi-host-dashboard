/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../ui/Container";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import useUserData from "../../hooks/useUserData";
import { useEffect } from "react";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { toast } from "sonner";
import Cookies from "js-cookie";

const SignIn = () => {
  const [form] = Form.useForm();
  const router = useNavigate();
  const [login] = useLoginMutation();

  const userExist = useUserData();

  useEffect(() => {
    if (userExist?.role === "admin") {
      router("/", { replace: true });
    }
  }, [router, userExist]);

  const onFinish = async (values: any) => {
    const res = await tryCatchWrapper(login, { body: values }, {
      toastLoadingMessage: "Signing In...",
      toastSuccessMessage: "Signed In Successfully!",
      toastErrorMessage: "Failed to Sign In. Please check your credentials.",
    });
    console.log(res);
    if (res?.statusCode === 200 && res?.data?.user?.role === "host") {
      Cookies.set("host.bonavent_accessToken", res?.data?.accessToken, {
        path: "/",
        expires: 365,
        secure: false,
      });
      form.resetFields();
      router("/", { replace: true });
    } else if (res?.statusCode === 200 && res?.data?.user?.role !== "host") {
      form.resetFields();
      toast.error("Access Denied", {
        duration: 2000,
      });
    }
  };
  return (
    <div className="text-base-color bg-[#6078EA]  min-h-screen flex justify-center items-center">
      <Container>
        <div className=" w-fit mx-auto bg-primary-color shadow-lg rounded-2xl">
          <div className=" p-8 rounded-2xl md:min-w-[500px]">
            <img src={AllImages.logo} alt="" className="w-auto h-20 mx-auto" />
            {/* -------- Sign In Page Header ------------ */}
            <div className="flex flex-col justify-center items-center">
              <div className="text-center mt-10 mb-5">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4">
                  Welcome Back
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-medium mb-2">
                  Sign in to your Host Dashboard
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
              <ReuseInput
                inputType="password"
                name="password"
                label="Password"
                placeholder="Enter Your Password "
                inputClassName="!py-2"
              />
              <div className="flex justify-between items-center mt-10 mb-5">
                <Checkbox className="">Remember me</Checkbox>
                <Link to="/forgot-password" className=" !underline font-bold">
                  Forgot Password?
                </Link>
              </div>
              <ReuseButton
                variant="secondary"
                htmlType="submit"
              // icon={allIcons.arrowRight}
              >
                Sign In
              </ReuseButton>
            </ReusableForm>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default SignIn;
