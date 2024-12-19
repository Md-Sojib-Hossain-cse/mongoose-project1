import httpStatus from 'http-status';
import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const payload = req.body;
  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Created Successfully.',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculties Retrieve Successfully.',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Retrieve Successfully.',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const payload = req.body;
  const result = await AcademicFacultyServices.updateAcademicFacultyOnDB(
    facultyId,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty Updated Successfully.',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
