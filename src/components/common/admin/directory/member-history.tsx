import { IMember } from "@/types/member";
import { InfoField } from "./personal-info";
import { formatDate } from "@/lib/utils/date-formatter";

interface MemberHistoryInfoProps {
  member: IMember | undefined;
}

export default function MemberHistoryInfo({ member }: MemberHistoryInfoProps) {
  const Info = [
    {
      label: "Date Joined",
      value: member?.createdAt ? formatDate(member.createdAt) : "N/A",
    },
    {
      label: "CreatedBy",
      value: member?.createdBy ? member?.createdBy : "N/A",
    },
    {
      label: "Updated At",
      value: member?.updatedAt ? formatDate(member.updatedAt) : "N/A",
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
