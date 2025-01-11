import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  //2030010001
  return lastStudent?.id ? lastStudent.id : undefined;
};

//year , code , 4 digit code
export const generateStudentId = async (payload: TAcademicSemester) => {
  //first time id 0000
  let currentId = (0).toString(); //0000 by default

  const lastStudentId = await findLastStudentId(); //2030010001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6); //0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};

//generate faculty id

//find last faculty id
const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    { role: 'faculty' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id : undefined;
};
//F-0001
export const generateFacultyId = async () => {
  //first time id 0000
  let currentId = (0).toString();
  console.log(currentId);

  const lastFacultyId = await findLastFacultyId(); //F-0002

  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2, 6); //0002
  }

  let incrementId = (Number(currentId) + 1) //0003
    .toString()
    .padStart(4, '0');

  incrementId = `F-${incrementId}`; //F-0003

  return incrementId;
};


//find last admin id
const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    { role: 'admin' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin?.id : undefined;
};
//A-0001
export const generateAdminId = async () => {
  //first time id 0000
  let currentId = (0).toString();

  const lastAdminId = await findLastAdminId(); //A-0002

  if (lastAdminId) {
    currentId = lastAdminId.substring(2, 6); //0002
  }

  let incrementId = (Number(currentId) + 1) //0003
    .toString()
    .padStart(4, '0');

  incrementId = `A-${incrementId}`; //A-0003

  return incrementId;
};
