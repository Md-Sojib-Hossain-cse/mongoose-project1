import { z } from 'zod';

const CreateAdminNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty('First name is required')
    .max(20, 'First name cannot be more than 20 characters'),
  middleName: z
    .string()
    .optional()
    .refine((value) => !value || /^[A-Za-z]+$/.test(value), {
      message: 'Middle name is not valid',
    }),
  lastName: z.string().nonempty('Last name is required'),
});

const UpdateAdminNameValidationSchema = z.object({
  firstName: z.string().trim().optional(),
  middleName: z
    .string()
    .optional()
    .refine((value) => !value || /^[A-Za-z]+$/.test(value), {
      message: 'Middle name is not valid',
    }),
  lastName: z.string().optional(),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: CreateAdminNameValidationSchema,
      designation: z
        .string()
        .nonempty('Designation is Required')
        .max(100, 'Designation cannot exceed 100 characters'),
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is Required',
        invalid_type_error: 'Gender must be male, female, or other',
      }),
      dateOfBirth: z.string().nonempty('Date of Birth is Required'),
      email: z
        .string()
        .nonempty('Email is Required')
        .email('Email must be valid'),
      contactNo: z
        .string()
        .nonempty('Contact No is Required')
        .refine((value) => /^[0-9]+$/.test(value), {
          message: 'Contact No must contain only numbers',
        }),
      emergencyContactNo: z
        .string()
        .nonempty('Emergency Contact No is Required')
        .refine((value) => /^[0-9]+$/.test(value), {
          message: 'Emergency Contact No must contain only numbers',
        }),
      presentAddress: z
        .string()
        .nonempty('Present Address is Required')
        .max(255, 'Present Address cannot exceed 255 characters'),
      permanentAddress: z
        .string()
        .nonempty('Permanent Address is Required')
        .max(255, 'Permanent Address cannot exceed 255 characters'),
      profileImage: z.string().nonempty('Profile Image is Required'),
      managementDepartment: z
        .string()
        .nonempty('Management Department is Required'),
    }),
  }),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      id: z.string().optional(),
      user: z.string().optional(),
      name: UpdateAdminNameValidationSchema.optional(), // Make all fields in `name` optional
      designation: z
        .string()
        .max(100, 'Designation cannot exceed 100 characters')
        .optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          invalid_type_error: 'Gender must be male, female, or other',
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Email must be valid').optional(),
      contactNo: z
        .string()
        .refine((value) => /^[0-9]+$/.test(value), {
          message: 'Contact No must contain only numbers',
        })
        .optional(),
      emergencyContactNo: z
        .string()
        .refine((value) => /^[0-9]+$/.test(value), {
          message: 'Emergency Contact No must contain only numbers',
        })
        .optional(),
      presentAddress: z
        .string()
        .max(255, 'Present Address cannot exceed 255 characters')
        .optional(),
      permanentAddress: z
        .string()
        .max(255, 'Permanent Address cannot exceed 255 characters')
        .optional(),
      profileImage: z.string().optional(),
      managementDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const adminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
