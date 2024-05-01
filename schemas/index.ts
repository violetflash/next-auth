import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string())
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  })
});


export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    })
  }
});

export const EmailSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const PasswordsSchema = z.object({
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6))
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }
    return true;
  }, {
    message: 'New password is required',
    path: ['newPassword']
  })
  .refine((data) => {
    // vise versa
    if (data.newPassword && !data.password) {
      return false;
    }
    return true;
  }, {
    message: 'Password is required',
    path: ['password']
  })
//
// .superRefine(({ password, newPassword }, ctx) => {
//   if (password === newPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       path: ['newPassword'],
//       message: 'New password cannot be the same as old',
//     })
//   }
// });

export const SettingsSchema = z.object({
  name:z.optional(z.string()),
  is_two_factor_enabled:z.optional(z.boolean()),
  role: z.enum([UserRole.USER, UserRole.ADMIN]),

});