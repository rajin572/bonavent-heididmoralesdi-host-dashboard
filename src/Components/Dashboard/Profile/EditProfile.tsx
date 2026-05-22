/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography, Upload } from "antd";
import { useEffect, useState } from "react";
import { AllImages } from "../../../../public/images/AllImages";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { useGetProfileQuery, useMyPerformanceQuery, useUpdateProfileMutation } from "../../../redux/features/profile/profileApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { IoCameraOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDate } from "../../../utils/dateFormet";
import { MdOutlineEdit } from "react-icons/md";
import ReuseButton from "../../../ui/Button/ReuseButton";
import Loading from "../../../ui/Loading";

interface ProfileData {
  fullName: string;
  email: string;
  role?: string;
  bio: string;
  phone: string;
  phoneCode?: string;
  isVerifiedPhone?: boolean;
  profileImage: string;
  hasDrivingLicense?: boolean;
  memberSince: string;
}

const EditProfile = () => {
  const [form] = Form.useForm();
  const serverUrl = getImageUrl();
  const [imageUrl, setImageUrl] = useState<string | null>(AllImages.profile);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [updateProfile] = useUpdateProfileMutation();
  console.log(imageUrl)

  const { data, isFetching } = useGetProfileQuery({}, { refetchOnMountOrArgChange: true });
  const { data: performanceData, isFetching: isFetchingPerformance } = useMyPerformanceQuery({}, { skip: isFetching, refetchOnMountOrArgChange: true });

  console.log(performanceData)


  useEffect(() => {
    const userdata: ProfileData = {
      fullName: data?.data?.fullName || "",
      email: data?.data?.email || "",
      phone: data?.data?.phone || "",
      phoneCode: data?.data?.phoneCode || "",
      bio: data?.data?.bio || "",
      profileImage: data?.data?.profileImage || "",

      // totalTrips: 156,
      // avgRating: 4.9,
      // vehicles: 8,
      // responseRate: "98%",
      memberSince: data?.data?.createdAt || "",
    };
    setProfileData(data?.data);
    form.setFieldsValue({
      fullName: userdata?.fullName,
      email: userdata?.email,
      phone: userdata?.phone,
      phoneCode: userdata?.phoneCode,
      bio: userdata?.bio,
    });
    setImageUrl(data?.data?.profileImage?.length ? serverUrl + data?.data?.profileImage : AllImages.profile);
  }, [data, data?.profileImage, form, profileData, serverUrl]);

  const handleImageUpload = (info: any) => {
    if (info.file.status === "removed") {
      setImageUrl(AllImages.profile);
    } else {
      const file = info.file.originFileObj || info.file;
      if (file) {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  const onFinish = async (values: any) => {
    console.log("Updated Profile:", values);
    console.log("Profile Image URL:", imageUrl);

    const formData = new FormData();
    if (values?.image?.file?.originFileObj) {
      console.log(values?.image?.file?.originFileObj)
      formData.append("image", values?.image?.file?.originFileObj);
    }
    const data = {
      fullName: values?.fullName,
      phone: values?.phone,
      phoneCode: values?.phoneCode,
      bio: values?.bio,
    };
    formData.append("data", JSON.stringify(data));
    await tryCatchWrapper(
      updateProfile,
      { body: formData },
      {
        toastLoadingMessage: "Updating Profile...",
        toastSuccessMessage: "Profile Updated Successfully!",
        toastErrorMessage: "Failed to update profile. Please try again later.",
      }
    );
  };

  if (isFetching) {
    return <Loading />;
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" p-6">
        <div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl  font-bold mb-3">
            Settings
          </h1>
          <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-[#667085] mb-10">
            Manage your account and preferences
          </h3>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Section - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="relative">
                  <div className=" relative flex justify-center items-center bg-[#5569D8] rounded-lg py-10">
                    <img
                      className="h-40 w-40 relative rounded-full border border-secondary-color/10 object-contain"
                      src={imageUrl || AllImages.profile}
                      alt=""
                    />
                    <Form.Item name="image">
                      <Upload
                        customRequest={(options) => {
                          setTimeout(() => {
                            if (options.onSuccess) {
                              options.onSuccess("ok");
                            }
                          }, 1000);
                        }}
                        onChange={handleImageUpload}
                        maxCount={1}
                        accept="image/*"
                        listType="text"
                        className="absolute top-16 !right-3 text-end"
                      >
                        <Button
                          style={{
                            zIndex: 1,
                          }}
                          className=" !py-2 !px-1.5 w-fit h-fit !rounded-full shadow !text-secondary-color !border-secondary-color !bg-[#EFEFEF]"
                        >
                          <IoCameraOutline
                            className="w-5 h-5 !text-secondary-color"
                            style={{ color: "#19363D" }}
                          />
                        </Button>
                      </Upload>
                    </Form.Item>
                  </div>

                  <div className="text-center mt-10">
                    <h2 className="text-2xl font-bold text-[#19363D]">
                      {profileData?.fullName}
                    </h2>
                    <p className="text-sm text-gray-500">{profileData?.email}</p>
                  </div>


                  {/* Stats Badges */}
                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="bg-purple-600 text-white rounded-xl p-6">
                      <div className="text-2xl font-bold">
                        {isFetchingPerformance ? "..." : performanceData?.data?.totalEarning || 0}
                      </div>
                      <div className="text-sm opacity-90">Earnings</div>
                    </div>
                    <div className="bg-blue-600 text-white rounded-xl p-6">
                      <div className="text-2xl font-bold">
                        {isFetchingPerformance ? "..." : performanceData?.data?.totalTrip || 0}
                      </div>
                      <div className="text-sm opacity-90">Total Trips</div>
                    </div>
                    <div className="bg-yellow-500 text-white rounded-xl p-6">
                      <div className="text-2xl font-bold">
                        {isFetchingPerformance ? "..." : performanceData?.data?.averageRating || 0}
                      </div>
                      <div className="text-sm opacity-90">Avg Rating</div>
                    </div>
                    <div className="bg-green-600 text-white rounded-xl p-6">
                      <div className="text-2xl font-bold">
                        {isFetchingPerformance ? "..." : performanceData?.data?.totalVehicle || 0}
                      </div>
                      <div className="text-sm opacity-90">Vehicles</div>
                    </div>

                  </div>

                  <div className="mt-6 text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>Member since {formatDate(profileData?.memberSince)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Edit Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <Typography.Title
                  level={3}
                  className="text-[#000] !mb-6 font-bold"
                >
                  Personal Information
                </Typography.Title>

                {/* Full Name */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">Full Name</span>
                  }
                  name="fullName"
                  className="mb-4"
                >
                  <Input
                    suffix={<MdOutlineEdit className="text-gray-400" />}
                    placeholder="Enter your full name"
                    className="h-12 text-base border-gray-200 focus:border-[#19363D] hover:border-[#19363D]/50"
                  />
                </Form.Item>

                {/* Email Address */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Email Address
                    </span>
                  }
                  name="email"
                  className="mb-4"
                >
                  <Input
                    suffix={<MdOutlineEdit className="text-gray-400" />}
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 text-base border-gray-200 focus:border-[#19363D] hover:border-[#19363D]/50"
                  />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Phone Code
                    </span>
                  }
                  name="phoneCode"
                  className="mb-4"
                >
                  <Input
                    suffix={<MdOutlineEdit className="text-gray-400" />}
                    placeholder="Enter your phone code"
                    className="h-12 text-base border-gray-200 focus:border-[#19363D] hover:border-[#19363D]/50"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Phone Number
                    </span>
                  }
                  name="phone"
                  className="mb-4"
                >
                  <Input
                    suffix={<MdOutlineEdit className="text-gray-400" />}
                    placeholder="Enter your phone number"
                    className="h-12 text-base border-gray-200 focus:border-[#19363D] hover:border-[#19363D]/50"
                  />
                </Form.Item>

                {/* Bio */}
                <Form.Item
                  label={<span className="text-gray-700 font-medium">Bio</span>}
                  name="bio"
                  className="mb-6"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="text-base border-gray-200 focus:border-[#19363D] hover:border-[#19363D]/50 resize-none"
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="mb-0">
                  <ReuseButton
                    variant="secondary"
                    htmlType="submit"
                    className="w-full h-12 text-base font-medium"
                  >
                    Save & Change
                  </ReuseButton>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div >
  );
};

export default EditProfile;
