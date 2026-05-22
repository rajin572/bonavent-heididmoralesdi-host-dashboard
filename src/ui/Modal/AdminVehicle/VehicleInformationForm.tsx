/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Form, Typography } from "antd";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";
import ReuseUpload from "../../Form/ReuseUpload";
import { vehicleOptions } from "../../../utils/vehicalData";
import { IVehicleInformation } from "../../../types/vehical.type";

const VehicleInformationForm = ({ form, currentRecord = null }: { form: any, currentRecord?: IVehicleInformation | null }) => {

  const selectedVehicleType = Form.useWatch("vehicleType", form);
  const selectedVehicleName = Form.useWatch("vehicleName", form);

  const currentCategory = vehicleOptions.find(
    (cat) => cat.value === selectedVehicleType
  );

  // get models for selected brand
  const currentBrand = currentCategory?.brands.find(
    (brand) => brand.label === selectedVehicleName
  );

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

          <ReuseSelect
            onChange={() => {
              form.setFieldsValue({
                vehicleName: undefined,
                vehicleModel: undefined,
              });
            }}
            name="vehicleType"
            label="Vehicle Type"
            placeholder="Select vehicle type"
            rules={[{ required: true, message: "Vehicle Type is required" }]}
            labelClassName="!font-semibold"
            options={vehicleOptions.map((cat) => ({
              value: cat.value,
              label: cat.label,
            }))}
          />

          {/* Vehicle Name (Brand) */}
          <ReuseSelect
            onChange={() => {
              form.setFieldsValue({ vehicleModel: undefined });
            }}
            name="vehicleName"
            label="Vehicle Name (Brand)"
            placeholder="Select brand"
            rules={[{ required: true, message: "Brand is required" }]}
            labelClassName="!font-semibold"
            options={
              currentCategory?.brands.map((brand) => ({
                value: brand.label,
                label: brand.label,
              })) || []
            }
            disabled={!selectedVehicleType}
          />

          {/* Vehicle Model */}
          <ReuseSelect
            name="vehicleModel"
            label="Vehicle Model"
            placeholder="Select model"
            rules={[{ required: true, message: "Model is required" }]}
            labelClassName="!font-semibold"
            options={
              currentBrand?.models.map((model) => ({
                value: model.value,
                label: model.label,
              })) || []
            }
            disabled={!selectedVehicleName}
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
          <ReuseSelect
            name="seatingCapacity"
            label="Seating capacity"
            placeholder="Select capacity"
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
              { value: 6, label: "6" },
              { value: 7, label: "7" },
              { value: 8, label: "8" },
            ]}

            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Seating capacity is required" }]}
          />

          <ReuseSelect
            name="fuelType"
            label="Fuel type"
            placeholder="Select fuel type"
            options={[
              { value: "Single", label: "Single" },
              { value: "Gas", label: "Gas" },
              { value: "Diesel", label: "Diesel" },
              { value: "Electric", label: "Electric" },
              { value: "Hybrid", label: "Hybrid" },
            ]}
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Fuel type is required" }]}
          />

          <ReuseSelect
            name="transmission"
            label="Transmission"
            placeholder="Select transmission"
            options={[
              { value: "Auto", label: "Auto" },
              { value: "Manual", label: "Manual" },
              { value: "Single", label: "Single" },
            ]}
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

          <ReuseSelect
            name="driveType"
            label="Drive type"
            placeholder="Select drive type"
            options={[
              { value: "FWD", label: "FWD" },
              { value: "RWD", label: "RWD" },
              { value: "AWD", label: "AWD" },
            ]}
            labelClassName="!font-semibold"
            rules={[{ required: true, message: "Drive type is required" }]}
          />

          <ReuseSelect
            name="bodyType"
            label="Body type"
            placeholder="Select body type"
            options={[
              { value: "Sedan", label: "Sedan" },
              { value: "Coupe", label: "Coupe" },
              { value: "Hatchback", label: "Hatchback" },
              { value: "SUV", label: "SUV" },
              { value: "Pickup", label: "Pickup" },
              { value: "Minivan", label: "Minivan" },
              { value: "Van", label: "Van" },
              { value: "Truck", label: "Truck" },
              { value: "Bus", label: "Bus" },
              { value: "Convertible", label: "Convertible" },
              { value: "Wagon", label: "Wagon" },
            ]}

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
          <ReuseSelect
            name="comfortConvenience"
            label="Comfort & Convenience"
            placeholder="Cruise control"
            options={[
              { value: "Air Conditioning", label: "Air Conditioning" },
              { value: "Cruise Control", label: "Cruise Control" },
              { value: "Power Windows", label: "Power Windows" },
              { value: "Power Locks", label: "Power Locks" },
              { value: "Keyless Entry", label: "Keyless Entry" },
              { value: "Heated Seats", label: "Heated Seats" },
              { value: "Leather Interior", label: "Leather Interior" },
              { value: "Sunroof", label: "Sunroof" },
              { value: "Heated Mirrors", label: "Heated Mirrors" },
              { value: "Heated Steering Wheel", label: "Heated Steering Wheel" },
              { value: "Heated Rear Seats", label: "Heated Rear Seats" },
              { value: "Heated Cockpit", label: "Heated Cockpit" },
              { value: "Heated Wheels", label: "Heated Wheels" },
              { value: "Heated Floor", label: "Heated Floor" },
            ]}
            labelClassName="!font-semibold"
            mode="multiple"
            rules={[{ required: true, message: "Comfort & Convenience is required" }]}
          />

          <ReuseSelect
            name="deviceConnectivity"
            label="Device Connectivity"
            placeholder="Bluetooth"
            options={[
              { value: "Air Conditioning", label: "Air Conditioning" },
              { value: "Cruise Control", label: "Cruise Control" },
              { value: "Power Windows", label: "Power Windows" },
              { value: "Power Locks", label: "Power Locks" },
              { value: "Keyless Entry", label: "Keyless Entry" },
              { value: "Heated Seats", label: "Heated Seats" },
              { value: "Leather Interior", label: "Leather Interior" },
              { value: "Sunroof", label: "Sunroof" },
              { value: "Heated Mirrors", label: "Heated Mirrors" },
              { value: "Heated Steering Wheel", label: "Heated Steering Wheel" },
              { value: "Heated Rear Seats", label: "Heated Rear Seats" },
              { value: "Heated Cockpit", label: "Heated Cockpit" },
              { value: "Heated Wheels", label: "Heated Wheels" },
              { value: "Heated Floor", label: "Heated Floor" },
            ]}
            labelClassName="!font-semibold"
            mode="multiple"
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
          <ReuseSelect
            name="safetyFeature"
            label="Safety features"
            placeholder="Safety features"
            options={[
              { value: "Anti-lock Braking System (ABS)", label: "Anti-lock Braking System (ABS)" },
              { value: "Traction Control", label: "Traction Control" },
              { value: "Tire Pressure Monitoring System (TPMS)", label: "Tire Pressure Monitoring System (TPMS)" },
              { value: "Electronic Stability Control (ESC)", label: "Electronic Stability Control (ESC)" },
              { value: "Electronic Steering", label: "Electronic Steering" },
              { value: "Electronic Parking Brake", label: "Electronic Parking Brake" },
              { value: "Electronic Cruise Control", label: "Electronic Cruise Control" },
              { value: "Electronic Speed Limiter", label: "Electronic Speed Limiter" },
              { value: "Electronic Acceleration Limiter", label: "Electronic Acceleration Limiter" },
              { value: "Electronic Steering Column", label: "Electronic Steering Column" },
              { value: "Electronic Tailgate", label: "Electronic Tailgate" },
              { value: "Electronic Parking Sensors", label: "Electronic Parking Sensors" },
              { value: "Electronic Cruise Sensors", label: "Electronic Cruise Sensors" },
              { value: "Electronic Steering Sensors", label: "Electronic Steering Sensors" },
              { value: "Electronic Speed Sensors", label: "Electronic Speed Sensors" },
              { value: "Electronic Acceleration Sensors", label: "Electronic Acceleration Sensors" },
              { value: "Electronic Brake Sensors", label: "Electronic Brake Sensors" },
              { value: "Electronic Steering Wheel Sensors", label: "Electronic Steering Wheel Sensors" },
              { value: "Electronic Tire Pressure Sensors", label: "Electronic Tire Pressure Sensors" },
              { value: "Electronic Fuel Sensors", label: "Electronic Fuel Sensors" },
              { value: "Electronic Temperature Sensors", label: "Electronic Temperature Sensors" },
              { value: "Electronic Odometer Sensors", label: "Electronic Odometer Sensors" },
            ]}
            labelClassName="!font-semibold"
            mode="multiple"
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
          <ReuseSelect
            name="extras"
            label="Extras"
            placeholder="Extras"
            options={[
              { value: "Roof Rack", label: "Roof Rack" },
              { value: "Tow Hooks", label: "Tow Hooks" },
              { value: "Leather Interior", label: "Leather Interior" },
              { value: "Sunroof", label: "Sunroof" },
              { value: "Heated Mirrors", label: "Heated Mirrors" },
              { value: "Heated Steering Wheel", label: "Heated Steering Wheel" },
              { value: "Heated Rear Seats", label: "Heated Rear Seats" },
              { value: "Heated Cockpit", label: "Heated Cockpit" },
              { value: "Heated Wheels", label: "Heated Wheels" },
              { value: "Heated Floor", label: "Heated Floor" },
            ]}
            labelClassName="!font-semibold"
            mode="multiple"
            selectClassName="!h-fit"
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
