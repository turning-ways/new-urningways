"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";

ChartJS.register(Tooltip, Legend, ArcElement);

interface PieChartProps {
  data: {
    totalMembers: number;
    femaleMembers: number;
    maleMembers: number;
  };
  isLoading?: boolean;
  isRefetching?: boolean;
}

export default function PieChart({
  data,
  isRefetching,
  isLoading,
}: PieChartProps) {
  const chartInfo = {
    Male: data.maleMembers,
    Female: data.femaleMembers,
  } as { [key: string]: number };

  const chartData = {
    labels: Object.keys(chartInfo),
    datasets: [
      {
        label: "Total Members",
        data: Object.values(chartInfo),
        backgroundColor: ["#758CD7", "#A0D7AB"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  } satisfies ChartData;

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          padding: 10,
        },

        align: "center",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  } satisfies ChartOptions;

  const getGenderPercentage = (type: string) => {
    if (!data.totalMembers) return "0";
    const percent =
      ((chartInfo[type] / data.totalMembers) * 100).toFixed(0) || 0;
    return Number.isNaN(percent) ? "0" : `${percent}`;
  };

  return (
    <div className="mt-10 w-full px-4 pt-6 rounded-[20px] bg-[#F6F8FA]">
      <div className="flex flex-col">
        <p className="text-xl text-[#2B3674] mb-3">Gender Distribution</p>
        <div className="w-[200px] self-center h-full">
          {isRefetching || isLoading ? (
            <Skeleton className="w-full h-[200px] rounded-lg" />
          ) : (
            <Pie data={chartData} options={chartOptions} />
          )}
        </div>
        <div className="flex bg-white justify-center gap-x-3 py-2 my-3 rounded-lg">
          {Object.keys(chartInfo).map((key) => (
            <div key={key}>
              <div className="flex items-center gap-x-1">
                <div className="h-12 flex flex-col justify-center items-center gap-1.5">
                  <div className="flex gap-1 items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        key === "Male" ? "bg-[#758CD7]" : "bg-[#A0D7AB]"
                      } rounded-full`}
                    />
                    <span className="text-base text-gray-400">{key}</span>
                  </div>
                  <span className="text-right text-[#2B3674] text-[18px] font-bold">
                    {getGenderPercentage(key)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
