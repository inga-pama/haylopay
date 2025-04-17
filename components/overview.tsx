"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Feb",
    income: 750,
    expense: 500,
  },
  {
    name: "Mar",
    income: 1400,
    expense: 800,
  },
  {
    name: "Apr",
    income: 900,
    expense: 600,
  },
  {
    name: "May",
    income: 1100,
    expense: 700,
  },
  {
    name: "Jun",
    income: 800,
    expense: 400,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="income" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary opacity-30" />
        <Bar dataKey="expense" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

