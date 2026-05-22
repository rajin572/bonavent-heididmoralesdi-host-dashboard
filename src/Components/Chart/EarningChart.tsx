/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type YearlyData = Record<
  "jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec",
  number
>;

interface ChartItem {
  name: string;
  income: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

interface Props {
  // ✅ now chartData is yearlyData object
  chartData?: Partial<YearlyData> | Record<string, number>;
}

const monthMap: Record<string, string> = {
  jan: "Jan",
  feb: "Feb",
  mar: "Mar",
  apr: "Apr",
  may: "May",
  jun: "Jun",
  jul: "Jul",
  aug: "Aug",
  sep: "Sep",
  oct: "Oct",
  nov: "Nov",
  dec: "Dec",
};

// ✅ keep month order always
const monthOrder = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const EarningChart: React.FC<Props> = ({ chartData }) => {
  // ✅ Transform API data → recharts data
  const data: ChartItem[] = useMemo(() => {
    if (!chartData) return [];

    return monthOrder.map((month) => ({
      name: monthMap[month],
      income: Number((chartData as any)?.[month] ?? 0),
    }));
  }, [chartData]);

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md p-2 rounded-md border border-gray-300">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <p className="text-xs text-gray-600">
            Earnings:{" "}
            <span className="font-semibold text-blue-600">
              €{payload[0].value}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const tickStyle = { fill: "#555", fontSize: 12 };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
          barCategoryGap={30}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6078EA" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#E5E5EF" vertical={false} />

          <XAxis
            dataKey="name"
            tick={tickStyle}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />

          <YAxis
            tick={tickStyle}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />

          <RechartsTooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ fontSize: 12, paddingBottom: 10 }}
          />

          <Bar
            dataKey="income"
            name="Earnings"
            fill="url(#incomeGradient)"
            barSize={20}
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningChart;
