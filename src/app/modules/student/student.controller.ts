import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.validation';
// import { z } from 'zod';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //create a schema validation using zod

    // const studentValidationSchema = z.object({
    //   id: z.string(),
    //   name: z.object({
    //     firstName: z
    //       .string()
    //       .trim()
    //       .max(20, { message: 'firstName cannot be more then 20 characters' }),
    //   }),
    // });

    const studentData = req.body;
    console.log(studentData);

    //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData);
    console.log('zod data', zodParsedData);

    //will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Student creation request denied',
    //     error: error.details,
    //   });
    // }

    //send response
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentById(studentId);

    res.status(200).json({
      success: true,
      message: 'Single student data retrieve successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteSingleStudentById(studentId);

    res.status(200).json({
      success: true,
      message: 'Single student data retrieve successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
