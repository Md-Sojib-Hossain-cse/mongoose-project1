import { z } from 'zod';

const preRequisitesCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty(),
    prefix: z.string().nonempty(),
    code: z.number().int().positive(),
    credits: z.number().int().positive(),
    preRequisiteCourses: z
      .array(preRequisitesCourseValidationSchema)
      .optional(),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
};
