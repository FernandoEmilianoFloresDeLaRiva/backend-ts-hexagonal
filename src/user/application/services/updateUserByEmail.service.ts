import { User, UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import { validatePartialUser } from "../../domain/validators/user.validator";
import { PasswordHashRepository } from "../../../auth/domain/repository";

export class UpdateUserByEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashRepository: PasswordHashRepository
  ) {}

  async run(user: User, email: string): Promise<UserResponse> {
    const resultValidation = validatePartialUser(user);
    if (resultValidation.success) {
      const originalUser = await this.userRepository.getUserByEmail(email);
      if (!originalUser) throw new Error("User not found");
      const password = this.passwordHashRepository.createPasswordHash(
        user.password
      );
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
