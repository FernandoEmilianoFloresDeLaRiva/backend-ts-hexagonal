import z from "zod";
import { User } from "../entities";

const userSchema = z.object({
  id_user: z
    .number({
      invalid_type_error: "id_user must be a number",
    })
    .optional(),
  email: z.string({
    invalid_type_error: "email must be a string",
    required_error: "email is required",
  }),
  password: z.string({
    invalid_type_error: "password must be a string",
    required_error: "password is required",
  }),
  username: z.string({
    invalid_type_error: "username must be",
    required_error: "username is required",
  }),
});

export const validateUser = (user: User) => {
  return userSchema.safeParse(user);
};

export const validatePartialUser = (user: User) => {
  return userSchema.partial().safeParse(user);
};
