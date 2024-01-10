import { getUserDto } from "../../domain/dtos";
import { UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";

export class GetUserByEmailService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(email : string): Promise<UserResponse> {
    try {
      const response = await this.userRepository.getUserByEmail(email);
      console.log(response)
      if (response) {
        const formatedResponse = getUserDto(response);
        return formatedResponse;
      }
      return {} as UserResponse;
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  }
}
