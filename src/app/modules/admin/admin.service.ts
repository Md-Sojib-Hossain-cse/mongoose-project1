import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TAdmin } from './admin.interface';
import { AdminModel } from './admin.model';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';

const getAllAdminFromDB = async () => {
  const result = await AdminModel.find();
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findOne({ id });
  return result;
};

const updateAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  const result = await AdminModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true },
  );
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const isUserExist = await AdminModel.isUserExist(id);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User Does not Exist');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    const deleteAdmin = await AdminModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
    }

    await session.commitTransaction();
    session.endSession();
    return deleteAdmin;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminFromDB,
  deleteAdminFromDB,
};
