import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChurchList } from './church-settings/list';

export function SettingsTab() {
  const tabs = [
    { value: 'account', label: 'Account Settings' },
    { value: 'church', label: 'Church Settings' },
    { value: 'membership', label: 'Membership Settings' },
    { value: 'integrations', label: 'Integrations' },
    { value: 'church-analytics', label: 'Church Analytics' },
  ];
  return (
    <Tabs defaultValue="church" className="w-full h-full space-y-10">
      <TabsList className="bg-head h-14 justify-start gap-2.5 overflow-x-auto overflow-y-hidden py-2.5 px-3 w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            className="data-[state=active]:bg-main_DarkBlue font-normal rounded-md data-[state=active]:text-white text-xl"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="church">
        <ChurchList />
      </TabsContent>
      <TabsContent value="account">
        <div className="flex items-center justify-center w-full">
          <h2>Coming Soon</h2>
        </div>
      </TabsContent>
      <TabsContent value="membership">
        <div className="flex items-center justify-center w-full">
          <h2>Coming Soon</h2>
        </div>
      </TabsContent>
      <TabsContent value="integrations">
        <div className="flex items-center justify-center w-full">
          <h2>Coming Soon</h2>
        </div>
      </TabsContent>
      <TabsContent value="church-analytics">
        <div className="flex items-center justify-center w-full">
          <h2>Coming Soon</h2>
        </div>
      </TabsContent>
    </Tabs>
  );
}
