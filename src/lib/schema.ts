import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const LoginSchema = z.object({
  inputKey: z.string().min(3, { message: "Invalid email or phone number" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const MemberPersonalCreationschema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: "Last name is required" }),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE"], {
    message: "Please select a your gender",
  }),
  dateOfBirth: z.date(),
  educationLevel: z
    .enum(["PRIMARY", "SECONDARY", "TERTIARY", "POSTGRADUATE"], {
      message: "Please select your education level",
    })
    .optional(),
  maritalStatus: z
    .enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"], {
      message: "Please select your marital status",
    })
    .optional(),
  employmentStatus: z
    .enum(["EMPLOYED", "UNEMPLOYED", "SELF_EMPLOYED", "STUDENT", "RETIRED"], {
      message: "Please select your employment status",
    })
    .optional(),
  healthStatus: z
    .enum(["EXCELLENT", "GOOD", "FAIR", "POOR"], {
      message: "Please select your health status",
    })
    .optional(),
});

export const MemberContactCreationschema = z.object({
  email: z.string().email({ message: "Invalid email" }).optional(),
  address: z.string().max(100, { message: "Invalid address" }).optional(),
  phoneNumber: z
    .string()
    .min(10, { message: "Invalid phone number" })
    .refine((value: string) => isValidPhoneNumber(value), {
      message: "Invalid phone number",
    }),
});

export const MemberChurchCreationschema = z.object({
  workerStatus: z
    .enum(["ACTIVE", "INACTIVE"], {
      message: "Please select your member status",
    })
    .optional(),
  workerType: z.string().optional(),
  serviceUnit: z.string().optional(),
  churchRole: z.string().optional(),
});
