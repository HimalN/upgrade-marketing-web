"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: { date: string; inquiries: number; views: number }[];
}

export default function AnalyticsChart({ data }: ChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#D6A64B" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#D6A64B" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E8C477" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#E8C477" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222222" />
          <XAxis
            dataKey="date"
            stroke="#666666"
            fontSize={11}
            tickLine={false}
          />
          <YAxis stroke="#666666" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              borderColor: "rgba(214, 166, 75, 0.4)",
              borderRadius: "8px",
              color: "#ffffff",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="inquiries"
            stroke="#D6A64B"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#goldGradient)"
            name="Inquiries"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

