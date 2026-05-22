import { Image, Modal } from "antd";
import { useState } from "react";
import ReuseButton from "../../Button/ReuseButton";
import { FaStar } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { AllImages } from "../../../../public/images/AllImages";
import { IVehicleInformation } from "../../../types/vehical.type";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { formatDate } from "../../../utils/dateFormet";

interface ViewAdminVehicleModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IVehicleInformation;
  showEditModal: (data: IVehicleInformation) => void;
}

const ViewAdminVehicleModal: React.FC<ViewAdminVehicleModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  showEditModal,
}) => {
  const serverUrl = getImageUrl();
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);

  const isPdf = (path: string) => path.toLowerCase().endsWith(".pdf");

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="!w-full lg:!w-[900px] rounded-3xl"
    >
      <div className="px-4 max-h-[80vh] overflow-y-auto mt-8">
        {/* Header Section */}
        <div className="text-base-color">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
            {currentRecord?.vehicleName} {currentRecord?.vehicleModel}
          </h3>
          <h6 className="text-xs sm:text-sm lg:text-base text-[#667085] mt-2">
            {currentRecord?.trimLevel && `${currentRecord.trimLevel} • `}
            {currentRecord?.vinNumber || 'N/A'}
          </h6>
        </div>

        {/* Vehicle Images Gallery */}
        <div className="mt-5">
          {currentRecord?.vehicleImage && currentRecord.vehicleImage.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <img
                src={serverUrl + currentRecord.vehicleImage[0]}
                alt="vehicle main"
                className="w-full h-[300px] object-cover rounded-lg col-span-1 md:col-span-2"
              />
              {currentRecord.vehicleImage.slice(1, 5).map((img, index) => (
                <img
                  key={index}
                  src={serverUrl + img}
                  alt={`vehicle ${index + 2}`}
                  className="w-full h-[150px] object-cover rounded-lg"
                />
              ))}
            </div>
          ) : (
            <img
              src={AllImages.cover}
              alt="vehicle"
              className="w-full h-[300px] object-cover rounded-lg"
            />
          )}
        </div>

        {/* Basic Information Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Status
            </p>
            <span
              className={`${currentRecord?.isAvailable
                ? 'bg-[#B9F8CF] text-[#008236]'
                : 'bg-[#FFE5E5] text-[#D32F2F]'
                } font-semibold text-xs px-2 py-1 rounded-md inline-block`}
            >
              {currentRecord?.isAvailable ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Daily Rate
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-secondary-color bg-[#BEDBFF] px-2 py-0.5 rounded w-fit">
              ${currentRecord?.perDayPrice || 0}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Clean Fee
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              ${currentRecord?.cleanFee || 0}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Total Trips
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.totalTrips || 0} trips
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Rating
            </p>
            <p className="text-xs sm:text-sm lg:text-base flex items-center gap-1">
              <FaStar className="text-warning-color" />
              <span>{currentRecord?.averageRating?.toFixed(1) || 'N/A'}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs sm:text-sm lg:text-base font-semibold text-[#667085]">
              Rented This Month
            </p>
            <p className="text-xs sm:text-sm lg:text-base">
              {currentRecord?.rentedThisMonth ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {/* Vehicle Specifications */}
        <div className="mt-6 border-t pt-6">
          <h4 className="text-base sm:text-lg font-bold text-base-color mb-4">
            Vehicle Specifications
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Vehicle Type
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.vehicleType || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Body Type
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.bodyType || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Color
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.color || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Seating Capacity
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.seatingCapacity || 'N/A'} seats
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Fuel Type
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.fuelType || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Transmission
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.transmission || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Drive Type
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.driveType || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Mileage Per Gallon
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.milagePerGallon || 'N/A'} MPG
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Fuel Efficiency
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.fuelEfficiency || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Car Model 1981 or Earlier
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.isCarModel1981 ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-6 border-t pt-6">
          <h4 className="text-base sm:text-lg font-bold text-base-color mb-4">
            Features & Amenities
          </h4>

          {/* Comfort & Convenience */}
          {currentRecord?.comfortConvenience && currentRecord.comfortConvenience.length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Comfort & Convenience
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {currentRecord.comfortConvenience.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-[#ECEEF2] py-1 px-3 rounded-full text-xs sm:text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Device Connectivity */}
          {currentRecord?.deviceConnectivity && currentRecord.deviceConnectivity.length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Device Connectivity
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {currentRecord.deviceConnectivity.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-[#E3F2FD] py-1 px-3 rounded-full text-xs sm:text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Safety Features */}
          {currentRecord?.safetyFeature && currentRecord.safetyFeature.length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Safety Features
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {currentRecord.safetyFeature.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-[#FFF3E0] py-1 px-3 rounded-full text-xs sm:text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {currentRecord?.extras && currentRecord.extras.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Extras
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {currentRecord.extras.map((extra, index) => (
                  <span
                    key={index}
                    className="bg-[#F3E5F5] py-1 px-3 rounded-full text-xs sm:text-sm"
                  >
                    {extra}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* License Information */}
        <div className="mt-6 border-t pt-6">
          <h4 className="text-base sm:text-lg font-bold text-base-color mb-4">
            License Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                License Holder
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.licenseFirstName} {currentRecord?.licenseLastName}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                License Number
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.licenseNumber || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                License Country
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.licenseCountry || 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                Date of Birth
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.licenseDOB ? formatDate(currentRecord.licenseDOB) : 'N/A'}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#667085]">
                License Expiry
              </p>
              <p className="text-xs sm:text-sm lg:text-base">
                {currentRecord?.licenseExpiryDate ? formatDate(currentRecord.licenseExpiryDate) : 'N/A'}
              </p>
            </div>
          </div>

          {/* License Images */}
          {currentRecord?.licenseImage && currentRecord.licenseImage.length > 0 && (
            <div className="mt-4">
              <p className="text-xs sm:text-sm font-semibold text-[#667085] mb-2">
                License Files
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {currentRecord.licenseImage.map((img, index) =>
                  isPdf(img) ? (
                    <div
                      key={index}
                      className="w-full h-[120px] rounded-lg border border-gray-200 bg-[#FFF3E0] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#FFE0B2] transition"
                      onClick={() => setPdfPreviewUrl(serverUrl + img)}
                    >
                      <FaFilePdf className="text-4xl text-red-500" />
                      <span className="text-xs text-[#667085] text-center px-2 truncate w-full">
                        {img.split("/").pop()}
                      </span>
                    </div>
                  ) : (
                    <Image
                      key={index}
                      src={serverUrl + img}
                      alt={`license ${index + 1}`}
                      className="w-full h-[120px] object-cover rounded-lg"
                    />
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {/* PDF Preview Modal */}
        <Modal
          open={!!pdfPreviewUrl}
          onCancel={() => setPdfPreviewUrl(null)}
          footer={null}
          centered
          className="!w-full lg:!w-[800px]"
          title="PDF Preview"
        >
          {pdfPreviewUrl && (
            <iframe
              src={pdfPreviewUrl}
              className="w-full h-[70vh] rounded"
              title="PDF Preview"
            />
          )}
        </Modal>

        {/* Action Buttons */}
        <div className="mt-7 flex items-center gap-4 sticky bottom-0 pt-5 bg-primary-color">
          <ReuseButton
            variant="highlight"
            className="!px-6 !py-5 flex items-center justify-center gap-2"
            onClick={handleCancel}
          >
            Close
          </ReuseButton>
          <ReuseButton
            variant="secondary"
            className="!px-6 !py-5 flex items-center justify-center gap-2"
            onClick={() => showEditModal(currentRecord)}
          >
            Edit Vehicle
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default ViewAdminVehicleModal;
