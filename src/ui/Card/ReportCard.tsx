/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoWarningOutline } from "react-icons/io5";
import { BsClock } from "react-icons/bs";
import { LuMessageSquare } from "react-icons/lu";
import ReuseButton from "../../ui/Button/ReuseButton";
import { AllImages } from "../../../public/images/AllImages";

const ReportCard = ({ data }: { data: any }) => {
  return (
    <div
      className="p-6 bg-primary-color rounded-lg mt-5"
      style={{ boxShadow: "0px 0px 3px 0.5px #00000010" }}
    >
      <div className="flex justify-between ">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <img
              src={AllImages.profile}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-xl sm:text-lg lg:text-xl font-semibold text-base-color capitalize">
                {data?.reportBy?.name}
              </h1>
              <p className="text-[10px] lg:text-xs w-fit px-2 py-0.5 rounded-full bg-[#BFC5FD] text-[#1D2939]">
                {data?.reportBy?.role}
              </p>
            </div>
          </div>
          <IoWarningOutline className="text-xl text-warning-color" />
          <div className="flex items-center gap-2">
            <img
              src={AllImages.profile}
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-xl sm:text-lg lg:text-xl font-semibold text-base-color capitalize">
                {data?.reportTo?.name}
              </h1>
              <p className="text-[10px] lg:text-xs w-fit px-2 py-0.5 rounded-full bg-[#BFC5FD] text-[#1D2939]">
                {data?.reportTo?.role}
              </p>
            </div>
          </div>
        </div>
        <span>
          <p
            className={`text-xs sm:text-sm lg:text-base bg-secondary-color text-primary-color py-0.5 px-2 rounded-full ${
              data?.status === "New"
                ? "bg-secondary-color"
                : data?.status === "Reviewing"
                ? "bg-warning-color"
                : "bg-success-color"
            }`}
          >
            {data?.status}
          </p>
        </span>
      </div>
      <div className="mt-5 flex items-center gap-5">
        <div className="flex items-center gap-1">
          <BsClock className="text-sm sm:text-base lg:text-lg text-secondary-color" />
          <span className="text-xs sm:text-sm lg:text-base text-base-color">
            {data?.date}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LuMessageSquare className="text-sm sm:text-base lg:text-lg text-secondary-color" />
          <span className="text-xs sm:text-sm lg:text-base text-base-color">
            {data?.reportType}
          </span>
        </div>
      </div>
      <p className="text-xs sm:text-sm lg:text-base text-base-color mt-5">
        {data?.description}
      </p>
      <div className="my-5 w-full h-[2px] bg-[#98A2B3] rounded-full"></div>
      <ReuseButton
        variant="secondary"
        className={`!w-fit ${
          data?.status === "Resolved"
            ? "!bg-[#ACACAC] !border-[#ACACAC] !cursor-not-allowed"
            : "!bg-secondary-color"
        }`}
      >
        {data?.status === "New"
          ? "Start Review"
          : data?.status === "Reviewing"
          ? "Mark Resolved"
          : "Resolved"}
      </ReuseButton>
    </div>
  );
};

export default ReportCard;
