import z from "zod";
import { Task } from "../entities";

const taskSchema = z.object({
  idTask: z
    .number({
      invalid_type_error: "idTask must be a string",
    })
    .optional(),
  title: z.string({
    invalid_type_error: "title must be a string",
    required_error: "title is required",
  }),
  description: z.string({
    invalid_type_error: "description must be a string",
    required_error: "description is required",
  })
});

export const validateTask = (task: Task) => {
  return taskSchema.safeParse(task);
};

export const validatePartialTask = (task: Task) => {
  return taskSchema.partial().safeParse(task);
};
