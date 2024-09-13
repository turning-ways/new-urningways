"use client";

import { Header } from "@/components/common/admin/contacts/header";
import ActionCheckList from "@/components/ui/action";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  useAddContactAction,
  useGetContactActions,
  useRemoveContactAction,
  useUpdateContactActionStatus,
} from "@/lib/client/useContact";
import InputComponent from "../../Input/input";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingCircle } from "@/components/ui/loading-circle";

interface ActionProps {
  // initialActions: {
  //   id: string;
  //   actionName: string;
  //   completed: boolean;
  //   createdAt: string;
  // }[];
  className?: string;
  authContact?: any;
  contactId?: string;
}

export default function Actions({
  className,
  authContact,
  contactId,
}: ActionProps) {
  const { data } = useGetContactActions({
    churchId: authContact?.churchId ?? "",
    contactId: contactId ?? "",
  });
  const deleteAction = useRemoveContactAction();
  const actionStatus = useUpdateContactActionStatus();
  const actions = data;

  async function handleDeleteAction(actionId: string) {
    try {
      await deleteAction.mutateAsync(
        {
          churchId: authContact?.churchId ?? "",
          contactId: contactId ?? "",
          actionId,
        },
        {
          onSuccess: () => {
            toast.success("Action deleted successfully");
          },
          onError: (error: any) => {
            toast.error("Failed to delete action");
            console.error("Error deleting action:", error);
          },
        }
      );
    } catch (error: any) {
      // Additional safety catch block
      toast.error("Failed to delete action");
      console.error("Error deleting action:", error);
    }
  }

  async function handleUpdateActionStatus(
    actionId: string,
    completed: boolean
  ) {
    try {
      await actionStatus.mutateAsync(
        {
          churchId: authContact?.churchId ?? "",
          contactId: contactId ?? "",
          actionId,
          Idata: { completed },
        },
        {
          onSuccess: () => {
            toast.success("Action status updated successfully");
          },
          onError: (error: any) => {
            toast.error("Failed to update action status");
            console.error("Error updating action status:", error);
          },
        }
      );
    } catch (error: any) {
      // Additional safety catch block
      toast.error("Failed to update action status");
      console.error("Error updating action status:", error);
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-2 lg:px-2">
      <Header title="Actions" size={"sm"} headerColor="primary" />
      {actions?.length > 0 ? (
        <ActionCheckList
          actions={actions}
          className={className}
          deleteFn={handleDeleteAction}
          completeFn={handleUpdateActionStatus}
        />
      ) : (
        <p className="text-lg text-textDark mb-2">No actions yet</p>
      )}
      <AddActionDialog
        churchId={authContact?.churchId ?? ""}
        contactId={contactId ?? ""}
      />
    </div>
  );
}

// Add Action Modal Dialog

function AddActionDialog({
  churchId,
  contactId,
}: {
  churchId: string;
  contactId: string;
}) {
  const addAction = useAddContactAction();
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);

  async function handleAddAction() {
    try {
      await addAction.mutateAsync(
        {
          churchId,
          contactId,
          Idata: { actionName: action },
        },
        {
          onSuccess: () => {
            toast.success("Action added successfully");
            setAction(""); // Clear the action input
          },
          onError: (error: any) => {
            toast.error("Failed to add action");
            console.error("Error adding action:", error);
          },
        }
      );
    } catch (error: any) {
      // Additional safety catch block
      toast.error("Failed to add action");
      console.error("Error adding action:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex max-w-md">
        <button className="bg-main_DarkBlue text-white rounded-md shadow-md max-w-md py-1 my-1 px-4">
          Add Action
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Action</DialogTitle>
          <DialogDescription>
            Add a new action to the contact&apos;s action list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label htmlFor="action">Action</label>
          <InputComponent
            type="text"
            id="action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="border border-gray-200 rounded-lg p-2"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button
              disabled={addAction.isPending}
              onClick={handleAddAction}
              className="text-white bg-main_DarkBlue rounded-lg p-2">
              {addAction.isPending ? <LoadingCircle /> : "Add Action"}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
