import { Checkbox, Form, Typography } from "antd";
import ReuseInput from "../../Form/ReuseInput";
import ReuseTagInput from "../../Form/ReuseTagInput";
import ReuseUpload from "../../Form/ReuseUpload";
import { IVehicleInformation } from "../../../types/vehical.type";

const VehicleInformationForm = ({ currentRecord = null }: { currentRecord?: IVehicleInformation | null }) => {

  return (
    <div className="space-y-8">
      {/* Basic Car Info */}
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          Car Information
        </Typography.Title>

        <Form.Item
          name="isCarModel1981"
          valuePropName="checked">
          <Checkbox>My model year is 1981 or later</Checkbox>
        </Form.Item>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ReuseInput
            name="vinNumber"
            label="VIN Number"
            placeholder="Enter VIN Number"
            rules={[{ required: true, message: "VIN Number is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="vehicleType"
            label="Vehicle Type"
            placeholder="Enter vehicle type"
            rules={[{ required: true, message: "Vehicle Type is required" }]}
            labelClassName="!font-semibold"
          />

          {/* Vehicle Name (Brand) */}
          <ReuseInput
            name="vehicleName"
            label="Vehicle Name (Brand)"
            placeholder="Enter brand"
            rules={[{ required: true, message: "Brand is required" }]}
            labelClassName="!font-semibold"
          />

          {/* Vehicle Model */}
          <ReuseInput
            name="vehicleModel"
            label="Vehicle Model"
            placeholder="Enter model"
            rules={[{ required: true, message: "Model is required" }]}
            labelClassName="!font-semibold"
          />

          <ReuseInput
            name="trimLevel"
            label="Trim Level"
            placeholder="Enter trim level"
            rules={[{ required: true, message: "Trim Level is required" }]}
            labelClassName="!font-semibold"

          />
        </div>
      </div>
      {/* Feature Information */}
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          Feature Information
        </Typography.Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ReuseInput
            name="seatingCapacity"
            label="Seating capacity"
            placeholder="Enter seating capacity"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Seating capacity is required" }]}
            type="number"
          />

          <ReuseInput
            name="fuelType"
            label="Fuel type"
            placeholder="Enter fuel type"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Fuel type is required" }]}
          />

          <ReuseInput
            name="transmission"
            label="Transmission"
            placeholder="Enter transmission"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Transmission is required" }]}
          />

          <ReuseInput
            name="milagePerGallon"
            label="Mileage per gallon"
            placeholder="Enter mileage"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Mileage is required" }]}
            type="number"

          />

          <ReuseInput
            name="fuelEfficiency"
            label="Fuel efficiency"
            placeholder="30 gallon"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Fuel efficiency is required" }]}
            type="number"

          />

          <ReuseInput
            name="driveType"
            label="Drive type"
            placeholder="Enter drive type"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Drive type is required" }]}
          />

          <ReuseInput
            name="bodyType"
            label="Body type"
            placeholder="Enter body type"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Body type is required" }]}
          />

          <ReuseInput
            name="color"
            label="Color"
            placeholder="Select color"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Color is required" }]}
          />
        </div>
      </div>
      {/* Comfort & Convenience */}
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          Comfort & Convenience
        </Typography.Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ReuseTagInput
            name="comfortConvenience"
            label="Comfort & Convenience"
            placeholder="Type a feature, press Enter or use commas"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Comfort & Convenience is required" }]}
          />

          <ReuseTagInput
            name="deviceConnectivity"
            label="Device Connectivity"
            placeholder="e.g. Apple CarPlay, Bluetooth"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Device Connectivity is required" }]}
          />
        </div>
      </div>
      {/* Safety features */}
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          Safety features
        </Typography.Title>

        <div className="grid grid-cols-1 gap-5">
          <ReuseTagInput
            name="safetyFeature"
            label="Safety features"
            placeholder="e.g. ABS, Lane Assist"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Safety features are required" }]}
          />
        </div>
      </div>{" "}
      {/* Extras */}
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          Extras
        </Typography.Title>

        <div className="grid grid-cols-1 gap-5">
          <ReuseTagInput
            name="extras"
            label="Extras"
            placeholder="e.g. Sunroof, Heated Seats"
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Extras are required" }]}
          />
        </div>
      </div>
      {/*  Price Per Day */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ReuseInput
          name="perDayPrice"
          label="Price Per Day"
          placeholder="200"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: "Price Per Day is required" }]}
          type="number"
        />
        <ReuseInput
          name="cleanFee"
          label="Clean Fee"
          placeholder="200"
          labelClassName="!font-semibold"
          rules={[{ required: true, message: " is required" }]}
          type="number"
        />
      </div>
      {/*  Car Photos */}
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          Car Photos
        </Typography.Title>

        <div className="grid grid-cols-1 gap-5">
          <ReuseUpload
            name="carPhotos"
            label="Add Photo"
            accept="image/*"
            buttonText="Click to upload car images (up to 10MB)"
            rules={[{ required: currentRecord?.vehicleImage?.length as number < 1 ? true : false, message: "Hero Image is required" }]}
            maxCount={5}
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleInformationForm;
