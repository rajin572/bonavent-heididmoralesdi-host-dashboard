/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography } from "antd";
import ReuseCheckbox from "../../Form/ReuseCheckbox";
import { MdDelete } from "react-icons/md";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const ActivityAmenitiesAndFacilities = ({ form }: { form: any }) => {
  const handleAddAmenity = async (add: () => void) => {
    try {
      const amenities = form.getFieldValue("amenities") || [];
      const fieldsToValidate = amenities.map((_: any, index: number) => ({
        name: ["amenities", index, `amenityItem${index}`],
        rules: [
          {
            required: true,
            message: `Amenity ${index + 1} is required`,
          },
        ],
      }));

      // Validate all existing "amenityItem" fields
      await form.validateFields(fieldsToValidate);

      // Check if all previous "amenityItem" fields are filled before adding a new one
      const allFilled = amenities.every((item: any, index: number) => {
        return item && item[`amenityItem${index}`];
      });

      if (allFilled) {
        // If validation passes and all previous fields are filled, add a new field
        add();
      } else {
        // If not all previous fields are filled, show an error
        throw new Error("Please fill in all previous 'Amenities' fields.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Typography.Title level={4} className="font-bold text-gray-800 mb-6">
        Amenities & Facilities{" "}
      </Typography.Title>
      <ReuseCheckbox
        name="amenities"
        options={[
          { label: "Amenity 1", value: "amenity1" },
          { label: "Amenity 2", value: "amenity2" },
          { label: "Amenity 3", value: "amenity3" },
        ]}
      />
      <Typography.Title level={4} className="!font-bold !mb-5">
        More amenities
      </Typography.Title>
      <Form.List name="amenities" initialValue={[{ amenityItem0: "" }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Typography.Title level={5} className="!font-semibold">
                      Amenity {index + 1}
                    </Typography.Title>
                    {/* Conditionally hide the delete icon if there's only one field */}
                    {fields.length > 1 && (
                      <MdDelete
                        className="text-error-color cursor-pointer text-xl"
                        onClick={() => remove(name)}
                      />
                    )}
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, `amenityItem${key}`]}
                    rules={[
                      {
                        required: true,
                        message: `Amenity ${index + 1} is required`,
                      },
                    ]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder={`write amenity`}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                className="!py-4 !px-6 !text-base w-full text-center !ring-0 rounded-md !bg-transparent !text-secondary-color !border-secondary-color"
                onClick={() => handleAddAmenity(add)}
                block
                icon={<PlusOutlined />}
              >
                + Add Amenities
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default ActivityAmenitiesAndFacilities;
