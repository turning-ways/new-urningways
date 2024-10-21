"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useAdminDash } from "@/lib/client/useAdminDash"

export const description = "A line chart"



const chartConfig = {
  count: {
    label: "Churches",
    color: "#446DE3",
  },
} satisfies ChartConfig

export function AnalyticsChart() {
  const {data} = useAdminDash();
  const monthNames =  {
    jan: "January",
    feb: "February",
    mar: "March",
    apr: "April",
    may: "May",
    jun: "June",
    jul: "July",
    aug: "August",
    sep: "September",
    oct: "October",
    nov: "November",
    dec: "December",
  };
  
  const currentMonthIndex = new Date().getMonth();

  const chartData = data?.churches
    ?.filter((data: {month: string}) => Object.keys(monthNames).indexOf(data.month) <= currentMonthIndex + 1)
    .map((data: {month: keyof typeof monthNames, count: number}) => ({
      month: monthNames[data.month],
      count: data.count,
    }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign-up trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-64 w-full" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="#17275B"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
