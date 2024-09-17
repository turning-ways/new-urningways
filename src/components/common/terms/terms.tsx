'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Agreement,
  termList,
  OurServices,
  PropertyRights,
  UserRepresentations,
  ProhibitedActivites,
  Disclaimer,
} from '@/components/common/terms/constants/terms';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Terms() {
  const [active, setActive] = useState('AGREEMENT TO OUR LEGAL TERMS');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="text-secondary underline cursor-pointer">
          Terms of Service
        </span>
      </DialogTrigger>
      <DialogContent className="max-h-[600px] !max-w-3xl overflow-auto">
        <DialogHeader>
          <h1 className="text-2xl font-bold">Terms of Service</h1>
        </DialogHeader>
        <div className="grid grid-cols-1 w-full  overflow-hidden ">
          {/* <div className="flex flex-col px-4 bg-gray-50 py-8 h-fit sticky top-9 left-0">
            <h1 className="text-2xl font-bold">Terms of Service</h1>
            <div className="flex flex-col gap-4">
              {termList.map((term) => (
                <Button
                  key={term.name}
                  className={`${
                    active === term.name
                      ? "text-white bg-main_primary"
                      : "text-textDark bg-[#F5F7FD]"
                  } rounded-md`}
                  onClick={() => setActive(term.name)}>
                  {term.name}
                </Button>
              ))}
            </div>
          </div> */}
          <div className="w-full py-12 px-4 flex flex-col h-full">
            <div className="flex flex-col overscroll-auto font-sans gap-4">
              <div className="space-y-4">
                <h1 id={Agreement.title} className="text-2xl font-bold">
                  {Agreement.title.toUpperCase()}
                </h1>
                <p>{Agreement.p1}</p>
                <p>{Agreement.p2}</p>
                <p>
                  {Agreement.p3}{' '}
                  <span className="font-azoBold">{Agreement.p3Bold}</span>
                </p>
                <p>{Agreement.p4}</p>
                <p>{Agreement.p5}</p>
              </div>
              <div className="space-y-4">
                <h1 id={OurServices.title} className="text-2xl font-bold">
                  {OurServices.title.toUpperCase()}
                </h1>
                <p>{OurServices.p1}</p>
              </div>
              <div className="space-y-4">
                <h1 id={PropertyRights.title} className="text-2xl font-bold">
                  {PropertyRights.title.toUpperCase()}
                </h1>
                <p>{PropertyRights.p1}</p>
                <p>{PropertyRights.p2}</p>
                <p>{PropertyRights.p3}</p>
                <p>{PropertyRights.p4}</p>
                <p>{PropertyRights.p5}</p>
                <p>{PropertyRights.p6}</p>
              </div>
              <div className="space-y-4">
                <h1
                  id={UserRepresentations.title}
                  className="text-2xl font-bold"
                >
                  {UserRepresentations.title.toUpperCase()}
                </h1>
                <p>{UserRepresentations.p1}</p>
                <p>{UserRepresentations.p2}</p>
              </div>
              <div className="space-y-4">
                <h1
                  id={ProhibitedActivites.title}
                  className="text-2xl font-bold"
                >
                  {ProhibitedActivites.title.toUpperCase()}
                </h1>
                <p>{ProhibitedActivites.p1}</p>
                <p>{ProhibitedActivites.p2}</p>
                <p>{ProhibitedActivites.p3}</p>
                <p>{ProhibitedActivites.p4}</p>
                <p>{ProhibitedActivites.p5}</p>
                <p>{ProhibitedActivites.p6}</p>
              </div>
              <div className="space-y-4">
                <h1 id={Disclaimer.title} className="text-2xl font-bold">
                  {Disclaimer.title.toUpperCase()}
                </h1>
                <p>{Disclaimer.p1}</p>
                <p>{Disclaimer.p2}</p>
              </div>
            </div>
          </div>
          <DialogClose>
            <div className="!sticky bottom-0 w-full py-4 px-4">
              <Button className="w-full h-auto py-4 bg-mainLight">Close</Button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
