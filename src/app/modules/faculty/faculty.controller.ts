import { Request, Response } from 'express';
import catchAsync from '../../Utils/catchAsync';
import { facultyServices } from './faculty.service';
import sendResponse from '../../Utils/sendResponse';

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyServices.getAllFacultyFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculties data retrieve Successfully',
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculty,
};
