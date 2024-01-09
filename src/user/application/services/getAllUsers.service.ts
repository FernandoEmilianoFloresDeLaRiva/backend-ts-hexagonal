import { getAllUserDtos } from "../../domain/dtos";
import { UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";

export class GetAllUsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(): Promise<UserResponse[]> {
    try {
      const response = await this.userRepository.getUsers();
      if (response.length) {
        const formatedResponse = getAllUserDtos(response);
        return formatedResponse;
      }
      return response;
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  }
}
