import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User already exist');
  }

  const result = await Student.create(studentData); //built in static method
  //   const student = new Student(studentData); //create an instance

  //   const result = await student.save(); // built in instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentById = async (id: string) => {
  //   const result = await Student.findOne({ id });

  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteSingleStudentById = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentById,
  deleteSingleStudentById,
};
