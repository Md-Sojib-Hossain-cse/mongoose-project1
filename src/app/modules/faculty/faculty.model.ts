import { model, Schema } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';

const facultyNameSchema = new Schema<TFacultyName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      types: String,
      required: [true, 'Faculty ID is Required'],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is Required'],
      unique: true,
      ref: 'user',
    },
    name: {
      type: facultyNameSchema,
      required: [true, 'Faculty Name is Required'],
    },
    designation: {
      type: String,
      required: [true, 'Faculty must have a designation'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is Required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact No is Required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact No is Required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is Required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is Required'],
    },
    profileImage: {
      type: String,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Faculty is Required'],
      ref: 'academicFaculty',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Academic Department is Required'],
      ref: 'academic-department',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const FacultyModel = model<TFaculty>('faculty', facultySchema);
