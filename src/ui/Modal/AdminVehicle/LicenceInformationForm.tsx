import { Typography } from "antd";
import ReuseInput from "../../Form/ReuseInput";
import ReuseDatePicker from "../../Form/ReuseDatePicker";
import ReuseUpload from "../../Form/ReuseUpload";
import { IVehicleInformation } from "../../../types/vehical.type";

const LicenceInformationForm = ({ currentRecord = null }: { currentRecord?: IVehicleInformation | null }) => {
  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        Driver License Information
      </Typography.Title>
      {/* All your existing fields stay the same - they now work with parent form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ReuseInput
          name="licenseFirstName"
          label="First Name"
          placeholder="Enter First Name"
          rules={[{ required: true, message: "First Name is required" }]}
          labelClassName="!font-semibold"
        />
        <ReuseInput
          name="licenseLastName"
          label="Last Name"
          placeholder="Enter Last Name"
          rules={[{ required: true, message: "Last Name is required" }]}
          labelClassName="!font-semibold"
        />
        <ReuseInput
          name="licenseCountry"
          label="Country"
          placeholder="Enter Country"
          rules={[{ required: true, message: "Country is required" }]}
          labelClassName="!font-semibold"
        />
        <ReuseDatePicker
          name="licenseDOB"
          label="Date of Birth"
          rules={[{ required: true, message: "Date of Birth is required" }]}
          labelClassName="!font-semibold"
          isDateDisabled={false}
        />
        <ReuseInput
          name="licenseNumber"
          label="License Number"
          placeholder="Enter License Number"
          rules={[{ required: true, message: "License Number is required" }]}
          labelClassName="!font-semibold"
        />
        <ReuseDatePicker
          name="licenseExpiryDate"
          label="Expiration date"
          rules={[{ required: true, message: "Expiration date is required" }]}
          labelClassName="!font-semibold"
          isDateDisabled={false}
        />
      </div>
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          License Picture
        </Typography.Title>

        <div className="grid grid-cols-1 gap-5">
          <ReuseUpload
            name="licensePicture"
            accept="image/* .pdf"
            buttonText="Click to upload License images (up to 10MB)"
            rules={[{ required: currentRecord?.licenseImage?.length as number < 1 ? true : false, message: "License Image is required" }]}
            maxCount={2}
          />
        </div>
      </div>
    </div>
  );
};

export default LicenceInformationForm;
