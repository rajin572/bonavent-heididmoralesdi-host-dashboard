/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Form, Radio, Switch, TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import ReuseButton from "../../ui/Button/ReuseButton";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetVehicleAlwaysAvailableQuery, useVehicleDailyAvailableMutation } from "../../redux/features/vehicle/vehicleApi";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import Loading from "../../ui/Loading";

const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const AvailabilityForm: React.FC = () => {
  const { id } = useParams<{ id: string; day: string }>();
  const [searchParams] = useSearchParams();
  const dayParam = searchParams.get("day");

  console.log({ id, day: dayParam });

  const [updateDailyAvaibility] = useVehicleDailyAvailableMutation();
  const [form] = Form.useForm();
  const status = Form.useWatch("status", form);
  const [alwaysAvailable, setAlwaysAvailable] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>(["Sun"]);
  const [hours, setHours] = useState([
    { start: dayjs("07:00", "HH:mm"), end: dayjs("22:00", "HH:mm") },
  ]);

  const { data, isFetching } = useGetVehicleAlwaysAvailableQuery({ id });
  const availableData = data?.data;

  // ✅ POPULATE STATES FROM availableData
  useEffect(() => {
    if (availableData) {
      // Set form status
      const dayKey = dayParam?.toLowerCase() || "sunday";
      const dayData = availableData[dayKey as keyof typeof availableData];

      if (dayData && typeof dayData === 'object') {
        // Set radio status
        form.setFieldsValue({
          status: dayData.available ? "available" : "unavailable"
        });

        // Set alwaysAvailable
        setAlwaysAvailable(dayData.alwaysAvailable || false);

        // Set selected days (default to current day if available)
        if (dayParam) {
          const displayDay = daysList.find(day =>
            day.toLowerCase().includes(dayParam.toLowerCase().slice(0, 3))
          );
          if (displayDay) {
            setSelectedDays([displayDay]);
          }
        }

        // Set hours from availableHour
        if (dayData.availableHour && dayData.availableHour.length > 0 && !dayData.alwaysAvailable) {
          const hourSlots = dayData.availableHour.map((slot: { startTime: string; endTime: string }) => ({
            start: dayjs(slot.startTime, "HH:mm"),
            end: dayjs(slot.endTime, "HH:mm"),
          }));
          setHours(hourSlots.length > 0 ? hourSlots : [{ start: dayjs("07:00", "HH:mm"), end: dayjs("22:00", "HH:mm") }]);
        }
      }
    }
  }, [availableData, dayParam, form]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addHourRow = () => {
    setHours([
      ...hours,
      { start: dayjs("07:00", "HH:mm"), end: dayjs("22:00", "HH:mm") },
    ]);
  };

  const updateHour = (
    index: number,
    field: "start" | "end",
    value: dayjs.Dayjs | null
  ) => {
    const newHours = [...hours];
    newHours[index][field] = value ?? dayjs("07:00", "HH:mm");
    setHours(newHours);
  };

  const onFinish = async (values: any) => {
    const dayMapping: { [key: string]: string } = {
      "Sun": "sunday",
      "Mon": "monday",
      "Tue": "tuesday",
      "Wed": "wednesday",
      "Thu": "thursday",
      "Fri": "friday",
      "Sat": "saturday"
    };

    const days = selectedDays.map(day => dayMapping[day]);

    const formattedHours = hours.map((h) => ({
      startTime: h.start.format("HH:mm"),
      endTime: h.end.format("HH:mm"),
    }));

    const payload = {
      days,
      availability: {
        available: values.status === "available",
        alwaysAvailable,
        availableHour: alwaysAvailable || values.status !== "available" ? [] : formattedHours
      }
    };

    const response = await tryCatchWrapper(updateDailyAvaibility, {
      params: { id: id },
      body: payload
    });

    if (response?.statusCode === 200) {
      form.resetFields();
      setSelectedDays(["Sun"]);
      setHours([{ start: dayjs("07:00", "HH:mm"), end: dayjs("22:00", "HH:mm") }]);
      setAlwaysAvailable(false);
      window.history.back();
    }
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Status */}
        <div className="p-5 rounded-lg bg-primary-color border border-gray-200 shadow flex mb-10">
          <Form.Item name="status" initialValue="available" className="!mb-0">
            <Radio.Group className="flex gap-10">
              <Radio value="available" className="!font-bold">Available</Radio>
              <Radio value="unavailable" className="!font-bold">Unavailable</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        {status === "available" && (
          <div>
            {/* Always Available */}
            <div className="p-5 rounded-xl border border-gray-200 bg-primary-color space-y-2 flex items-center justify-between mb-10 shadow">
              <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 mt-2">
                Always Available
              </span>
              <Switch checked={alwaysAvailable} onChange={setAlwaysAvailable} />
            </div>

            {/* Hours */}
            {!alwaysAvailable && (
              <div className="space-y-4 p-5 rounded-lg bg-primary-color border border-gray-200 shadow mb-10">
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-gray-600">
                  Hours
                </h3>

                {hours.map((hr, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-4 mb-10 border border-gray-200 shadow p-5 rounded-2xl"
                  >
                    <div className="flex justify-between items-center gap-5">
                      <Typography.Title level={5} className="!font-semibold !mb-1">
                        Hours {index + 1}
                      </Typography.Title>
                      <MdDelete
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          const newHours = [...hours];
                          newHours.splice(index, 1);
                          setHours(newHours);
                        }}
                      />
                    </div>
                    <div>
                      <Typography.Text className="!font-semibold !mb-1">
                        Start Time
                      </Typography.Text>
                      <TimePicker
                        value={hr.start}
                        onChange={(val) => updateHour(index, "start", val)}
                        format="hh:mm A"
                        use12Hours
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Typography.Text className="!font-semibold !mb-1">
                        End Time
                      </Typography.Text>
                      <TimePicker
                        value={hr.end}
                        onChange={(val) => updateHour(index, "end", val)}
                        format="hh:mm A"
                        use12Hours
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}

                <ReuseButton
                  variant="outline"
                  className="!border-base-color !border-dashed"
                  onClick={addHourRow}
                >
                  + Add Hours
                </ReuseButton>
              </div>
            )}

            {/* Days */}
            <div className="space-y-2 p-5 rounded-lg bg-primary-color border border-gray-200 shadow mb-10">
              <p className="text-sm sm:text-base lg:text-lg font-semibold mb-5">
                Apply these hours to additional days
              </p>
              <div className="grid grid-cols-4 gap-2">
                {daysList.map((day) => (
                  <div
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`cursor-pointer border rounded-md px-3 py-2 text-center transition 
                      ${selectedDays.includes(day)
                        ? "bg-secondary-color text-white border-secondary-color"
                        : "bg-white text-gray-700 border-gray-300"
                      }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <ReuseButton variant="secondary" htmlType="submit" className="mt-6">
          Save
        </ReuseButton>
      </Form>
    </div>
  );
};

export default AvailabilityForm;
