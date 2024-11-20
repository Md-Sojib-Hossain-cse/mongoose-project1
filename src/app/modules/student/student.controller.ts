import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    //send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Student data retrieve successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentById(studentId);

  res.status(200).json({
    success: true,
    message: 'Single student data retrieve successfully',
    data: result,
  });
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
