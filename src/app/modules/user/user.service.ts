import mongoose from 'mongoose';
import config from '../../config';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { FacultyModel } from '../faculty/faculty.model';
import { AdminModel } from '../admin/admin.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object

  const userData: Partial<TUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';

  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateStudentId(admissionSemester);

    //create a user (transaction - 1)
    const newUser = await UserModel.create([userData], { session }); //array

    //if user created or not
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //create a student (transaction - 2)
    //set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }

    await session.commitTransaction();
    session.endSession();

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  //create a user object

  const userData: Partial<TUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_pass as string);

  //set faculty role
  userData.role = 'faculty';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateFacultyId();

    //create a user (transaction - 1)
    const newUser = await UserModel.create([userData], { session }); //array

    //if user created or not
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //create a faculty (transaction - 2)
    //set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    const newFaculty = await FacultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }

    await session.commitTransaction();
    session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  //create a user object

  const userData: Partial<TUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_pass as string);

  //set admin role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set generated id
    userData.id = await generateAdminId();

    //create a user (transaction - 1)
    const newUser = await UserModel.create([userData], { session }); //array

    //if user created or not
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    //create a admin (transaction - 2)
    //set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference id

    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
};
