import Joi from 'joi';

//creating a schema validation using joi
const studentNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name cannot be more than 20 characters',
      'string.pattern.name': '{#value} is not in capitalize format',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .regex(/^[A-Za-z]+$/, 'alpha')
    .messages({
      'string.empty': 'Last name is required',
      'string.pattern.name': '{#value} is not a valid last name',
    }),
});

// Joi schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': "Father's name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': "Father's occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': "Father's contact number is required",
  }),
  motherName: Joi.string().required().messages({
    'string.empty': "Mother's name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': "Mother's occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': "Mother's contact number is required",
  }),
});

// Joi schema for Local Guardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': "Local guardian's name is required",
  }),
  occupation: Joi.string().required().messages({
    'string.empty': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': "Local guardian's contact number is required",
  }),
});

// Joi schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: studentNameValidationSchema.required().messages({
    'any.required': 'Student name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.required': 'Gender is required',
    'any.only':
      '{#value} is not a valid gender. Gender can be either "male", "female", or "other"',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': '{#value} is not a valid email',
  }),
  contactNumber: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'any.required': 'Local guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
});

export default studentValidationSchema;
