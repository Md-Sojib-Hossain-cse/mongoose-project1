import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

//will call controller function
router.get('/', studentController.getAllStudents);

router.get('/:studentId', studentController.getSingleStudent);

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  studentController.updateStudent,
);

router.delete('/:studentId', studentController.deleteSingleStudent);

export const StudentRoutes = router;
