import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsChangePassword: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//pre save middleware / hook   : will work on create and save method
userSchema.pre('save', async function (next) {
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
userSchema.post('save', function (doc, next) {
  //   console.log(this , 'post hook : we saved our data');

  doc.password = '';
  next();
});

export const UserModel = model<TUser>('user', userSchema);
