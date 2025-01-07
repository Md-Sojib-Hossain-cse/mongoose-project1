import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
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

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required"),
  fatherOccupation: z.string().nonempty("Father's occupation is required"),
  fatherContactNo: z.string().nonempty("Father's contact number is required"),
  motherName: z.string().nonempty("Mother's name is required"),
  motherOccupation: z.string().nonempty("Mother's occupation is required"),
  motherContactNo: z.string().nonempty("Mother's contact number is required"),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required"),
  occupation: z.string().nonempty("Local guardian's occupation is required"),
  contactNo: z.string().nonempty("Local guardian's contact number is required"),
});

// Student Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be one of male, female, or other',
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .nonempty('Email is required')
        .email('Email is not valid'),
      contactNumber: z.string().nonempty('Contact number is required'),
      emergencyContactNumber: z.string().nonempty('Contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty('First name is required')
    .max(20, 'First name cannot be more than 20 characters')
    .optional(),
  middleName: z
    .string()
    .optional()
    .refine((value) => !value || /^[A-Za-z]+$/.test(value), {
      message: 'Middle name is not valid',
    })
    .optional(),
  lastName: z.string().nonempty('Last name is required').optional(),
});

// Guardian Schema
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required").optional(),
  fatherOccupation: z
    .string()
    .nonempty("Father's occupation is required")
    .optional(),
  fatherContactNo: z
    .string()
    .nonempty("Father's contact number is required")
    .optional(),
  motherName: z.string().nonempty("Mother's name is required").optional(),
  motherOccupation: z
    .string()
    .nonempty("Mother's occupation is required")
    .optional(),
  motherContactNo: z
    .string()
    .nonempty("Mother's contact number is required")
    .optional(),
});

// Local Guardian Schema
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required").optional(),
  occupation: z
    .string()
    .nonempty("Local guardian's occupation is required")
    .optional(),
  contactNo: z
    .string()
    .nonempty("Local guardian's contact number is required")
    .optional(),
});

// Student Schema
const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z
        .enum(['male', 'female', 'other'], {
          required_error: 'Gender is required',
          invalid_type_error: 'Gender must be one of male, female, or other',
        })
        .optional(),
      dateOfBirth: z.string().optional().optional(),
      email: z
        .string()
        .nonempty('Email is required')
        .email('Email is not valid')
        .optional(),
      contactNumber: z
        .string()
        .nonempty('Contact number is required')
        .optional(),
      emergencyContactNumber: z
        .string()
        .nonempty('Contact number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z
        .string()
        .nonempty('Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .nonempty('Permanent address is required')
        .optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
