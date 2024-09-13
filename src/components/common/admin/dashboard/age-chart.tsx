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

interface AgeChartProps {
  data: any;
  isLoading: boolean;
  isRefetching?: boolean;
}

const AgeGroup = [
  { name: "0-10", default: 0 },
  { name: "11-20", default: 0 },
  { name: "21-30", default: 0 },
  { name: "31-40", default: 0 },
  { name: "41-50", default: 0 },
  { name: "51-60", default: 0 },
  { name: "61-70", default: 0 },
  { name: "71-80", default: 0 },
  { name: "81-90", default: 0 },
  { name: "91-100", default: 0 },
];

export default function AgeChart({
  data,
  isLoading,
  isRefetching,
}: AgeChartProps) {
  // get the age group keys
  const ageGroupKeys = AgeGroup.map((group) => group.name);
  // get the age group default values
  const ageGroupValues = AgeGroup.map((group) => {
    // filter the data to get the members in the age group
    const groupData = data?.members?.filter(
      (member: any) =>
        member?.age >= parseInt(group.name.split("-")[0]) &&
        member?.age <= parseInt(group.name.split("-")[1])
    );
    return groupData?.length;
  });

  const chartData = {
    labels: ageGroupKeys,
    datasets: [
      {
        label: "Members",
        data: ageGroupValues,
        backgroundColor: "#5CA86C",
        borderColor: "#A0AEC0",
        borderRadius: 100,
        barThickness: 15,
      },
    ],
  } satisfies ChartData;

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#A0AEC0",
          font: {
            size: 12,
          },
        },
      },
      y: {
        display: false,
        border: { dash: [5, 5] },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  } satisfies ChartOptions;

  return (
    <div className="mt-10 border border-secondary w-full px-4 pt-6 rounded-[20px]">
      <div className="h-44 mb-20">
        <p className="text-xl text-[#2B3674] mb-10">Age Distribution</p>
        {isLoading || (isRefetching && <Skeleton className="w-full h-full" />)}
        {!isLoading && !isRefetching && (
          <Bar data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
