import { IMember } from "@/types/member";
import { InfoField } from "./personal-info";
import { nameCapitalizer } from "@/lib/utils/capitalize";

interface ChurchInfoProps {
  member: IMember | undefined;
}

export default function ChurchInfo({ member }: ChurchInfoProps) {
  const Info = [
    {
      label: "Worker Status",
      value: member?.workerStatus
        ? nameCapitalizer(member.workerStatus)
        : "N/A",
    },
    {
      label: "Worker Type",
      value: member?.workerType ? nameCapitalizer(member.workerType) : "N/A",
    },
    {
      label: "Service Unit",
      value: member?.serviceUnit ? nameCapitalizer(member.serviceUnit) : "N/A",
    },
    {
      label: "Verification Status",
      value: member?.verificationStatus
        ? nameCapitalizer(member.verificationStatus)
        : "N/A",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Info.map((info, index) => (
        <InfoField
          key={index}
          label={info.label}
          value={info.value}
          isLastItem={index === Info.length - 1 && Info.length % 2 !== 0}
        />
      ))}
    </div>
  );
}
