import {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalFooter,
  ModalBody,
} from "@/components/ui/responsive-modal";
import { useState } from "react";
import ContactUpdateForm from "./forms/updateContactForm";

export default function EditContactsModal({ contact }: { contact: any }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger>
        <button className="text-main_DarkBlue border border-main_DarkBlue hover:bg-gray-100  rounded-lg py-2 px-6">
          Edit Contact
        </button>
      </ModalTrigger>
      <ModalContent className="max-h-[600px]">
        <ModalHeader>
          <ModalTitle>Add Contact</ModalTitle>
          <ModalDescription>Add a new contact to the list</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <ContactUpdateForm setIsOpen={setIsOpen} initialData={contact} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
