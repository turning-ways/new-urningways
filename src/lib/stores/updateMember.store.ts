import { create } from "zustand";

interface memberUpdateStore {
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
    healthStatus?: "HEALTHY" | "SICK" | "DISABLED";
    email?: string;
    address?: string;
    phone: string;
    workerStatus?: "ACTIVE" | "INACTIVE";
    workerType?: string;
    serviceUnit?: string;
    churchRole: string;
  };
  setFormData: (data: any) => void;
  resetFormData: () => void;
}

export const useMemberUpdateStore = create<memberUpdateStore>((set) => ({
  formData: {
    firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    phone: "",
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
        phone: "",
        churchRole: "",
      },
    }),
}));
