'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useAdminDash } from '@/lib/client/useAdminDash';
import { Separator } from '@radix-ui/react-select';
import { CircleCheckBig, MoveUpRight, Redo2, UsersRound } from 'lucide-react';
import { Fragment } from 'react';

export default function AccountCards() {
  const { data, isLoading } = useAdminDash();

  const cards = [
    {
      id: 1,
      title: data?.totalChurches.toString(),
      description: 'Total Accounts',
      icon: <UsersRound size={30} className="text-main_DarkBlue" />,
      footer: '10.2', // Can be dynamically calculated based on further data if needed
      insight: '+1.01% this week', // Insight can be calculated if needed
    },
    {
      id: 2,
      title: data?.activeAccounts.toString(),
      description: 'Active Accounts',
      icon: <UsersRound size={30} className="text-[#FD8584]" />,
      footer: '3.1', // Can be dynamically calculated based on further data if needed
      insight: '+0.49% this week', // Insight can be calculated if needed
    },
    {
      id: 3,
      title: data?.inactiveAccounts.toString(),
      description: 'Inactive Accounts',
      icon: <CircleCheckBig size={30} className="text-[#967FF2]" />,
      footer: '',
      insight: '',
    },
    {
      id: 4,
      title: data?.verifiedAccounts.toString(),
      description: 'Verified Accounts',
      icon: <Redo2 size={30} className="text-[#FD981F]" />,
      footer: '7.2', // Can be dynamically calculated based on further data if needed
      insight: '+1.51% this week', // Insight can be calculated if needed
    },
  ];

  return !isLoading ? (
    <div className="">
      <Card className="grid md:grid-cols-2 lg:grid-cols-4 xl:py-5 divide-y-2 lg:divide-y-0 items-center md:divide-x-2">
        {cards.map((card) => (
          <Fragment key={card.id}>
            <Card className="md:px-2 xl:px-8 py-3 xl:py-5 border-0 rounded-none justify-between h-full flex flex-col w-full">
              <CardContent className="h-full w-full self-start">
                <div className="w-full flex justify-between">
                  <h1 className="text-3xl font-bold">{card.title}</h1>
                  <span>{card.icon}</span>
                </div>
                <CardDescription className="text-lg text-black">
                  {card.description}
                </CardDescription>
              </CardContent>
              {/* {card.footer && (
                <CardFooter className="h-full flex text-textDark items-center gap-2">
                  <MoveUpRight size={20} className="text-main_secondaryDark" />
                  <span>{card.footer}</span>
                  <span>{card.insight}</span>
                </CardFooter>
              )} */}
            </Card>
          </Fragment>
        ))}
      </Card>
    </div>
  ) : (
    <div className="w-full flex justify-center"><LoadingSpinner/></div>
  );
}

function CardsSkeleton() {
  return (
    <div className="">
      <Card className="grid md:grid-cols-2 lg:grid-cols-4 xl:py-5 divide-y-2 lg:divide-y-0 items-center md:divide-x-2">
        {Array.from({ length: 5 }, (card, i) => (
          <Fragment key={i}>
            <Card className="md:px-2 xl:px-8 border-0 rounded-none justify-between flex flex-col w-full">
              <CardContent className=" w-full self-start">
                <div className="w-full flex justify-between">
                  <h1 className="text-3xl animate-pulse font-bold">{}</h1>
                  <span className="animate-pulse">{}</span>
                </div>
                <CardDescription className="text-lg animate-pulse text-black">
                  {}
                </CardDescription>
              </CardContent>
              <CardFooter className=" animate-pulse flex text-textDark items-center gap-2">
                {/* <MoveUpRight size={20} className="text-main_secondaryDark" /> */}
                <span>{}</span>
                <span>{}</span>
              </CardFooter>
            </Card>
          </Fragment>
        ))}
      </Card>
    </div>
  );
}
