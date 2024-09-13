import { Url } from "url";

export interface IMember {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  prefix: string | null;
  suffix: string | null;
  serviceUnit: string | null;
  verificationStatus: "VERIFIED" | "UNVERIFIED" | "PENDING";
  workerStatus: string | null; // TODO - To be hanged
  workerType: string;
  role: { id: string; name: string }[];
  email: string;
  phone: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  active: boolean;
  address: string | null;
  dateOfBirth: string | number;
  maritalStatus: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED";
  educationLevel: string | null;
  employmentStatus: string | null;
  healthStatus: string | null;
  photo: string | Url | null;
  createdAt: string | number;
  createdBy: string | null;
  updatedAt: string | number;
}

interface Permission {
  resource: any; // Replace `any` with the actual type if known
  operation: any; // Replace `any` with the actual type if known
}

interface Role {
  name: string;
  permissions: Permission[];
}

export interface AContact {
  id: string;
  userId: string;
  churchId: string;
  churchName: string;
  churchCreatedAt: string; // Adjust the type if necessary, e.g., Date
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  phone: string;
  roles: Role[];
}
