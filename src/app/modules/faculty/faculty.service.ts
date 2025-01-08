import { FacultyModel } from './faculty.model';

const getAllFacultyFromDB = async () => {
  const result = await FacultyModel.find();

  return result;
};

export const facultyServices = {
  getAllFacultyFromDB,
};
