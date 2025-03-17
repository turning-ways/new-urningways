import z from '@/lib/zod';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    'Password must contain at least one number, one uppercase, and one lowercase letter',
  );

export const OtpSchema = z.string().min(6, 'OTP must be 6 characters');

export const emailSchema = z
  .string()
  .email()
  .min(1)
  .transform((email) => email.toLowerCase());

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Minimum length of firstname is 2 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'Minimum length of lastname is 2 characters' }),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  accessTerms: z.boolean(),
});
