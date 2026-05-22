import { Typography } from "antd";
import ReuseInput from "../../Form/ReuseInput";

const ActivityInsuranceCoverageForm = () => {
  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        Insurance Coverages
      </Typography.Title>
      <ReuseInput
        name="costPerPerson"
        label="Cost Per Person"
        inputType="normal"
        rows={4}
        placeholder="Enter Cost Per Person"
        rules={[{ required: true, message: "Cost Per Person is required" }]}
        labelClassName="!font-semibold"
      />
    </div>
  );
};

export default ActivityInsuranceCoverageForm;
