/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { Calendar } from "react-multi-date-picker";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { toast } from "sonner";

const ActivityPricingTimeTableForm = ({ form }: { form: any }) => {
  const handleAddPricingItem = async (add: () => void) => {
    try {
      const pricingTime = form.getFieldValue("pricingTime") || [];
      const fieldsToValidate = pricingTime.flatMap((_: any, index: number) => [
        {
          name: ["pricingTime", index, `time${index}`],
          rules: [
            {
              required: true,
              message: `Set Time ${index + 1} is required`,
            },
          ],
        },
        {
          name: ["pricingTime", index, `price${index}`],
          rules: [
            {
              required: true,
              message: `Price ${index + 1} is required`,
            },
          ],
        },
      ]);

      // Validate all existing "time" and "price" fields
      await form.validateFields(fieldsToValidate);

      // Check if all previous "time" and "price" fields are filled
      const allFilled = pricingTime.every((item: any, index: number) => {
        return item && item[`time${index}`] && item[`price${index}`];
      });

      if (allFilled) {
        // If validation passes and all previous fields are filled, add a new field
        add();
      } else {
        // If not all previous fields are filled, show an error
        throw new Error(
          "Please fill in all previous 'Set Time and Price' fields."
        );
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Handle date changes from Calendar
  const handleDateChange = (dates: any[]) => {
    setSelectedDates(dates); // Calendar returns Date objects
  };

  // Handle removing a selected date

  return (
    <div>
      <Typography.Title level={4} className="!font-bold !mb-5">
        Pricing and Dates
      </Typography.Title>
      <Form.Item
        name="multipleDates"
        rules={[{ required: true, message: "Please select at least one date" }]}
      >
        <Calendar
          value={selectedDates}
          onChange={handleDateChange}
          multiple
          format="YYYY-MM-DD"
        />
      </Form.Item>

      {/* Display selected dates */}
      {selectedDates.length > 0 && (
        <div className="mb-4">
          <Typography.Title level={5} className="!font-semibold">
            Selected Dates:
          </Typography.Title>
          <ul className="list-disc pl-5">
            {selectedDates.map((date, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">{dayjs(date).format("YYYY-MM-DD")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Form.List name="pricingTime" initialValue={[{ time0: "", price0: "" }]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <div
                key={key}
                className="bg-background-color/10 p-1 mb-3 rounded"
              >
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <Typography.Title level={5} className="!font-semibold">
                      Set Time and Price {index + 1}
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
                    name={[name, `time${key}`]}
                    rules={[
                      {
                        required: true,
                        message: `Set Time ${index + 1} is required`,
                      },
                    ]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder={`Set Time ${index + 1}`}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, `price${key}`]}
                    rules={[
                      {
                        required: true,
                        message: `Price ${index + 1} is required`,
                      },
                    ]}
                  >
                    <Input
                      className="!py-1.5 !px-3 !text-lg !bg-input-color border !border-input-color !text-base-color rounded-lg"
                      placeholder={`Set Price ${index + 1}`}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                className="!py-4 !px-6 !text-base w-full text-center !ring-0 rounded-md !bg-transparent !text-secondary-color !border-secondary-color"
                onClick={() => handleAddPricingItem(add)}
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

export default ActivityPricingTimeTableForm;
