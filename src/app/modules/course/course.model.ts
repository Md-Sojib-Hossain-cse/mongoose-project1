import { model, Schema } from 'mongoose';
import { TCourse, TPreRequisiteCourses } from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Title is Required'],
  },
  prefix: {
    type: String,
    trim: true,
    required: [true, 'Prefix is Required'],
  },
  code: {
    type: Number,
    required: [true, 'Code is Required'],
  },
  credits: {
    type: Number,
    required: [true, 'Credits is Required'],
  },
  preRequisiteCourses: preRequisiteCoursesSchema,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const CourseModel = model<TCourse>('course', courseSchema);
