/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Sector,
  Tooltip as RechartsTooltip,
} from "recharts";

interface VehicleEarning {
  vehicleId: string;
  vehicleName: string;
  totalEarning: number;
}

interface PieDataItem {
  vehicleName: string;
  value: number;
  totalEarning: number;
}

interface EarningsPieChartProps {
  data: VehicleEarning[] | undefined;
}

const COLORS = ["#6078EA", "#4A90E2", "#00C49F", "#FFB347", "#8D8D8D", "#FF6B6B", "#4ECDC4"];

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: Array<{ payload: PieDataItem; value: number }>;
}> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as PieDataItem;
    return (
      <div className="bg-white shadow-lg p-3 rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-800 mb-1">
          {data.vehicleName}
        </p>
        <p className="text-xs text-gray-600">
          Earnings: <span className="font-bold text-lg">${data.totalEarning.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

const EarningsPieChart: React.FC<EarningsPieChartProps> = ({ data = [] }) => {

  const pieData = useMemo((): PieDataItem[] => {
    // Handle undefined/empty data
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Filter ONLY vehicles with positive earnings
    const validData: VehicleEarning[] = data.filter(item => item.totalEarning > 0);

    if (validData.length === 0) {
      return [];
    }

    // For 4 or fewer vehicles, return directly
    if (validData.length <= 4) {
      return validData.map(item => ({
        vehicleName: item.vehicleName,
        value: Math.max(1, item.totalEarning), // Ensure minimum value > 0
        totalEarning: item.totalEarning
      }));
    }

    // Group top 4 + "Others"
    const sorted = [...validData].sort((a, b) => b.totalEarning - a.totalEarning);
    const top4 = sorted.slice(0, 4);
    const othersTotal = sorted.slice(4).reduce((sum, item) => sum + item.totalEarning, 0);

    const result: PieDataItem[] = top4.map(item => ({
      vehicleName: item.vehicleName,
      value: Math.max(1, item.totalEarning),
      totalEarning: item.totalEarning
    }));

    if (othersTotal > 0) {
      result.push({
        vehicleName: "Others",
        value: Math.max(1, othersTotal),
        totalEarning: othersTotal
      });
    }

    return result;
  }, [data]);

  // Don't render chart if no data
  if (pieData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 w-full h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg font-semibold mb-2">No Earnings Data</p>
          <p className="text-gray-400 text-sm">No vehicles have earnings this period</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 w-full">
      <div className="mb-6">
        <p className="text-base sm:text-lg lg:text-xl text-base-color font-bold mb-1">
          Earnings by Vehicle
        </p>
        <p className="text-sm sm:text-base lg:text-lg text-[#4A5565] font-semibold">
          This year
        </p>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <RechartsTooltip content={<CustomTooltip />} />
            <Pie
              activeShape={renderActiveShape}
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
   // Replace the entire Legend component with this:
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              content={({ payload }: any) => {
                return (
                  <ul className="flex flex-col gap-2 pl-4">
                    {payload?.map((entry: any, index: number) => {
                      // Get the vehicle data from the entry's payload
                      const vehicleName = entry.payload?.vehicleName || entry.payload?.payload?.vehicleName;
                      const totalEarning = entry.payload?.totalEarning || entry.payload?.payload?.totalEarning;

                      if (!vehicleName || !totalEarning || totalEarning <= 0) return null;

                      return (
                        <li key={`legend-${index}`} className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-xs text-gray-700 flex justify-between flex-1 min-w-[160px]">
                            <span>{vehicleName}</span>
                            <span className="font-semibold ml-4">
                              ${totalEarning.toLocaleString()}
                            </span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsPieChart;
