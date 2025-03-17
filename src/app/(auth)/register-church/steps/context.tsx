import React, { createContext, useContext, useState } from 'react';

interface OnboardingContextType {
  step: 'personal' | 'church';
  setStep: (step: 'personal' | 'church') => void;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: 'MALE' | 'FEMALE';
  churchEmail: string;
  churchName: string;
  churchAddress: string;
  churchPhone: string;
  churchWebsite: string | undefined;
  churchCity: string;
  churchState: string;
  churchCountry: string;
  churchZip: string;
  parentChurchId: string;
  parentChurchLevelId: string;
  isParent: boolean;
  hearAboutUs: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setDob: (dob: string) => void;
  setGender: (gender: 'MALE' | 'FEMALE') => void;
  setChurchEmail: (churchEmail: string) => void;
  setChurchName: (churchName: string) => void;
  setChurchAddress: (churchAddress: string) => void;
  setChurchPhone: (churchPhone: string) => void;
  setChurchWebsite: (churchWebsite: string | undefined) => void;
  setChurchCity: (churchCity: string) => void;
  setChurchState: (churchState: string) => void;
  setChurchCountry: (churchCountry: string) => void;
  setChurchZip: (churchZip: string) => void;
  setParentChurchId: (parentChurchId: string) => void;
  setParentChurchLevelId: (parentChurchLevelId: string) => void;
  setIsParent: (isParent: boolean) => void;
  setHearAboutUs: (hearAboutUs: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<'personal' | 'church'>('personal');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [churchEmail, setChurchEmail] = useState('');
  const [churchName, setChurchName] = useState('');
  const [churchAddress, setChurchAddress] = useState('');
  const [churchPhone, setChurchPhone] = useState('');
  const [churchWebsite, setChurchWebsite] = useState<string | undefined>('');
  const [churchCity, setChurchCity] = useState('');
  const [churchState, setChurchState] = useState('');
  const [churchCountry, setChurchCountry] = useState('');
  const [churchZip, setChurchZip] = useState('');
  const [parentChurchId, setParentChurchId] = useState('');
  const [parentChurchLevelId, setParentChurchLevelId] = useState('');
  const [isParent, setIsParent] = useState(false);
  const [hearAboutUs, setHearAboutUs] = useState('');

  return (
    <OnboardingContext.Provider
      value={{
        step,
        setStep,
        firstName,
        lastName,
        email,
        phoneNumber,
        dob,
        gender,
        churchEmail,
        churchName,
        churchAddress,
        churchPhone,
        churchWebsite,
        churchCity,
        churchState,
        churchCountry,
        churchZip,
        parentChurchId,
        parentChurchLevelId,
        isParent,
        hearAboutUs,
        setFirstName,
        setLastName,
        setEmail,
        setPhoneNumber,
        setDob,
        setGender,
        setChurchEmail,
        setChurchName,
        setChurchAddress,
        setChurchPhone,
        setChurchWebsite,
        setChurchCity,
        setChurchState,
        setChurchCountry,
        setChurchZip,
        setParentChurchId,
        setParentChurchLevelId,
        setIsParent,
        setHearAboutUs,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      'useOnboardingContext must be used within an OnboardingProvider',
    );
  }
  return context;
};
