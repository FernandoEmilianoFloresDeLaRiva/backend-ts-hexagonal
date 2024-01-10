import { User, UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import bcrypt from "bcrypt";
import { validatePartialUser } from "../../domain/validators/user.validator";

export class UpdateUserByEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User, email: string): Promise<UserResponse> {
    const resultValidation = validatePartialUser(user);
    if (resultValidation.success) {
      const originalUser = await this.userRepository.getUserByEmail(email);
      if (!originalUser) throw new Error("User not found");
      console.log(originalUser);
      const password = bcrypt.hashSync(user.password, 10);
      const newUser: User = {
        email: user.email,
        username: user.username,
        password,
      };
      console.log(newUser);
      return await this.userRepository.updateUserByEmail(email, newUser);
    }
    throw new Error(resultValidation.error.message);
  }
}
