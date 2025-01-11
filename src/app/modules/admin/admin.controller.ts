import { Request, Response } from 'express';
import catchAsync from '../../Utils/catchAsync';
import { AdminServices } from './admin.service';
import sendResponse from '../../Utils/sendResponse';

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllAdminFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admins data retrieve Successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin data retrieve Successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const { admin: adminData } = req.body;
  const result = await AdminServices.updateAdminFromDB(adminId, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin data updated Successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdminFromDB(adminId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin data deleted Successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
