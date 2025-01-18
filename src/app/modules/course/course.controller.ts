import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { courseServices } from './course.service';
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await courseServices.createCourseIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Created Successfully.',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses Retrieve Successfully.',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Retrieve Successfully.',
    data: result,
  });
});

//   const updateAcademicFaculty = catchAsync(async (req, res) => {
//     const { facultyId } = req.params;
//     const payload = req.body;
//     const result = await courseServices.update(
//       facultyId,
//       payload,
//     );

//     sendResponse(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: 'Academic Faculty Updated Successfully.',
//       data: result,
//     });
//   });

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course Deleted Successfully.',
    data: result,
  });
});

export const AcademicFacultyController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
};
