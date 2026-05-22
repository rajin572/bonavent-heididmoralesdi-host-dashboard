import { Typography } from "antd";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";

const ActivityCapacityForm = () => {
  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        Capacity
      </Typography.Title>
      <ReuseInput
        name="duration"
        label="Duration"
        placeholder="Enter Duration"
        rules={[{ required: true, message: "Duration is required" }]}
        labelClassName="!font-semibold"
      />
      <ReuseInput
        name="capacity"
        label="Group Capacity"
        placeholder="Enter Group Capacity"
        rules={[{ required: true, message: "Group Capacity is required" }]}
        labelClassName="!font-semibold"
      />
      <ReuseInput
        name="ageRestriction"
        label="Age Restriction"
        placeholder="Enter Age Restriction"
        rules={[{ required: true, message: "Age Restriction is required" }]}
        labelClassName="!font-semibold"
      />
      <ReuseSelect
        name="skillLevelRequired"
        label="Skill Level Required"
        placeholder="Select Skill Level Required"
        rules={[
          {
            required: true,
            message: "Skill Level Required is required",
          },
        ]}
        labelClassName="!font-semibold"
        options={[
          { value: "beginner", label: "Beginner" },
          { value: "intermediate", label: "Intermediate" },
          { value: "advanced", label: "Advanced" },
        ]}
      />
    </div>
  );
};

export default ActivityCapacityForm;
