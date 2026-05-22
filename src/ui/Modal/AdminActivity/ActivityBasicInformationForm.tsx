import { Typography } from "antd";
import ReuseInput from "../../Form/ReuseInput";
import ReuseSelect from "../../Form/ReuseSelect";

const ActivityBasicInformationForm = () => {
  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        Basic Information
      </Typography.Title>
      <ReuseInput
        name="title"
        label="Listing Title"
        placeholder="Enter Listing Title"
        rules={[{ required: true, message: "Listing Title is required" }]}
        labelClassName="!font-semibold"
      />
      <ReuseSelect
        name="category"
        label="Category"
        placeholder="Select Category"
        rules={[{ required: true, message: "Category is required" }]}
        labelClassName="!font-semibold"
        options={[
          { value: "category1", label: "Category 1" },
          { value: "category2", label: "Category 2" },
        ]}
      />
      <ReuseSelect
        name="subcategory"
        label="Sub Category"
        placeholder="Select Sub Category"
        rules={[{ required: true, message: "Sub Category is required" }]}
        labelClassName="!font-semibold"
        options={[
          { value: "subcategory1", label: "Sub Category 1" },
          { value: "subcategory2", label: "Sub Category 2" },
        ]}
      />
      <ReuseInput
        name="location"
        label="Location"
        placeholder="Enter Location"
        rules={[{ required: true, message: "Location is required" }]}
        labelClassName="!font-semibold"
      />
      <ReuseInput
        name="description"
        label="Short Description"
        inputType="textarea"
        rows={4}
        placeholder="Enter Short Description"
        rules={[{ required: true, message: "Short Description is required" }]}
        labelClassName="!font-semibold"
      />
    </div>
  );
};

export default ActivityBasicInformationForm;
