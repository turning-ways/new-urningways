'use client';

import React, { createContext, useContext, useState } from 'react';

interface RegisterContextType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  passwordConfirm: string;
  setPasswordConfirm: (passwordConfirm: string) => void;
  step: 'signup' | 'verify' | 'onboarding';
  setStep: (step: 'signup' | 'verify') => void;
}

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [step, setStep] = useState<'signup' | 'verify'>('signup');

  return (
    <RegisterContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        passwordConfirm,
        setPasswordConfirm,
        step,
        setStep,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error(
      'useRegisterContext must be used within a RegisterProvider',
    );
  }
  return context;
};
