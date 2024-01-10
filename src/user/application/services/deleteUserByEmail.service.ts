import { UserRepository } from "../../domain/repository/userRepository";

export class DeleteUserByEmailService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(email : string): Promise<boolean> {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      if (user) {
        await this.userRepository.deleteUserByEmail(email);
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
