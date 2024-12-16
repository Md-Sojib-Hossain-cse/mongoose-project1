import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

//year , code , 4 digit code
export const generateStudentId = (payload: TAcademicSemester) => {
  //first time id 0000
  const currentId = (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};