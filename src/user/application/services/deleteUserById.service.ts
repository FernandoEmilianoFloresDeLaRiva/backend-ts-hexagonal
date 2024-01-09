import { UserRepository } from "../../domain/repository/userRepository";

export class DeleteUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(id_user: number): Promise<boolean> {
    try {
      const user = await this.userRepository.getUsersById(id_user);
      if (user) {
        await this.userRepository.deleteUserById(id_user);
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
