import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constatnt';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;

  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  //step -1 : basic course info update

  const updatedBasicCourseInfo = await CourseModel.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  //check if there is any preRequisiteCourses to update
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    //filter out the deleted fields
    const deletablePreRequisiteCourses = preRequisiteCourses
      .filter((course) => course.isDeleted && course.course)
      .map((course) => course.course);

    const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: { course: { $in: deletablePreRequisiteCourses } },
      },
    });

    //filter out the new course fields

    const addablePreRequisiteCourses = preRequisiteCourses.filter(
      (course) => course.course && !course.isDeleted,
    );

    const newPreRequisiteCourses = await CourseModel.findByIdAndUpdate(id, {
      $addToSet: {
        preRequisiteCourses: { $each: addablePreRequisiteCourses },
      },
    });
  }

  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );

  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
