import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <Tabs defaultValue="account" className="w-full h-full space-y-10">
      <TabsList className="bg-head h-14 justify-start gap-2.5 overflow-x-auto overflow-y-hidden py-2.5 px-3 w-full">
        {tabs.map((tab) => (
          <motion.div key={tab.value} initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            duration: 0.2,
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className={`flex space-x-2 items-center justify-center text-sm md:text-base shadow-main_DarkBlueHover/10 rounded-md shadow-md py-2 px-5 w-1/2 md:w-fit`}
          >
            <TabsTrigger
              className="data-[state=active]:bg-main_DarkBlue font-normal rounded-md data-[state=active]:text-white text-xl"
              key={tab.value}
              value={tab.value}
            >
              {tab.label}
            </TabsTrigger>
          </motion.div>
        ))}
      </TabsList>
      <TabsContent value="church">
        <ChurchList />
      </TabsContent>
    </Tabs>
  );
}
