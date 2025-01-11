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

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const result = await facultyServices.getFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty data retrieve Successfully',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const { faculty: facultyData } = req.body;
  const result = await facultyServices.updateFacultyFromDB(
    facultyId,
    facultyData,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty data updated Successfully',
    data: result,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const result = await facultyServices.deleteFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty data deleted Successfully',
    data: result,
  });
});

export const facultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
