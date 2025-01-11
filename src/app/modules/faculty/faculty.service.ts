import mongoose from 'mongoose';
import { TFaculty } from './faculty.interface';
import { FacultyModel } from './faculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { UserModel } from '../user/user.model';

const getAllFacultyFromDB = async () => {
  const result = await FacultyModel.find();

  return result;
};

const getFacultyFromDB = async (facultyId: string) => {
  const result = await FacultyModel.findOne({ id: facultyId });

  return result;
};
const updateFacultyFromDB = async (
  facultyId: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await FacultyModel.findOneAndUpdate(
    { id: facultyId },
    modifiedUpdatedData,
    { new: true },
  );

  return result;
};

const deleteFacultyFromDB = async (facultyId: string) => {
  const isUserExist = await FacultyModel.isUserExist(facultyId);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does not exists');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteUser = await UserModel.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    const deleteFaculty = await FacultyModel.findOneAndUpdate(
      { id: facultyId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deleteFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
    }

    await session.commitTransaction();
    session.endSession();

    return deleteFaculty;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Faculty');
  }
};

export const facultyServices = {
  getAllFacultyFromDB,
  getFacultyFromDB,
  updateFacultyFromDB,
  deleteFacultyFromDB,
};
