import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .optional(),
  username: z
    .string()
    .trim()
    .min(5, 'Username must be at least 3 characters')
    .nonempty('Username is required'),
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .nonempty('Password is required'),
});

export type SignupFormData = z.infer<typeof signupSchema>;
