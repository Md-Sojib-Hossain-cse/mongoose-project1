// import { UserServices } from './user.service';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';

const createAcademicSemester = catchAsync(async (req, res) => {
  //   const { password, student: studentData } = req.body;

  //will call service function to send this data
  //   const result = await UserServices.createStudentIntoDB(password, studentData);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
