/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoreOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { BiDollar } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { IVehicleInformation } from "../../types/vehical.type";
import { getImageUrl } from "../../helpers/config/envConfig";
import { AllImages } from "../../../public/images/AllImages";

const VehiclesCard = ({
  item,
  handleViewDetails,
  handleEdit,
}: {
  item: IVehicleInformation;
  handleViewDetails: any;
  handleEdit: any;
}) => {
  const route = useNavigate();
  console.log(item)
  const items = [
    { label: "View Details", key: "view", onClick: () => handleViewDetails(item) },
    { label: "Edit Vehicle", key: "edit", onClick: () => handleEdit(item) },
    {
      label: "Manage Availability",
      key: "availability",
      onClick: () => {
        route(`/host/vehicles/availability/${item?._id}`);
      },
    },
    // {
    //   label: <span className="text-red-500">Delete</span>,
    //   key: "delete",
    //   onClick: () => handleDelete(item),
    // },
  ];

  const serverUrl = getImageUrl();

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img
          src={item?.vehicleImage?.[0] ? serverUrl + item.vehicleImage[0] : AllImages?.cover}
          className="w-full h-52 object-cover"
          alt={item?.vehicleName}
        />

        <span className="absolute top-3 right-3 bg-[#B9F8CF] text-[#008236] font-semibold text-xs px-2 py-1 rounded-md">
          {item?.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Content */}
      <div className="p-2 mt-2">
        <div className="flex justify-between items-start">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold">
            {item?.vehicleName}
          </h3>

          {/* Dropdown Menu */}
          <Dropdown menu={{ items }} trigger={["click"]}>
            <MoreOutlined className="text-[20px] cursor-pointer text-gray-600 hover:text-black" />
          </Dropdown>
        </div>

        <p className="text-xs sm:text-sm lg:text-base mt-1 text-[#4A5565] font-semibold capitalize">
          {item?.vehicleType} • {item?.vehicleModel}
        </p>

        {/* Price */}
        {/* Location */}
        <div className="text-xs sm:text-sm lg:text-base mt-2  font-semibold flex items-center gap-1 text-secondary-color ">
          <BiDollar className="text-xl " />
          <span>{item?.perDayPrice} / Day</span>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-sm text-gray-600 border-t border-gray-200 pt-2">
          <div className="text-xs sm:text-sm lg:text-base mt-1 text-[#4A5565] font-semibold">
            <p className="text-xs sm:text-sm lg:text-base mt-1 text-[#4A5565] font-semibold">
              Total Trips
            </p>
            <p className="text-[#101828]">{item?.totalTrips}</p>
          </div>

          <div className="text-xs sm:text-sm lg:text-base mt-1 text-[#4A5565] font-semibold flex flex-col items-end">
            <p className="">Rating</p>
            <p className="font-medium flex items-center">⭐ {item?.averageRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesCard;
