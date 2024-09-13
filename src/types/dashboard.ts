export interface Dashboard {
  totalMembers: number;
  totalContacts: number;
  verifiedMembers: number;
  unverifiedMembers: number;
  members: DashMember[];
}

export interface DashMember {
  id: string;
  age: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  dateOfBirth: string;
  maritalStatus: string | null;
  createdAt: string;
}
