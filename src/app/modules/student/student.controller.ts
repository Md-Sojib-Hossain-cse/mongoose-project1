import { StudentServices } from './student.service';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentById(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteSingleStudentById(studentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
