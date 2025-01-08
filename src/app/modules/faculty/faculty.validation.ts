import { z } from 'zod';

// Faculty Name Schema
const facultyNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty('First Name is Required')
    .max(50, 'First Name cannot exceed 50 characters'),
  middleName: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || /^[A-Za-z]+$/.test(value), {
      message: 'Middle Name can only contain alphabetic characters',
    }),
  lastName: z
    .string()
    .trim()
    .nonempty('Last Name is Required')
    .max(50, 'Last Name cannot exceed 50 characters'),
});

// Faculty Schema
const createFacultyValidationSchema = z.object({
  body: z.object({
    id: z.string().nonempty('Faculty ID is Required'),
    user: z.string().nonempty('User ID is Required'),
    name: facultyNameValidationSchema,
    designation: z
      .string()
      .nonempty('Designation is Required')
      .max(100, 'Designation cannot exceed 100 characters'),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Gender is Required',
      invalid_type_error: 'Gender must be male, female, or other',
    }),
    dateOfBirth: z.string().optional(),
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
    profileImage: z.string().optional(),
    academicFaculty: z.string().nonempty('Academic Faculty is Required'),
    academicDepartment: z.string().nonempty('Academic Department is Required'),
    isDeleted: z.boolean().optional(),
  }),
});

// Update Faculty Schema
const updateFacultyValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    user: z.string().optional(),
    name: facultyNameValidationSchema.partial().optional(),
    designation: z.string().optional(),
    gender: z
      .enum(['male', 'female', 'other'], {
        required_error: 'Gender is Required',
        invalid_type_error: 'Gender must be male, female, or other',
      })
      .optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email('Email must be valid').optional(),
    contactNo: z
      .string()
      .refine((value) => !value || /^[0-9]+$/.test(value), {
        message: 'Contact No must contain only numbers',
      })
      .optional(),
    emergencyContactNo: z
      .string()
      .refine((value) => !value || /^[0-9]+$/.test(value), {
        message: 'Emergency Contact No must contain only numbers',
      })
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImage: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicDepartment: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
