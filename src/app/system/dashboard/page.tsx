import AccountCards from '@/components/common/system/cards/AccountCards';
import { AnalyticsChart } from '@/components/common/system/charts/AnalyticsChart';
import { PieCharts } from '@/components/common/system/charts/PieCharts';
import { RecentUserDataTable } from '@/components/common/system/table/RecentUsersTable';
import { EllipsisVertical } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="py-8 px-4 md:px-16 flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex justify-between items-center w-full">
          <div>
            <h2 className="text-lg font-semibold capitalize">Overview</h2>
            <p className="text-textDark text-sm">
              Account statistics, summary and insights.
            </p>
          </div>
          <EllipsisVertical />
        </div>
        <AccountCards />
      </div>
      <div className="flex flex-col gap-6 ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold capitalize">Data Analytics</h3>
            <p className="text-textDark text-sm">
              In-depth analysis of accounts engagement and trends.
            </p>
          </div>
          <EllipsisVertical />
        </div>
        <div className="flex flex-col lg:grid md:grid-cols-[70%_30%]">
          <AnalyticsChart />
          <PieCharts />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold capitalize">
              Recent Accounts
            </h3>
            <p className="text-textDark text-sm">
              List of accounts who joined today
            </p>
          </div>
          <EllipsisVertical />
        </div>
        <RecentUserDataTable />
      </div>
    </div>
  );
}
