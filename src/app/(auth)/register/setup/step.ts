import { z } from 'zod';

export const AdminCreationSchema = z.object({
  firstName: z.string({ message: 'Please enter your first name' }),
  lastName: z.string({ message: 'Please enter your last name' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  // gender enum
  gender: z.enum(['MALE', 'FEMALE'], {
    message: 'Please select a your gender',
  }),
  // phone number
  phoneNumber: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' }),
  // Date of birth
  dob: z.date({ message: 'Enter a vaild date' }),
  hearAboutUs: z.string(),
});

export const OrgLevelSchema = z.object({
  churchName: z.string().nonempty('Church name is required'),
  isParent: z.enum(['true', 'false'], {
    message: 'Please select an option',
  }),
  denomination: z
    .string({ message: 'Please enter your denomination' })
    .optional(),
});

export const OrgInfoSchema = z.object({
  parentChurch: z.string().optional(),
  parentChurchLevel: z.string().optional(),
  churchName: z
    .string()
    .min(3, { message: 'Please enter a valid church name' }),
  churchWebsite: z.string().optional(),
  churchEmail: z.string().email({ message: 'Please enter a valid email' }),
  churchPhone: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' }),
  churchAddress: z
    .string()
    .max(100, { message: 'Please enter a valid address' }),
  churchCity: z.string().min(3, { message: 'Please enter a valid city' }),
  churchState: z.string().min(3, { message: 'Please enter a valid state' }),
  churchCountry: z.string().min(3, { message: 'Please enter a valid country' }),
  churchZip: z.string().min(3, { message: 'Please enter a valid zip code' }),
  verify: z.boolean().refine((val) => val === true, {
    message: 'You must verify to proceed.',
  }),
});

export const ChurchCreationSchema = z
  .object({})
  .merge(AdminCreationSchema)
  .merge(OrgLevelSchema)
  .merge(OrgInfoSchema);
