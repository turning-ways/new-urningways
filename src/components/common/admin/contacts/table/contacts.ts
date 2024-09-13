export type GContact = {
  id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  age: number | null;
  assignedTo?: {
    name: string;
    photo: string;
  }[];
  contactStatus: string;
  memberStatus: string;
  contactType: string;
  labels: {
    name: string;
    color: string;
  }[];
  phone: string;
  photo: string;
  updatedAt?: string;
};

// const dummyContacts: GContact[] = [
//   {
//     id: "1",
//     firstName: "John",
//     lastName: "Doe",
//     fullName: "John Doe",
//     age: 32,
//     assignedTo: [{ name: "Agent A", photo: "https://via.placeholder.com/50" }],
//     contactStatus: "Active",
//     memberStatus: "Member",
//     contactType: "Phone",
//     labels: [
//       { label: "New", color: "blue" },
//       { label: "Important", color: "red" },
//     ],
//     phone: "+1234567890",
//     photo: "https://via.placeholder.com/150",
//     updatedAt: "2024-09-08T10:30:00Z",
//   },
//   {
//     id: "2",
//     firstName: "Jane",
//     lastName: "Smith",
//     fullName: "Jane Smith",
//     age: null,
//     assignedTo: [{ name: "Agent B", photo: "https://via.placeholder.com/50" }],
//     contactStatus: "Pending",
//     memberStatus: "Non-member",
//     contactType: "Email",
//     labels: [{ label: "Prospect", color: "green" }],
//     phone: "+0987654321",
//     photo: "https://via.placeholder.com/150",
//     updatedAt: "2024-09-07T08:15:00Z",
//   },
//   {
//     id: "3",
//     firstName: "Alice",
//     lastName: "Johnson",
//     fullName: "Alice Johnson",
//     age: 45,
//     assignedTo: [],
//     contactStatus: "Inactive",
//     memberStatus: "Former-member",
//     contactType: "In-person",
//     labels: [],
//     phone: "+1230987456",
//     photo: "https://via.placeholder.com/150",
//     updatedAt: "2024-08-30T14:45:00Z",
//   },
//   {
//     id: "4",
//     firstName: "Bob",
//     lastName: "Brown",
//     fullName: "Bob Brown",
//     age: 28,
//     assignedTo: [
//       {
//         name: "Micheal Obasan",
//         photo: "https://avatars.githubusercontent.com/u/89151689?s=60&v=4",
//       },
//     ],
//     contactStatus: "Active",
//     memberStatus: "Member",
//     contactType: "Phone",
//     labels: [
//       { label: "New", color: "blue" },
//       { label: "Important", color: "red" },
//     ],
//     phone: "+5678901234",
//     photo: "https://via.placeholder.com/150",
//   },
//   {
//     id: "5",
//     firstName: "Emily",
//     lastName: "Clark",
//     fullName: "Emily Clark",
//     age: 22,
//     assignedTo: [],
//     contactStatus: "Active",
//     memberStatus: "Non-member",
//     contactType: "Social Media",
//     labels: [
//       { label: "Prospect", color: "green" },
//       { label: "Follow-up", color: "yellow" },
//       { label: "Pr4ospect", color: "gray" },
//       { label: "Followr-up", color: "yellow" },
//     ],
//     phone: "+3456789012",
//     photo: "https://via.placeholder.com/150",
//   },
// ];

// export default dummyContacts;
