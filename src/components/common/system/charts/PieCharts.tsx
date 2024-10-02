'use client';

import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { EllipsisVertical } from 'lucide-react';

export const description = 'A pie chart with a legend';

const chartData = [
  { status: 'active', visitors: 200, fill: '#61BD74' },
  { status: 'inactive', visitors: 187, fill: '#446DE3' },
];

const chartConfig = {
  active: {
    label: 'Active',
    color: '#61BD74',
  },
  inactive: {
    label: 'Inactive',
    color: '#446DE3',
  },
} satisfies ChartConfig;

export function PieCharts() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className='flex w-full justify-between items-center'>
          <h2 >Active vs Inactive Accounts</h2>
          <EllipsisVertical />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] lg:max-h-[250px]"
        >
          <PieChart className='h-32'>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
