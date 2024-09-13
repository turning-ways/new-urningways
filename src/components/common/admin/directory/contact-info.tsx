import { IMember } from "@/types/member";
import { InfoField } from "./personal-info";

interface ContactInfoProps {
  member: IMember | undefined;
}

export default function ContactInfo({ member }: ContactInfoProps) {
  const Info = [
    { label: "Email", value: member?.email || "N/A" },
    { label: "Address", value: member?.address || "N/A" },
    { label: "Phone", value: member?.phone || "N/A" },
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
