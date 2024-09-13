import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Contact } from "@/lib/client/contactApiFunction";
import { useUpdateContactStatus } from "@/lib/client/useContact";
import { nameCapitalizer } from "@/lib/utils/capitalize";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Define a color mapping for each contact status
const statusColors: { [key in Contact["contactStatus"]]: string } = {
  NEW: "text-green-500",
  CONTACTED: "text-blue-500",
  WON: "text-yellow-500",
  LOST: "text-red-500",
};

// bg statusColors[status]
const statusColorsBg: { [key in Contact["contactStatus"]]: string } = {
  NEW: "bg-green-400 hover:bg-green-300",
  CONTACTED: "bg-blue-400 hover:bg-blue-300",
  WON: "bg-yellow-400 hover:bg-yellow-300",
  LOST: "bg-red-400 hover:bg-red-300",
};

export default function ContactStatus({
  contact,
  authContact,
}: {
  authContact: any;
  contact: Contact | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Contact["contactStatus"] | undefined>(
    contact?.contactStatus
  );
  const updateStatus = useUpdateContactStatus();

  const handleStatusChange = async (status: Contact["contactStatus"]) => {
    setStatus(status);
    await updateStatus.mutateAsync(
      {
        churchId: authContact?.churchId || "",
        contactId: contact?.id || "",
        Idata: { contactStatus: status },
      },
      {
        onSuccess: () => {
          console.log("Status updated successfully");
          toast.success("Status updated successfully");
          setIsOpen(false);
        },
        onError: (error: any) => {
          console.error("Error updating status", error);
          toast.error("Error updating status");
          setStatus(contact?.contactStatus || "NEW");
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <button
          className={`flex items-center gap-2 border border-main_DarkBlue text-white rounded-lg py-2 px-6 ${
            statusColorsBg[status as Contact["contactStatus"]]
          } `}>
          {nameCapitalizer(contact?.contactStatus || "")}{" "}
          <ChevronDown className="text-[10px]" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Status</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => handleStatusChange("NEW")}>
            <DropdownMenuCheckboxItem checked={status === "NEW"} />
            <span className={statusColors.NEW}>New</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleStatusChange("CONTACTED")}>
            <DropdownMenuCheckboxItem checked={status === "CONTACTED"} />
            <span className={statusColors.CONTACTED}>Contacted</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleStatusChange("WON")}>
            <DropdownMenuCheckboxItem checked={status === "WON"} />
            <span className={statusColors.WON}>Won</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleStatusChange("LOST")}>
            <DropdownMenuCheckboxItem checked={status === "LOST"} />
            <span className={statusColors.LOST}>Lost</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
