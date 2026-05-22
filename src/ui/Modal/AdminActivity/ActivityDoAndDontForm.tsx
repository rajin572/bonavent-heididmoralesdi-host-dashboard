/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const ActivityDoAndDontForm = ({ form }: { form: any }) => {
  // Handler for adding a new "Do" field
  const handleDo = async (add: () => void) => {
    try {
      const whatsIncluded = form.getFieldValue("do") || [];
      const fieldsToValidate = whatsIncluded.map((_: any, index: number) => ({
        name: ["do", index, `do${index}`],
        rules: [
          {
            required: true,
            message: `Do ${index + 1} is required`,
          },
        ],
      }));

      // Validate all existing "includedItem" fields
      await form.validateFields(fieldsToValidate);

      // Check if all previous "includedItem" fields are filled before adding a new one
      const allFilled = whatsIncluded.every((item: any, index: number) => {
        return item && item[`do${index}`];
      });

      if (allFilled) {
        add();
      } else {
        throw new Error("Please fill in all previous Do fields.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // Handler for adding a new "Don't" field
  const handleDont = async (add: () => void) => {
    try {
      const whatsNotIncluded = form.getFieldValue("dont") || [];
      const fieldsToValidate = whatsNotIncluded.map(
        (_: any, index: number) => ({
          name: ["dont", index, `dont${index}`],
          rules: [
            {
              required: true,
              message: `Do not ${index + 1} is required`,
            },
          ],
        })
      );

      // Validate all existing "notIncludedItem" fields
      await form.validateFields(fieldsToValidate);

      // Check if all previous "notIncludedItem" fields are filled before adding a new one
      const allFilled = whatsNotIncluded.every((item: any, index: number) => {
        return item && item[`dont${index}`];
      });

      if (allFilled) {
        add();
      } else {
        throw new Error("Please fill in all previous  Do not fields.");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* Do's Section */}
      <div>
        <Typography.Title level={4} className="!font-bold !mb-5">
          Do's
        </Typography.Title>
        <Form.List name="do" initialValue={[{ includedItem0: "" }]}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div
                  key={key}
                  className="bg-background-color/10 p-1 mb-3 rounded"
                >
                  <div className="flex justify-between items-center mb-1">
                    <Typography.Title level={5} className="!font-semibold">
                      Do's {index + 1}
                    </Typography.Title>
                    {fields.length > 1 && (
                      <MdDelete
                        className="text-error-color cursor-pointer text-xl"
                        onClick={() => remove(name)}
                      />
                    )}
                  </div>
                  <Form.Item
                    {...restField}
                    name={[name, `do${key}`]}
                    rules={[
                      {
                        required: true,
                        message: `Do's ${index + 1} is required`,
                      },
                    ]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder={`Do's ${index + 1}`}
                    />
                  </Form.Item>
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  className="!py-4 !px-6 !text-base w-full text-center !ring-0 rounded-md !bg-transparent !text-secondary-color !border-secondary-color"
                  onClick={() => handleDo(add)}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <div className="mt-8">
          <Form.List name="dont" initialValue={[{ notIncludedItem0: "" }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div
                    key={key}
                    className="bg-background-color/10 p-1 mb-3 rounded"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <Typography.Title level={5} className="!font-semibold">
                        Don'ts {index + 1}
                      </Typography.Title>
                      {fields.length > 1 && (
                        <MdDelete
                          className="text-error-color cursor-pointer text-xl"
                          onClick={() => remove(name)}
                        />
                      )}
                    </div>
                    <Form.Item
                      {...restField}
                      name={[name, `dont${key}`]}
                      rules={[
                        {
                          required: true,
                          message: `Don'ts ${index + 1} is required`,
                        },
                      ]}
                    >
                      <Input
                        className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                        placeholder={`Don'ts ${index + 1}`}
                      />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    className="!py-4 !px-6 !text-base w-full text-center !ring-0 rounded-md !bg-transparent !text-secondary-color !border-secondary-color"
                    onClick={() => handleDont(add)}
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
      </div>
    </div>
  );
};

export default ActivityDoAndDontForm;
