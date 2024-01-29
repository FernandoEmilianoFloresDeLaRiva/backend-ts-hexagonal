import { getUserDto } from "../../domain/dtos";
import { UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";

export class GetByIdService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(idTask: number): Promise<UserResponse> {
    try {
      const user = await this.userRepository.getById(idTask);
      if (user) return getUserDto(user);
      return {} as UserResponse;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
