import express from 'express';
// import { facultyValidations } from './faculty.validation';
// import validateRequest from '../../middlewares/validateRequest';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/', facultyControllers.getAllFaculty);

router.get('/:facultyId', facultyControllers.getSingleFaculty);

router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyControllers.updateFaculty,
);

router.delete('/:facultyId', facultyControllers.deleteFaculty);

export const FacultyRoutes = router;
