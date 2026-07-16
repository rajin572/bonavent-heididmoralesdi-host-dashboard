/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import VehicleInformationForm from "./VehicleInformationForm";
import LicenceInformationForm from "./LicenceInformationForm";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useAddVehicleMutation } from "../../../redux/features/vehicle/vehicleApi";

const AdminAddVehicleModal = ({
  isAddModalVisible,
  handleCancel,
}: {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const isCarModel1981 = Form.useWatch("isCarModel1981", form);
  const [formOneValues, setFormOneValues] = useState<any>({});
  const [formTwoValues, setFormTwoValues] = useState<any>({});
  const [step, setStep] = useState<number>(1);
  const [addVehicle] = useAddVehicleMutation();

  console.log(formOneValues)

  useEffect(() => {
    if (step === 1 && Object.keys(formOneValues).length > 0) {
      form.resetFields(); // Clear the form first
      form.setFieldsValue({
        isCarModel1981: formOneValues?.isCarModel1981,
        vinNumber: formOneValues.vinNumber,
        vehicleType: formOneValues.vehicleType,
        vehicleName: formOneValues.vehicleName,
        vehicleModel: formOneValues.vehicleModel,
        trimLevel: formOneValues.trimLevel,
        seatingCapacity: formOneValues.seatingCapacity,
        fuelType: formOneValues.fuelType,
        transmission: formOneValues.transmission,
        milagePerGallon: formOneValues.milagePerGallon,
        fuelEfficiency: formOneValues.fuelEfficiency,
        driveType: formOneValues.driveType,
        bodyType: formOneValues.bodyType,
        color: formOneValues.color,
        comfortConvenience: formOneValues.comfortConvenience,
        deviceConnectivity: formOneValues.deviceConnectivity,
        safetyFeature: formOneValues.safetyFeature,
        extras: formOneValues.extras,
        perDayPrice: formOneValues.perDayPrice,
        cleanFee: formOneValues.cleanFee,
        carPhotos: formOneValues.carPhotos,
      });
    } else if (step === 2 && Object.keys(formTwoValues).length > 0) {
      form.setFieldsValue({
        ...formTwoValues
      })
    }
  }, [step, formOneValues, form, formTwoValues]);


  const onSubmit = async (values: any) => {
    const data = { ...formOneValues, ...values };
    console.log(data)
    const formData = new FormData();

    formData.append("data", JSON.stringify({

      weeklyAvailabilityData: {
        alwaysAvailable: false,
        sunday: {
          available: false,
          alwaysAvailable: false,
          availableHour: [
            { startTime: "09:00", endTime: "13:00" },
            { startTime: "14:00", endTime: "18:00" }
          ]
        },
        monday: {
          available: false,
          alwaysAvailable: false,
          availableHour: []
        },
        tuesday: {
          available: false,
          alwaysAvailable: false,
          availableHour: [
            { startTime: "10:00", endTime: "17:00" }
          ]
        },
        wednesday: {
          available: false,
          alwaysAvailable: false,
          availableHour: [
            { startTime: "08:00", endTime: "12:00" },
            { startTime: "13:00", endTime: "16:00" }
          ]
        },
        thursday: {
          available: false,
          alwaysAvailable: false,
          availableHour: []
        },
        friday: {
          available: false,
          alwaysAvailable: false,
          availableHour: []
        },
        saturday: {
          available: false,
          alwaysAvailable: false,
          availableHour: [
            { startTime: "09:00", endTime: "14:00" }
          ]
        }
      },
      vehicleData: {
        vinNumber: data.vinNumber,
        isCarModel1981: isCarModel1981 || false,
        vehicleType: data.vehicleType,
        vehicleName: data.vehicleName,
        vehicleModel: data.vehicleModel,
        trimLevel: data.trimLevel,
        seatingCapacity: Number(data.seatingCapacity),
        transmission: data.transmission,
        fuelType: data.fuelType,
        milagePerGallon: Number(data.milagePerGallon),
        fuelEfficiency: Number(data.fuelEfficiency),
        driveType: data.driveType,
        bodyType: data.bodyType,
        color: data.color,
        comfortConvenience: data.comfortConvenience,
        deviceConnectivity: data.deviceConnectivity,
        safetyFeature: data.safetyFeature,
        extras: data.extras,
        perDayPrice: Number(data.perDayPrice),
        cleanFee: Number(data.cleanFee),
        licenseCountry: data.licenseCountry,
        licenseFirstName: data.licenseFirstName,
        licenseLastName: data.licenseLastName,
        licenseNumber: data.licenseNumber,
        licenseDOB: data.licenseDOB,
        licenseExpiryDate: data.licenseExpiryDate
      }
    })
    );

    if (data.licensePicture?.length > 0) {
      data.licensePicture.forEach((file: any) => {
        formData.append(`licenseImage`, file.originFileObj);
      });
    }
    if (data.carPhotos?.length > 0) {
      data.carPhotos.forEach((file: any) => {
        formData.append(`vehicleImage`, file.originFileObj);
      });
    }

    const res = await tryCatchWrapper(
      addVehicle,
      { body: formData },
      {
        toastLoadingMessage: "Adding Vehicle...",
        toastSuccessMessage: "Vehicle Added Successfully!",
        toastErrorMessage: "Failed to add vehicle. Please try again later.",
      }
    );

    if (res?.success) {
      form.resetFields();
      handleCancel();
    }

    // handleCancel();
  }
  // Navigation handlers
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (step < 2) {
      form
        .validateFields()
        .then((values) => {
          setFormOneValues(values);
          setStep(step + 1);
        })
        .catch((error) => {
          console.log("Step 1 validation failed:", error); // ← ADD THIS
          toast.error("Please fill in all required fields before proceeding.");
        });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      form
        .validateFields()
        .then((values) => {
          setFormTwoValues(values);
          setStep(step - 1);
        })
        .catch((error) => {
          console.log("Step 2 validation failed:", error); // ← ADD THIS
          toast.error("Please fill in all required fields before proceeding.");
        })

    };
  };


  return (
    <Modal
      open={isAddModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8">
          Add New Vehicle
        </h1>

        {/* Step Progress Indicator */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2 text-center mb-10 bg-[#ECECF0] p-1 rounded-3xl">
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="">
              <div
                className={`text-xs sm:text-sm lg:text-base transition-all  py-2 px-4 rounded-3xl duration-300 ease-in-out text-nowrap ${index + 1 === step
                  ? "text-secondary-color bg-primary-color font-bold"
                  : "text-base-color font-semibold"
                  }`}
              >
                {["Vehicle Details", "License Information"][index]}
              </div>
            </div>
          ))}
        </div>

        <ReusableForm form={form} handleFinish={onSubmit}>
          {/* Step 1: Basic Information */}
          {step === 1 && <VehicleInformationForm />}

          {/* Step 2: About the Activity */}
          {step === 2 && <LicenceInformationForm />}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between gap-5">
            {step > 1 && (
              <ReuseButton variant="secondary" onClick={prevStep}>
                Previous: Vehicle Details
              </ReuseButton>
            )}
            {step < 2 ? (
              <ReuseButton
                variant="secondary"
                onClick={nextStep}
                className="ml-auto"
                htmlType="button" // make sure this is passed to the <button>
              >
                Next: License Info
              </ReuseButton>
            ) : (
              <ReuseButton
                htmlType="submit"
                variant="secondary"
                className="ml-auto"
              >
                Submit
              </ReuseButton>
            )}
          </div>
        </ReusableForm>
      </div>
    </Modal>
  );
}

export default AdminAddVehicleModal;
