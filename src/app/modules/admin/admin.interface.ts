import { Model, Types } from 'mongoose';

export type TAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  designation: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  managementDepartment: string;
  isDeleted: boolean;
};

export interface TAdminModel extends Model<TAdmin> {
  isUserExist(id: string): Promise<TAdmin | null>;
}
