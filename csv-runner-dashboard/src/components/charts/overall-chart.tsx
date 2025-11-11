"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RunData } from "@/types";
import { formatDate } from "@/lib/utils";

interface OverallChartProps {
  data: RunData[];
}

export function OverallChart({ data }: OverallChartProps) {
  // Group data by date and calculate total miles per day
  const dailyData = data.reduce((acc, run) => {
    const existing = acc.find((item) => item.date === run.date);
    if (existing) {
      existing.miles += run.miles;
    } else {
      acc.push({ date: run.date, miles: run.miles });
    }
    return acc;
  }, [] as { date: string; miles: number }[]);

  // Sort by date
  dailyData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const chartData = dailyData.map((item) => ({
    date: formatDate(item.date),
    miles: item.miles,
    fullDate: item.date,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={12}
          />
          <YAxis
            label={{
              value: "Miles",
              angle: -90,
              position: "insideLeft",
              fontSize: 12,
            }}
            fontSize={12}
          />
          <Tooltip
            formatter={(value: number) => [
              `${value.toFixed(1)} miles`,
              "Miles",
            ]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="miles"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Total Miles"
            dot={{ fill: "#3b82f6", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
