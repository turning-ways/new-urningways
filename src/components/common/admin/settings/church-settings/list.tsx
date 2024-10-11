'use client'
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ChurchList() {
  const router = useRouter();
  const churchSettings = [
    { label: 'Church Profile', to: 'settings/church/profile' },
    // { label: 'Organizational Structures', to: 'settings/church/organizational' },
    // { label: 'Church Entities', to: 'settings/church/entities' },
    // { label: 'Service Units/Groups', to: 'settings/church/service-units' },
  ];
  return (
    <div className="w-full">
      <ul className="w-full divide-y-2">
        {churchSettings.map((setting, index) => (
          <li
            key={index}
            onClick={() => router.push(setting.to)}
            className="w-full text-textDark text-xl cursor-pointer hover:bg-head p-3 flex justify-between items-center"
          >
            <p>{setting.label}</p>
            <ChevronRight />
          </li>
        ))}
      </ul>
    </div>
  );
}
