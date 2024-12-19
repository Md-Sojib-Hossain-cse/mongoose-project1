import catchAsync from '../../Utils/catchAsync';
import sendResponse from '../../Utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const payload = req.body;
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Departments Retrieve successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department Retrieve successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const payload = req.body;
  const result = await AcademicDepartmentServices.updateAcademicDepartmentOnDB(
    departmentId,
    payload,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
