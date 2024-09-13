"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useContact } from "@/lib/swr/use-contact";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AContact } from "@/types/member";
import LayoutLoader from "@/components/ui/layout-loader";

interface ContactContextProps {
  contacts: AContact | null;
  isError: boolean;
  isLoading: boolean;
}

const ContactContext = createContext<ContactContextProps | undefined>(
  undefined
);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
};

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [contacts, setContacts] = useState<any>(null);
  const {
    contacts: contactData,
    isError,
    isLoading,
  } = useContact({
    userId: session?.user?.id,
    churchId: session?.user?.churchId,
  });

  useEffect(() => {
    if (contactData) {
      setContacts(contactData);
    }
  }, [contactData]);

  if (isLoading || !contacts) {
    return <LayoutLoader text="Loading contact..." />;
  }

  if (isError) {
    toast.error("Failed to fetch contacts");
    router.replace("/login");
  }

  return (
    <ContactContext.Provider value={{ contacts, isError, isLoading }}>
      {children}
    </ContactContext.Provider>
  );
};
