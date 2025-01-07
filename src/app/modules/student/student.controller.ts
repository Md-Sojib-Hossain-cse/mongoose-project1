import { StudentServices } from './student.service';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllStudents = catchAsync(async (req, res, next) => {
  // console.log(req.query);
  const result = await StudentServices.getAllStudentsFromDB(req?.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students data retrieve successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentById(studentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student data retrieve successfully',
    data: result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteSingleStudentById(studentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentById(studentId, student);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student updated successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent,
};
