import z from "zod";
import { AuthRequest } from "../entities";

const authSchema = z.object({
  email: z.string({
    invalid_type_error: "email must be a string",
    required_error: "email is required",
  }),
  password: z.string({
    invalid_type_error: "password must be a string",
    required_error: "password is required",
  }),
});

export const validateAuth = (auth: AuthRequest) => {
  return authSchema.safeParse(auth);
};
