import { UserServices } from './user.service';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  //will call service function to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  //will call service function to send this data
  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  //will call service function to send this data
  const result = await UserServices.createAdminIntoDB(password, adminData);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
