import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const AcademicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

AcademicFacultySchema.pre('save', async function (next) {
  const isFacultyExists = await AcademicFacultyModel.findOne({
    name: this.name,
  });

  if (isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Faculty is already exists');
  }

  next();
});

AcademicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isFacultyExists = await AcademicFacultyModel.findOne(query);
  if (isFacultyExists) {
    next();
  }
  throw new AppError(httpStatus.NOT_FOUND, 'Faculty is already exists !');
});

const AcademicFacultyModel = model<TAcademicFaculty>(
  'academicFaculty',
  AcademicFacultySchema,
);

export default AcademicFacultyModel;
