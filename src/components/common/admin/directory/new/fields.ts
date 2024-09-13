import InputComponent from "@/components/common/Input/input";
import SelectComponent from "@/components/common/Input/select";
import { DatePicker } from "@/components/common/Input/datePicker";
import { PhoneInput } from "@/components/common/Input/phone";
import api from "@/lib/axios";

export const personalInfoFields = (form: any) => {
  return [
    {
      control: form.control,
      name: "firstName",
      label: "First Name",
      isCompulsory: true,
      component: InputComponent,
    },
    {
      control: form.control,
      name: "middleName",
      label: "Middle Name",
      component: InputComponent,
    },
    {
      control: form.control,
      name: "lastName",
      label: "Last Name",
      isCompulsory: true,
      component: InputComponent,
    },
    {
      control: form.control,
      name: "prefix",
      label: "Prefix",
      isDropdown: true,
      options: ["Mr", "Mrs"],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: "Mr", label: "Mr" },
        { value: "Mrs", label: "Mrs" },
        { value: "Miss", label: "Miss" },
        { value: "Dr", label: "Dr" },
        { value: "Prof", label: "Prof" },
      ],
    },
    {
      control: form.control,
      name: "suffix",
      label: "Suffix",
      component: SelectComponent,
      isDropdown: true,
      options: ["Jr", "Sr", "III", "IV", "V", "VI"],
    },
    {
      control: form.control,
      name: "gender",
      label: "Gender",
      isDropdown: true,
      isCompulsory: true,
      options: ["MALE", "FEMALE"],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: "MALE", label: "Male" },
        { value: "FEMALE", label: "Female" },
      ],
    },
    {
      control: form.control,
      name: "dateOfBirth",
      label: "Birthday",
      isDate: true,
      isCompulsory: true,
      component: DatePicker,
    },
    {
      control: form.control,
      name: "maritalStatus",
      label: "Marital Status",
      isDropdown: true,
      options: ["Single", "Married", "Divorced", "Widowed"],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: "SINGLE", label: "Single" },
        { value: "MARRIED", label: "Married" },
        { value: "DIVORCED", label: "Divorced" },
        { value: "WIDOWED", label: "Widowed" },
      ],
    },
    {
      control: form.control,
      name: "educationLevel",
      label: "Education Level",
      isDropdown: true,
      options: ["High School", "College", "University", "Post Graduate"],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: "PRIMARY", label: "Primary" },
        { value: "SECONDARY", label: "Secondary" },
        { value: "TERTIARY", label: "Tertiary" },
        { value: "POSTGRADUATE", label: "Post Graduate" },
      ],
    },
    {
      control: form.control,
      name: "employmentStatus",
      label: "Employment Status",
      isDropdown: true,
      options: ["Employed", "Unemployed", "Student", "Retired"],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: "EMPLOYED", label: "Employed" },
        { value: "UNEMPLOYED", label: "Unemployed" },
        { value: "SELF_EMPLOYED", label: "Self Employed" },
        { value: "STUDENT", label: "Student" },
        { value: "RETIRED", label: "Retired" },
      ],
    },
    // for health Status
    {
      control: form.control,
      name: "healthStatus",
      label: "Health Status",
      isDropdown: true,
      options: ["EXCELLENT", "GOOD", "FAIR", "POOR"],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: "EXCELLENT", label: "Excellent" },
        { value: "GOOD", label: "Good" },
        { value: "FAIR", label: "Fair" },
        { value: "POOR", label: "Poor" },
      ],
    },
  ];
};

export const contactInfoFields = (form: any) => {
  return [
    {
      control: form.control,
      name: "email",
      label: "Email",
      component: InputComponent,
    },
    {
      control: form.control,
      name: "address",
      label: "Address",
      component: InputComponent,
    },
    {
      control: form.control,
      name: "phoneNumber",
      label: "Phone Number",
      isCompulsory: true,
      component: PhoneInput,
    },
  ];
};

export const churchInfoFields = (form: any, churchId: string) => {
  let roles = [] as Array<{ id: string; name: string }>;
  const response = api.get(`/churches/${churchId}/roles`).then((res) => {
    roles = res.data.data;
  });

  return [
    {
      control: form.control,
      name: "memberStatus",
      label: "Member Status",
      isDropdown: true,
      options: ["Active", "Inactive"],
      component: SelectComponent,
      shouldVariedOptions: true,
      variedOptions: [
        { value: "ACTIVE", label: "Active" },
        { value: "INACTIVE", label: "Inactive" },
      ],
    },
    {
      control: form.control,
      name: "workerType",
      label: "Worker Type",
      component: InputComponent,
    },
    {
      control: form.control,
      name: "serviceUnit",
      label: "Service Unit",
      component: InputComponent,
    },
    {
      control: form.control,
      name: "churchRole",
      label: "Church Role",
      isCompulsory: true,
      component: SelectComponent,
      isDropdown: true,
      options: roles.map((role) => role.name),
      shouldVariedOptions: true,
      variedOptions: roles.map((role) => ({
        value: role.id,
        label: role.name,
      })),
    },
  ];
};
