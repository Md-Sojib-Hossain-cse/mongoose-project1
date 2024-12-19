import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findById(id);
  return result;
};

const updateAcademicDepartmentOnDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartmentModel.create({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentOnDB,
};
