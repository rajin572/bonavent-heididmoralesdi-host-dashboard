/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const EquipmentRentalForm = ({ form }: { form: any }) => {
  const handleAddEquipment = async (add: () => void) => {
    try {
      const equipmentItems = form.getFieldValue("equipment") || [];
      const fieldsToValidate = equipmentItems.map((_: any, index: number) => ({
        name: ["equipment", index],
        rules: [
          { required: true, message: `Equipment ${index + 1} is required` },
          {
            validator: (
              _: any,
              value: { itemName: any; size: any; price: any }
            ) => {
              if (!value?.itemName || !value?.size || !value?.price) {
                return Promise.reject(
                  new Error(
                    `All fields for Equipment ${index + 1} are required`
                  )
                );
              }
              return Promise.resolve();
            },
          },
        ],
      }));

      // Validate all existing equipment fields
      await form.validateFields(fieldsToValidate);

      // Check if all previous equipment fields are filled
      const allFilled = equipmentItems.every((item: any) => {
        return item?.itemName && item?.size && item?.price;
      });

      if (allFilled) {
        add();
      } else {
        throw new Error(
          "Please fill in all fields for the previous equipment item."
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <Typography.Title level={4} className="font-bold text-gray-800 mb-6">
        Equipment Rental
      </Typography.Title>
      <Form.List
        name="equipment"
        initialValue={[{ itemName: "", size: "", price: "" }]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="p-1">
                <div className="flex justify-between items-center mb-1">
                  <Typography.Title level={5} className="!font-semibold">
                    Equipment {index + 1}
                  </Typography.Title>
                  {fields.length > 1 && (
                    <MdDelete
                      className="text-error-color cursor-pointer text-xl"
                      onClick={() => remove(name)}
                    />
                  )}
                </div>
                <div className="">
                  <Typography.Title level={5} className="!font-medium">
                    Item Name
                  </Typography.Title>
                  <Form.Item
                    {...restField}
                    name={[name, "itemName"]}
                    rules={[
                      { required: true, message: "Item name is required" },
                    ]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder="Type item name"
                    />
                  </Form.Item>
                  <Typography.Title level={5} className="!font-medium">
                    Size
                  </Typography.Title>
                  <Form.Item
                    {...restField}
                    name={[name, "size"]}
                    rules={[{ required: true, message: "Size is required" }]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder="Type size"
                    />
                  </Form.Item>
                  <Typography.Title level={5} className="!font-medium">
                    Price
                  </Typography.Title>
                  <Form.Item
                    {...restField}
                    name={[name, "price"]}
                    rules={[{ required: true, message: "Price is required" }]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder="Type price"
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                className="!py-4 !px-6 !text-base w-full text-center !ring-0 rounded-md !bg-transparent !text-secondary-color !border-secondary-color"
                onClick={() => handleAddEquipment(add)}
                block
                icon={<PlusOutlined />}
              >
                Add Equipment
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default EquipmentRentalForm;
