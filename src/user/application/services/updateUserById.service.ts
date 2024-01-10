import { User, UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import bcrypt from "bcrypt";
import { validatePartialUser } from "../../domain/validators/user.validator";

export class UpdateUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User, id_user: number): Promise<UserResponse> {
    const resultValidation = validatePartialUser(user);
    if (resultValidation.success) {
      const originalUser = this.userRepository.getUsersById(id_user);
      if (!(user.email && user.password && user.username && originalUser))
        throw new Error("User not found");
      const password = bcrypt.hashSync(user.password, 10);
      const newUser: User = {
        ...user,
        password,
      };
      return await this.userRepository.updateUserById(id_user, newUser);
    }
    throw new Error(resultValidation.error.message);  
  }
}
