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
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle } from "lucide-react";
import ContactCreationForm from "./forms/contactCreation";
import { useState } from "react";

export default function AddContactsModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalTrigger>
        <AddContactButton />
      </ModalTrigger>
      <ModalContent className="max-h-[600px]">
        <ModalHeader>
          <ModalTitle>Add Contact</ModalTitle>
          <ModalDescription>Add a new contact to the list</ModalDescription>
        </ModalHeader>
        <ModalBody>
          <ContactCreationForm setIsOpen={setIsOpen} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function AddContactButton() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1, backgroundColor: "#17275B", color: "white" }}
      whileTap={{ scale: 0.9 }}
      transition={{
        duration: 0.2,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="rounded-[15px] border border-[#17275B] px-5 py-3 space-x-2 text-[#17275B] flex items-center gap-2 my-10 md:my-0 h">
      <PlusCircle size={20} />
      <p className="font-medium">Add Contact</p>
    </motion.div>
  );
}
