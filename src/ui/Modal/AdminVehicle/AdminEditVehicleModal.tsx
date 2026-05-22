/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import VehicleInformationForm from "./VehicleInformationForm";
import LicenceInformationForm from "./LicenceInformationForm";
import { IVehicleInformation } from "../../../types/vehical.type";
import dayjs from "dayjs";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { useUpdateVehicleMutation } from "../../../redux/features/vehicle/vehicleApi";

const AdminEditVehicleModal = ({
  isAddModalVisible,
  handleCancel,
  currentRecord,
}: {
  isAddModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IVehicleInformation;
}) => {
  const [editVehicle] = useUpdateVehicleMutation();
  const [form] = Form.useForm();
  const [step, setStep] = useState<number>(1);
  const [formOneValues, setFormOneValues] = useState<any>({});
  const [formTwoValues, setFormTwoValues] = useState<any>({});

  useEffect(() => {
    form.setFieldsValue({
      ...currentRecord,
      isCarModel1981: currentRecord?.isCarModel1981,
      licenseExpiryDate: currentRecord?.licenseExpiryDate
        ? dayjs(currentRecord.licenseExpiryDate)
        : null,
      licenseDOB: currentRecord?.licenseDOB
        ? dayjs(currentRecord.licenseDOB)
        : null,
    });
  }, [form, currentRecord]);


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
    const formData = new FormData();

    formData.append("data", JSON.stringify({
      vinNumber: data.vinNumber,
      isCarModel1981: data.isCarModel1981,
      vehicleType: data.vehicleType,
      vehicleName: data.vehicleName,
      vehicleModel: data.vehicleModel,
      trimLevel: data.trimLevel,
      seatingCapacity: data.seatingCapacity,
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
    })
    );

    console.log(data.licensePicture)

    if (data.licensePicture && data.licensePicture[0].originFileObj) {
      formData.append("licenseImage", data.licensePicture[0].originFileObj);
    }
    if (data.carPhotos?.length > 0) {
      data.carPhotos.forEach((file: any) => {
        formData.append(`vehicleImage`, file.originFileObj);
      });
    }

    const res = await tryCatchWrapper(
      editVehicle,
      { body: formData, params: { id: currentRecord._id } },
      {
        toastLoadingMessage: "Adding Vehicle...",
        toastSuccessMessage: "Vehicle Added Successfully!",
        toastErrorMessage: "Failed to add vehicle. Please try again later.",
      }
    );

    console.log(res)

    if (res?.success) {
      form.resetFields();
      handleCancel();
      setStep(1);
      setFormOneValues({});
      setFormTwoValues({});
    }
  };

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
      onCancel={() => {
        handleCancel();
        setStep(1);
        setFormOneValues({});
        setFormTwoValues({});
        form.resetFields();
      }}
      footer={null}
      centered
      className="lg:!w-[1000px]"
    >
      <div className="p-5 text-base-color">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold mb-8">
          Edit Vehicle
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
          {step === 1 && <VehicleInformationForm form={form} currentRecord={currentRecord} />}

          {/* Step 2: About the Activity */}
          {step === 2 && <LicenceInformationForm currentRecord={currentRecord} />}

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
};

export default AdminEditVehicleModal;
