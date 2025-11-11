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

interface PersonChartProps {
  data: RunData[];
  person: string;
}

export function PersonChart({ data, person }: PersonChartProps) {
  const personData = data
    .filter((run) => run.person === person)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((run) => ({
      date: formatDate(run.date),
      miles: run.miles,
      fullDate: run.date,
    }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={personData}>
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
            stroke="#10b981"
            strokeWidth={2}
            name={`${person}'s Miles`}
            dot={{ fill: "#10b981", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
