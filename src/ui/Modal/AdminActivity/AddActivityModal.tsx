/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import { toast } from "sonner";
import { useState } from "react";
import ReusableForm from "../../Form/ReuseForm";
import ReuseButton from "../../Button/ReuseButton";
import ActivityBasicInformationForm from "./ActivityBasicInformationForm";
import ActivityAboutActivityForm from "./ActivityAboutActivityForm";
import ActivityImagesForm from "./ActivityImagesForm";
import ActivityCapacityForm from "./ActivityCapacityForm";
import ActivityWhatsInclude from "./ActivityWhatsInclude";
import ActivityPricingTimeTableForm from "./ActivityPricingTimeTableForm";
import ActivityDoAndDontForm from "./ActivityDoAndDontForm";
import ActivityEquipmentRentalForm from "./ActivityEquipmentRentalForm";
import ActivityInsuranceCoverageForm from "./ActivityInsuranceCoverageForm";
import ActivityFAQForm from "./ActivityFAQForm";
import ActivityAmenitiesAndFacilities from "./ActivityAmenitiesAndFacilities";

const AddActivityModal = ({
  isAddModalVisible,
  handleCancel,
}: {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [step, setStep] = useState<number>(1);

  const onSubmit = (values: any) => {
    console.log(values);
    form.resetFields();
    handleCancel();
  };

  // Navigation handlers
  const nextStep = () => {
    if (step < 10) {
      form
        .validateFields()
        .then(() => setStep(step + 1))
        .catch(() => {
          toast.error("Please fill in all required fields before proceeding.");
        });
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
          Add New Activity
        </h1>

        {/* Step Progress Indicator */}
        <div className="flex justify-start items-center flex-wrap gap-4 w-full mb-6">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 text-sm sm:text-base lg:text-lg transition-all duration-300 ease-in-out ${
                  index + 1 === step
                    ? "bg-secondary-color border-secondary-color text-white"
                    : "bg-highlight-color border-highlight-color text-base-color"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`text-xs sm:text-sm mt-2 transition-all duration-300 ease-in-out text-nowrap ${
                  index + 1 === step
                    ? "text-secondary-color"
                    : "text-base-color"
                }`}
              >
                {
                  [
                    "Basic Info",
                    "Activity",
                    "Images",
                    "Capacity",
                    "Pricing",
                    "Included",
                    "Amenities",
                    "Do and Dont",
                    "Equipment",
                    "Insurance",
                    "FAQ",
                  ][index]
                }
              </div>
            </div>
          ))}
        </div>

        <ReusableForm form={form} handleFinish={onSubmit}>
          {/* Step 1: Basic Information */}
          {step === 1 && <ActivityBasicInformationForm />}

          {/* Step 2: About the Activity */}
          {step === 2 && <ActivityAboutActivityForm />}

          {/* Step 3: Images & Gallery */}
          {step === 3 && <ActivityImagesForm />}

          {/* Step 4: Capacity */}
          {step === 4 && <ActivityCapacityForm />}

          {/* Step 5: Expiry Date */}
          {step === 5 && <ActivityPricingTimeTableForm form={form} />}

          {/* Step 6:  What's Included*/}
          {step === 6 && <ActivityWhatsInclude form={form} />}
          {step === 7 && <ActivityAmenitiesAndFacilities form={form} />}

          {/* Step 7:  Do and Dont*/}
          {step === 8 && <ActivityDoAndDontForm form={form} />}
          {/* Step 7:  Do and Dont*/}
          {step === 9 && <ActivityEquipmentRentalForm form={form} />}
          {step === 10 && <ActivityInsuranceCoverageForm />}
          {step === 11 && <ActivityFAQForm form={form} />}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between gap-5">
            {step > 1 && (
              <ReuseButton variant="secondary" onClick={prevStep}>
                Previous
              </ReuseButton>
            )}
            {step < 10 ? (
              <ReuseButton
                variant="secondary"
                onClick={nextStep}
                className="ml-auto"
              >
                Next
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

export default AddActivityModal;
