import { create } from "zustand";

interface churchCreationStore {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    phoneNumber: string;
    dob: Date;
    denomination?: string;
    hearAboutUs: string;
    churchName: string;
    isParent: string;
    parentChurch: string;
    parentChurchLevel: string;
    churchWebsite: string;
    churchEmail: string;
    churchPhone: string;
    churchAddress: string;
    churchCity: string;
    churchState: string;
    churchCountry: string;
    churchZip: string;
  };
  setFormData: (data: any) => void;
  updateFormData: (data: any) => void;
}

export const useChurchCreationStore = create<churchCreationStore>((set) => ({
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    gender: "MALE",
    phoneNumber: "",
    dob: new Date(),
    denomination: "Branch",
    hearAboutUs: "",
    churchName: "",
    isParent: "false",
    parentChurch: "",
    parentChurchLevel: "",
    churchWebsite: "",
    churchEmail: "",
    churchPhone: "",
    churchAddress: "",
    churchCity: "",
    churchState: "",
    churchCountry: "",
    churchZip: "",
  },
  setFormData: (data) => set((state) => ({ formData: data })),
  updateFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
}));
