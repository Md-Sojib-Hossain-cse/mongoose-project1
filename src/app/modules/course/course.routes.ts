import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);

router.get('/:id', CourseController.getSingleCourse);

// router.patch(
//   '/:facultyId',
//   validateRequest(
//     AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
//   ),
//   AcademicFacultyController.updateAcademicFaculty,
// );

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
