import { UserRepository } from "../../domain/repository/userRepository";

export class DeleteUserById {
  constructor(private readonly userRespository: UserRepository) {}
  async run(id_user: number): Promise<boolean> {
    try {
      const user = await this.userRespository.getUsersById(id_user);
      if (user) {
        await this.userRespository.deleteUserById(id_user);
        return true;
      }
      return false;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
