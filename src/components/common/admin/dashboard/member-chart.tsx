import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Point,
  BubbleDataPoint,
  ScriptableContext,
} from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MemberChartProps {
  data: any;
  isLoading: boolean;
  isRefetching?: boolean;
}

const getGradient = (chart: any) => {
  const { ctx, chartArea } = chart;
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.top,
    0,
    chartArea.bottom
  );
  gradient.addColorStop(0.5, "#3B63E1");
  gradient.addColorStop(1, "#5CA86C");
  return gradient;
};

const monthsLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function MemberChart({
  data,
  isLoading,
  isRefetching,
}: MemberChartProps) {
  const getMonthFromDate = (date: string) => {
    const monthIndex = new Date(parseInt(date)).getMonth();
    return monthsLabels[monthIndex] || "";
  };

  const getMembersByMonth = (month: string) => {
    if (!data || !data.members || data.members.length === 0) return 0;

    return (
      data?.members?.filter((member: any) => {
        return getMonthFromDate(member?.createdAt) === month;
      }).length || 0
    );
  };

  const chartOptions = {
    scales: {
      y: { border: { display: true } },
      x: { grid: { display: false } },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  } satisfies ChartOptions;

  const chartData: ChartData<
    "bar",
    (number | Point | [number, number] | BubbleDataPoint | null)[],
    unknown
  > = {
    labels: monthsLabels,
    datasets: [
      {
        label: "Members Joined",
        data: monthsLabels.map((month) => getMembersByMonth(month)),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          return chart.chartArea ? getGradient(chart) : null;
        },
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 15,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="mt-10 border border-secondary w-full px-4 pt-6 rounded-[20px]">
      <div className="h-44 mb-20">
        <p className="text-xl text-[#2B3674]">Membership data</p>
        <p className="text-[#BABEC6] mb-4">Monthly trend</p>
        {(isLoading || isRefetching) && <Skeleton className="w-full h-full" />}
        {!isLoading && !isRefetching && (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
