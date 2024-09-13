"use client";

import { LabelStack } from "@/components/ui/labels";
import { Header } from "./header";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import SelectComponent from "../../Input/select";
import InputComponent from "../../Input/input";
import {
  useAddContactLabel,
  useGetContactLabels,
  useRemoveContactLabel,
} from "@/lib/client/useContact";
import { toast } from "sonner";
import { LoadingCircle } from "@/components/ui/loading-circle";

interface LabelProps {
  // initialLabels?: Array<{
  //   label: string;
  //   color: string;
  // }>;
  authContact?: any;
  contactId?: string;
}

export default function Labels({ authContact, contactId }: LabelProps) {
  const { data, isLoading } = useGetContactLabels({
    churchId: authContact?.churchId ?? "",
    contactId: contactId ?? "",
  });
  const deleteMutation = useRemoveContactLabel();
  const labels = data;

  async function handleDelete(labelId: string) {
    try {
      await deleteMutation.mutateAsync(
        {
          churchId: authContact?.churchId,
          contactId: contactId ?? "",
          labelId: labelId,
        },
        {
          onSuccess: () => {
            toast.success("Label deleted successfully");
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || "An error occurred");
            console.error("Error deleting label", error);
          },
        }
      );
    } catch (error: any) {
      // This catch block is generally for safety; `onError` should handle most errors.
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("Error deleting label", error);
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <Header title="Labels" size={"sm"} headerColor="primary" />
      <div className="flex gap-3 items-center">
        {isLoading ? (
          // Show skeleton loader while data is loading
          <LabelStackSkeleton visibleCount={6} />
        ) : labels && labels.length > 0 ? (
          // Render LabelStack if there are labels to display
          <LabelStack
            labels={labels} // Use either data or initialLabels
            shouldDelete={true}
            deleteFn={handleDelete}
            maxLabelsAmount={10}
          />
        ) : (
          // Show fallback message if no labels are available
          <span className="text-lg text-textDark">No Labels Added Yet</span>
        )}

        {/* Add label dialog */}
        <AddLabelDialog
          churchId={authContact?.churchId}
          contactId={contactId ?? ""}
        />
      </div>
    </div>
  );
}

const LabelStackSkeleton = ({ visibleCount = 3 }) => {
  return (
    <div className="flex flex-wrap gap-y-2 gap-x-3">
      {/* Skeletons for visible labels */}
      {Array.from({ length: visibleCount }).map((_, index) => (
        <Skeleton key={index} className="h-7 w-20 bg-gray-200 rounded-md" />
      ))}
    </div>
  );
};

// A dialog box that allows the user to add a new label to a contact
const AddLabelDialog = ({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) => {
  const [labelName, setLabelName] = useState("");
  const [labelColor, setLabelColor] = useState("red");
  const [open, setOpen] = useState(false);
  const addLabelMutation = useAddContactLabel();

  async function addLabel() {
    try {
      await addLabelMutation.mutateAsync(
        {
          Idata: { name: labelName, color: labelColor },
          churchId,
          contactId,
        },
        {
          onSuccess: () => {
            toast.success("Label added successfully");
            setLabelName(""); // Clear the label name
            setLabelColor("red"); // Reset the label color
            setOpen(false);
          },
          onError: (error: any) => {
            toast.error(error?.response?.data?.message || "An error occurred");
            console.error("Error adding label", error);
          },
        }
      );
    } catch (error: any) {
      // This catch block is generally for additional safety; `onError` should handle most errors.
      toast.error(error?.response?.data?.message || "An error occurred");
      console.error("Error adding label", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="bg-main_DarkBlue hover:bg-main_DarkBlueHover text-white rounded-full size-6 shadow-md max-w-md py-0.5  px-1">
          <Plus className="text-white size-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Label</DialogTitle>
          <DialogDescription>Add a new label to this contact</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <InputComponent
            heading="Label Name"
            value={labelName}
            onChange={(e) => setLabelName(e.target.value)}
          />
          <SelectComponent
            placeholder="pick a color"
            options={["red", "blue", "yellow", "green", "gray"]}
            value={labelColor}
            setValue={setLabelColor}
          />
          <button
            onClick={addLabel}
            disabled={addLabelMutation.isPending}
            className="bg-main_DarkBlue hover:bg-main_DarkBlueHover text-white flex justify-center rounded-lg py-2 px-6">
            {addLabelMutation.isPending ? <LoadingCircle /> : "Add Label"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
