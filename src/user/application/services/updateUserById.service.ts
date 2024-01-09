import { User, UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import bcrypt from "bcrypt";

export class UpdateUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  async run(user: User, id_user: number): Promise<UserResponse> {
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
}
