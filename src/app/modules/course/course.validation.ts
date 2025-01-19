import { z } from 'zod';

const preRequisitesCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updatePreRequisitesCourseValidationSchema = z.object({
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
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty().optional(),
    prefix: z.string().nonempty().optional(),
    code: z.number().int().positive().optional(),
    credits: z.number().int().positive().optional(),
    preRequisiteCourses: z
      .array(updatePreRequisitesCourseValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
