import { Typography } from "antd";
import ReuseUpload from "../../Form/ReuseUpload";

const ActivityImagesForm = () => {
  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        Images & Gallery
      </Typography.Title>
      <ReuseUpload
        name="heroImage"
        label="Hero Images"
        accept="image/*"
        buttonText="Upload image in PNG/JPEG Format"
        rules={[{ required: true, message: "Hero Image is required" }]}
        maxCount={5}
      />
      <ReuseUpload
        name="listingImage"
        label="Listing Gallery"
        accept="image/*"
        buttonText="Upload image in PNG/JPEG Format"
        rules={[{ required: true, message: "Listing Image is required" }]}
        maxCount={5}
      />
    </div>
  );
};

export default ActivityImagesForm;
