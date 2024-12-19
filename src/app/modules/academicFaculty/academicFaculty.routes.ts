import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidations.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
