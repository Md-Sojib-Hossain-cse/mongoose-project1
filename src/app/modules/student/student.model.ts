import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  TStudent,
  TGuardian,
  TLocalGuardian,
  //   TStudentMethod,
  //   TStudentModel,
  TUserName,
  TStudentModel,
} from './student.interface';
import config from '../../config';
// import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxLength: [20, 'firstName cannot be more then 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameStr === value;
    //     //   if (value !== firstNameStr) {
    //     //     return false;
    //     //   } else {
    //     //     return true;
    //     //   }
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: {
    type: String,
    // validate: {
    //   validator: (value: string | null) => {
    //     if (!value) return true;
    //     return /^[A-Za-z]+$/.test(value);
    //   },
    //   message: '{VALUE} is not a valid lastName',
    // },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => {
    //     return validator.isAlpha(value);
    //   },
    //   message: '{VALUE} is not a valid lastName',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
});

const studentSchema = new Schema<TStudent, TStudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      max: [20, 'Password cant be more then 20 character'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message:
          "{VALUE} is not a valid gender. Gender can be either 'male', 'female', or 'other'",
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // validate: {
      //   validator: (value: string) => {
      //     return validator.isEmail(value);
      //   },
      //   message: '{VALUE} is not a valid email.',
      // },
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//Document middleware

//pre save middleware / hook   : will work on create and save method
studentSchema.pre('save', async function (next) {
  //   console.log(this, 'pre hook :we will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //this refers current processing document

  //hasing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//post save middleware / hook : will work on create and save method
studentSchema.post('save', function (doc, next) {
  //   console.log(this , 'post hook : we saved our data');

  doc.password = '';
  next();
});

// Query middleware
studentSchema.pre('find', async function (next) {
  //   console.log(this);
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', async function (next) {
  //   console.log(this);
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExist = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };

export const Student = model<TStudent, TStudentModel>('Student', studentSchema);
