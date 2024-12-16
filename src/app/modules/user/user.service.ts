import config from '../../config';
import AcademicSemesterModel from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object

  const userData: Partial<TUser> = {};

  //if password not given use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';

  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  //set generated id
  userData.id = generateStudentId(admissionSemester);

  //create a user
  const newUser = await UserModel.create(userData); //built in static method

  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
