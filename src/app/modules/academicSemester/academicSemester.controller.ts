// import { UserServices } from './user.service';
import sendResponse from '../../Utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const payload = req.body;

  //will call service function to send this data
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(payload);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  //will call service function to get data
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semesters retrieve successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.semesterId;
  //will call service function to get data
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester retrieve successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.semesterId;
  const payload = req.body;
  //will call service function to get data
  const result = await AcademicSemesterServices.updateAcademicSemesterOnDB(
    id,
    payload,
  );

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Semester updated successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
