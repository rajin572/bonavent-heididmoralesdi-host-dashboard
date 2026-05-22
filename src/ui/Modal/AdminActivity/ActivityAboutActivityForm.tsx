import { Typography } from "antd";
import ReuseInput from "../../Form/ReuseInput";

const ActivityAboutActivityForm = () => {
  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        About the Activity
      </Typography.Title>
      <ReuseInput
        name="detaildescription"
        label="Detail Description"
        inputType="textarea"
        rows={4}
        placeholder="Enter Detail Description"
        rules={[{ required: true, message: "Detail Description is required" }]}
        labelClassName="!font-semibold"
      />
    </div>
  );
};

export default ActivityAboutActivityForm;
