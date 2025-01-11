import { model, Schema } from 'mongoose';
import { TAdmin, TAdminModel, TAdminName } from './admin.interface';

const AdminNameSchema = new Schema<TAdminName>({
  firstName: {
    type: String,
    required: [true, 'FirstName is Required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'LastName is Required'],
  },
});

const AdminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'Admin Id is Required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is Required'],
      unique: true,
    },
    name: AdminNameSchema,
    designation: {
      type: String,
      required: [true, 'Designation is Required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is Required'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is Required'],
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
      required: [true, 'Permanent Address'],
    },
    profileImage: {
      type: String,
      required: [true, 'Profile Image is Required'],
    },
    managementDepartment: {
      type: String,
      required: [true, 'Management Department'],
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

AdminSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

AdminSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

AdminSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await AdminModel.findOne({ id });
  return existingUser;
};

export const AdminModel = model<TAdmin, TAdminModel>('admin', AdminSchema);
