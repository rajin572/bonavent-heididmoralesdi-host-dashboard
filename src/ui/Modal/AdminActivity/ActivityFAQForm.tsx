/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const ActivityFAQForm = ({ form }: { form: any }) => {
  const handleAddFAQ = async (add: () => void) => {
    try {
      const faqItems = form.getFieldValue("faq") || [];
      const fieldsToValidate = faqItems.map((_: any, index: number) => ({
        name: ["faq", index],
        rules: [
          { required: true, message: `FAQ ${index + 1} is required` },
          {
            validator: (_: any, value: { question: any; answer: any }) => {
              if (!value?.question || !value?.answer) {
                return Promise.reject(
                  new Error(
                    `Both question and answer for FAQ ${index + 1} are required`
                  )
                );
              }
              return Promise.resolve();
            },
          },
        ],
      }));

      // Validate all existing FAQ fields
      await form.validateFields(fieldsToValidate);

      // Check if all previous FAQ fields are filled
      const allFilled = faqItems.every((item: any) => {
        return item?.question && item?.answer;
      });

      if (allFilled) {
        add();
      } else {
        throw new Error(
          "Please fill in both question and answer for the previous FAQ item."
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <Typography.Title level={4} className="font-bold text-gray-800 mb-6">
        Frequently Asked Questions
      </Typography.Title>
      <Form.List name="faq" initialValue={[{ question: "", answer: "" }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div key={key} className="bp-1">
                <div className="flex justify-between items-center mb-1">
                  <Typography.Title level={5} className="!font-semibold">
                    FAQ {index + 1}
                  </Typography.Title>
                  {fields.length > 1 && (
                    <MdDelete
                      className="text-error-color cursor-pointer text-xl"
                      onClick={() => remove(name)}
                    />
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <Typography.Title level={5} className="!font-medium">
                      Question
                    </Typography.Title>
                    <Form.Item
                      {...restField}
                      name={[name, "question"]}
                      rules={[
                        { required: true, message: "Question is required" },
                      ]}
                    >
                      <Input
                        className="py-2 px-3 text-base text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. What should I bring?"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Typography.Title level={5} className="!font-medium">
                      Answer
                    </Typography.Title>
                    <Form.Item
                      {...restField}
                      name={[name, "answer"]}
                      rules={[
                        { required: true, message: "Answer is required" },
                      ]}
                    >
                      <Input
                        className="py-2 px-3 text-base text-gray-800 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Just swimwear and sunscreen"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                className="!py-4 !px-6 !text-base w-full text-center !ring-0 rounded-md !bg-transparent !text-secondary-color !border-secondary-color"
                onClick={() => handleAddFAQ(add)}
                block
                icon={<PlusOutlined />}
              >
                Add FAQ
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default ActivityFAQForm;
