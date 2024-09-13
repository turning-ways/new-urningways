import { IMember } from "@/types/member";
import { nameCapitalizer } from "@/lib/utils/capitalize";
import { dobFormatter } from "@/lib/utils/date-formatter";

interface PersonalInfoProps {
  member: IMember | undefined;
}

export default function Personal({ member }: PersonalInfoProps) {
  const Info = [
    {
      label: "First Name",
      value: member?.firstName ? nameCapitalizer(member.firstName) : "N/A",
    },
    {
      label: "Middle Name",
      value: member?.middleName ? nameCapitalizer(member.middleName) : "N/A",
    },
    {
      label: "Last Name",
      value: member?.lastName ? nameCapitalizer(member.lastName) : "N/A",
    },
    {
      label: "Prefix",
      value: member?.prefix ? nameCapitalizer(member.prefix) : "N/A",
    },
    {
      label: "Suffix",
      value: member?.suffix ? nameCapitalizer(member.suffix) : "N/A",
    },
    {
      label: "Gender",
      value: member?.gender && nameCapitalizer(member.gender),
    },
    {
      label: "Birthday",
      value: member?.dateOfBirth ? dobFormatter(member.dateOfBirth) : "N/A",
    },
    {
      label: "Marital Status",
      value: member?.maritalStatus
        ? nameCapitalizer(member.maritalStatus)
        : "N/A",
    },
    {
      label: "Education Level",
      value: member?.educationLevel
        ? nameCapitalizer(member.educationLevel)
        : "N/A",
    },
    {
      label: "Employment Status",
      value: member?.employmentStatus
        ? nameCapitalizer(member.employmentStatus)
        : "N/A",
    },
    {
      label: "Health Status",
      value: member?.healthStatus
        ? nameCapitalizer(member.healthStatus)
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

export const InfoField = ({
  label,
  value,
  isLastItem,
}: {
  label: string;
  value: any;
  isLastItem?: boolean;
}) => (
  <div
    className={`flex flex-col gap-2 border-b border-gray-300 pb-2 w-full ${
      isLastItem ? "lg:col-span-2" : ""
    }`}>
    <h1 className="text-gray-400 text-sm font-semibold">{label}</h1>
    <p className="text-lg">{value}</p>
  </div>
);
