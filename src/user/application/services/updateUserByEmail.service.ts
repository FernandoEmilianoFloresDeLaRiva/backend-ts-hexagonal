import { User, UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import { validatePartialUser } from "../../domain/validators/user.validator";
import { createPasswordHash } from "../../../auth/infraestructure/utils";

export class UpdateUserByEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User, email: string): Promise<UserResponse> {
    const resultValidation = validatePartialUser(user);
    if (resultValidation.success) {
      const originalUser = await this.userRepository.getUserByEmail(email);
      if (!originalUser) throw new Error("User not found");
      const password = createPasswordHash(user.password);
      const newUser: User = {
        email: user.email,
        username: user.username,
        password,
      };
      return await this.userRepository.updateUserByEmail(email, newUser);
    }
    throw new Error(resultValidation.error.message);
  }
}
