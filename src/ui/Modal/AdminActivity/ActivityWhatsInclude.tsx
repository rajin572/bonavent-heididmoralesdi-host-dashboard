/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const ActivityWhatsInclude = ({ form }: { form: any }) => {
  const handleAddIncludedItem = async (add: () => void) => {
    try {
      const whatsIncluded = form.getFieldValue("whatsIncluded") || [];
      const fieldsToValidate = whatsIncluded.map((_: any, index: number) => ({
        name: ["whatsIncluded", index, `includedItem${index}`],
        rules: [
          {
            required: true,
            message: `What’s included ${index + 1} is required`,
          },
        ],
      }));

      // Validate all existing "includedItem" fields
      await form.validateFields(fieldsToValidate);

      // Check if all previous "includedItem" fields are filled before adding a new one
      const allFilled = whatsIncluded.every((item: any, index: number) => {
        return item && item[`includedItem${index}`];
      });

      if (allFilled) {
        // If validation passes and all previous fields are filled, add a new field
        add();
      } else {
        // If not all previous fields are filled, show an error
        throw new Error(
          "Please fill in all previous 'What's included' fields."
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        What&apos;s Included
      </Typography.Title>
      <Form.List name="whatsIncluded" initialValue={[{ includedItem0: "" }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Typography.Title level={5} className="!font-semibold">
                      What's included {index + 1}
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
                    name={[name, `includedItem${key}`]}
                    rules={[
                      {
                        required: true,
                        message: `What’s included ${index + 1} is required`,
                      },
                    ]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder={`What’s included ${index + 1}`}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                className="!py-4 !px-6 !text-base w-full text-center !ring-0 rounded-md !bg-transparent !text-secondary-color !border-secondary-color"
                onClick={() => handleAddIncludedItem(add)}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default ActivityWhatsInclude;
