import { create } from "zustand";

interface churchCreationStore {
  formData: {
    firstName: string;
    middleName?: string;
    lastName: string;
    prefix?: string;
    suffix?: string;
    gender?: "MALE" | "FEMALE";
    dateOfBirth: Date | string;
    educationLevel?: "PRIMARY" | "SECONDARY" | "TERTIARY" | "POSTGRADUATE";
    maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
    employmentStatus?:
      | "EMPLOYED"
      | "UNEMPLOYED"
      | "SELF_EMPLOYED"
      | "STUDENT"
      | "RETIRED";
    healthStatus?: "EXCELLENT" | "GOOD" | "FAIR" | "POOR" | undefined;
    email?: string;
    address?: string;
    phoneNumber: string;
    workerStatus?: "ACTIVE" | "INACTIVE";
    workerType?: string;
    serviceUnit?: string;
    churchRole: string;
  };
  setFormData: (data: any) => void;
  resetFormData: () => void;
}

export const useMemberCreationStore = create<churchCreationStore>((set) => ({
  formData: {
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
    churchRole: "",
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetFormData: () =>
    set({
      formData: {
        firstName: "",
        lastName: "",
        dateOfBirth: new Date(),
        phoneNumber: "",
        churchRole: "",
      },
    }),
}));
