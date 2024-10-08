'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useContact } from '@/lib/swr/use-contact';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { AContact } from '@/types/member';
import LayoutLoader from '@/components/ui/layout-loader';

interface ContactContextProps {
  contacts: AContact | null;
  contactRole: string | null;
  isError: boolean;
  isLoading: boolean;
}

const ContactContext = createContext<ContactContextProps | undefined>(
  undefined,
);

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { churchId } = useParams();
  const { data: session } = useSession();
  const [contacts, setContacts] = useState<AContact | null>(null);
  const [contactRole, setContactRole] = useState<string | null>(null);
  const {
    contacts: contactData,
    isError,
    isLoading,
  } = useContact({
    userId: session?.user?.id,
    churchId: churchId as string,
  });

  useEffect(() => {
    if (contactData) {
      setContacts(contactData);
      // Redirect based on roles
      const role = contactData.roles?.[0]; // Assuming `roles` is an array in `contacts`
      setContactRole(role.name);
      if (role.name === 'Editor') {
        router.replace(`/admin/${churchId}/contacts`); // Editor redirection
      } else if (role.name === 'SuperAdmin') {
        // Admin can access anywhere, maybe stay on the same page or go elsewhere
        // Optionally you could add another redirect or do nothing
      }
    }
  }, [contactData, router, churchId]);

  if (isLoading || !contacts) {
    return <LayoutLoader text="Loading contact..." />;
  }

  if (isError) {
    toast.error('Failed to fetch contacts');
    router.replace('/login');
  }

  return (
    <ContactContext.Provider
      value={{ contacts, contactRole, isError, isLoading }}
    >
      {children}
    </ContactContext.Provider>
  );
};
