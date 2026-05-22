import { useEffect, useMemo, useState } from "react";
import { Switch } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import tryCatchWrapper from "../../utils/tryCatchWrapper";
import { useGetVehicleAlwaysAvailableQuery, useVehicleAlwaysAvailableMutation } from "../../redux/features/vehicle/vehicleApi";
import Loading from "../../ui/Loading";

interface WeekDay {
  day: string;
  timeSlots: string[];
  alwaysAvailable: boolean;
  available: boolean;
  availableHours: Array<{ startTime: string; endTime: string }>;
}

const AdminVehiclesAvaibility = () => {
  const { id } = useParams();
  const [updateAvaibility] = useVehicleAlwaysAvailableMutation();
  const router = useNavigate();
  const [alwaysAvailable, setAlwaysAvailable] = useState(false);

  const { data, isFetching } = useGetVehicleAlwaysAvailableQuery({ id });
  const availableData = data?.data;

  // Helper function to format time from 24h to 12h format
  const formatTo12Hour = (time24: string): string => {
    if (!time24) return "00:00";
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Dynamically generate WEEK_DAYS from availableData
  const WEEK_DAYS: WeekDay[] = useMemo(() => {
    // Helper function to get time slots display
    const getTimeSlotsDisplay = (
      availableHour: Array<{ startTime: string; endTime: string }>,
      alwaysAvailable: boolean
    ): string[] => {
      if (alwaysAvailable) {
        return ["24 hours available"];
      }

      if (!availableHour || availableHour.length === 0) {
        return ["Not Available"];
      }

      return availableHour.map(slot =>
        `${formatTo12Hour(slot.startTime)} - ${formatTo12Hour(slot.endTime)}`
      );
    };

    if (!availableData) {
      return [
        { day: "Sunday", timeSlots: ["Not Available"], alwaysAvailable: false, available: false, availableHours: [] },
        { day: "Monday", timeSlots: ["Not Available"], alwaysAvailable: false, available: false, availableHours: [] },
        { day: "Tuesday", timeSlots: ["Not Available"], alwaysAvailable: false, available: false, availableHours: [] },
        { day: "Wednesday", timeSlots: ["Not Available"], alwaysAvailable: false, available: false, availableHours: [] },
        { day: "Thursday", timeSlots: ["Not Available"], alwaysAvailable: false, available: false, availableHours: [] },
        { day: "Friday", timeSlots: ["Not Available"], alwaysAvailable: false, available: false, availableHours: [] },
        { day: "Saturday", timeSlots: ["Not Available"], alwaysAvailable: false, available: false, availableHours: [] },
      ];
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return dayNames.map((dayName) => {
      const dayKey = dayName.toLowerCase() as keyof typeof availableData;
      const dayData = availableData[dayKey];

      if (dayData && typeof dayData === 'object' && 'available' in dayData) {
        const timeSlots = getTimeSlotsDisplay(
          dayData.availableHour || [],
          dayData.alwaysAvailable || false
        );

        return {
          day: dayName,
          timeSlots,
          alwaysAvailable: dayData.alwaysAvailable || false,
          available: dayData.available || (dayData.availableHour && dayData.availableHour.length > 0),
          availableHours: dayData.availableHour || [],
        };
      }

      return {
        day: dayName,
        timeSlots: ["Not Available"],
        alwaysAvailable: false,
        available: false,
        availableHours: [],
      };
    });
  }, [availableData]);

  useEffect(() => {
    if (availableData?.alwaysAvailable) {
      setAlwaysAvailable(true);
    } else {
      setAlwaysAvailable(false);
    }
  }, [availableData]);

  const handleAlwaysAvailable = async (data: { id: string }) => {
    const response = await tryCatchWrapper(updateAvaibility, {
      params: { id: data?.id },
    });
    if (response?.statusCode === 200) {
      setAlwaysAvailable(!alwaysAvailable);
    }
    console.log(data);
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-xl border border-gray-200 bg-primary-color space-y-2">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold">
          Set times for pickup & return
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
          Guests can only book trips that begin and end during your available
          hours. These hours apply to all your vehicles.
        </p>
      </div>

      {/* Always Available Toggle */}
      <div className="p-5 rounded-xl border border-gray-200 bg-primary-color space-y-2 flex items-center justify-between">
        <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 mt-2">
          Always Available
        </span>
        <Switch
          checked={alwaysAvailable}
          onChange={() => handleAlwaysAvailable({ id: id as string })}
        />
      </div>

      {/* Week Schedule List */}
      <div className="space-y-2">
        {WEEK_DAYS.map((item, index) => (
          <button
            key={index}
            className="w-full text-left bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-5 flex justify-between items-center transition"
            onClick={() => {
              router(`/host/vehicles/availability/update/${id}?day=${item.day}`);
            }}
          >
            <div className="space-y-2">
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${item.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
                  }`}
              >
                {item.available ? "Available" : "Unavailable"}
              </span>

              <h4 className="font-bold mt-4 text-sm sm:text-base lg:text-lg">
                {item.day}
              </h4>

              {/* Display all time slots */}
              <div className="space-y-1">
                {item.timeSlots.map((timeSlot, slotIndex) => (
                  <p key={slotIndex} className="text-gray-500 text-xs sm:text-sm lg:text-base">
                    {timeSlot}
                  </p>
                ))}
              </div>
            </div>

            <RightOutlined className="text-gray-400 cursor-pointer" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminVehiclesAvaibility;
