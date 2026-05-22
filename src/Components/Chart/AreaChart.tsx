/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Define the structure of the chart data
interface ChartData {
  name: string;
  uv: number;
}

const activeDotStyle = {
  r: 8,
  stroke: "#fff",
  strokeWidth: 2,
  fill: "#6078EA",
};

const Area_Chart = ({
  chartData,
  isFetching,
}: {
  chartData: any; // can be object OR array (we'll normalize)
  isFetching: boolean;
}) => {
  const tickStyle = { fill: "#000", fontSize: 12 };

  const yAxisTickFormatter = (value: any): string => {
    if (typeof value === "number") {
      if (value >= 1000000) return `${value / 1000000}M`;
      if (value >= 1000) return `${value / 1000}k`;
      return value.toString();
    }
    return String(value);
  };

  // ✅ Normalize data: object -> array that recharts expects
  const data: ChartData[] = useMemo(() => {
    // If backend already sends array, use it
    if (Array.isArray(chartData)) {
      return chartData.map((d: any) => ({
        name: String(d?.name ?? ""),
        uv: Number(d?.uv ?? 0),
      }));
    }

    // If backend sends object { jan: 0, feb: 4196, ... }
    const monthOrder = [
      { key: "jan", label: "Jan" },
      { key: "feb", label: "Feb" },
      { key: "mar", label: "Mar" },
      { key: "apr", label: "Apr" },
      { key: "may", label: "May" },
      { key: "jun", label: "Jun" },
      { key: "jul", label: "Jul" },
      { key: "aug", label: "Aug" },
      { key: "sep", label: "Sep" },
      { key: "oct", label: "Oct" },
      { key: "nov", label: "Nov" },
      { key: "dec", label: "Dec" },
    ];

    return monthOrder.map((m) => ({
      name: m.label,
      uv: Number(chartData?.[m.key] ?? 0),
    }));
  }, [chartData]);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <AreaChart
          data={isFetching ? [] : data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} stroke="#E5E5EF" strokeDasharray="0" />

          <XAxis dataKey="name" tick={{ ...tickStyle }} tickMargin={6} />

          <YAxis
            tickCount={5}
            tickFormatter={yAxisTickFormatter}
            tick={{ ...tickStyle }}
            tickMargin={16}
            axisLine={{
              stroke: "#ffffff",
              strokeWidth: 2,
              strokeDasharray: "7 7",
            }}
          />

          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6078EA" stopOpacity={1} />
              <stop offset="70%" stopColor="#fff" stopOpacity={1} />
              <stop offset="100%" stopColor="#fff" stopOpacity={1} />
            </linearGradient>
          </defs>

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            itemStyle={{ color: "#0a0a08" }}
            labelStyle={{ color: "#202020" }}
            formatter={(value: number): [string, string] => [`${value}`, "UV"]}
            labelFormatter={(label: string) => `Month: ${label}`}
          />

          <Area
            type="monotone"
            dataKey="uv"
            stroke="#6078EA"
            strokeWidth={3}
            fill="url(#colorUv)"
            activeDot={{ ...activeDotStyle }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Area_Chart;
