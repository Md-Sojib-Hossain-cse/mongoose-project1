import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';

const router = express.Router();

//will call controller function
router.post(
  '/create-academic-semester',
  AcademicSemesterControllers.createAcademicSemester,
);

// router.get('/', studentController.getAllStudents);

// router.get('/:studentId', studentController.getSingleStudent);

// router.delete('/:studentId', studentController.deleteSingleStudent);

export const academicSemesterRoutes = router;
