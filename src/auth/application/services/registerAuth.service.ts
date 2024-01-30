import { User } from "../../../user/domain/entities";
import { UserRepository } from "../../../user/domain/repository/userRepository";
import { validateUser } from "../../../user/domain/validators/user.validator";
import { AuthResponse } from "../../domain/entities";
import {
  PasswordHashRepository,
  TokenRepository,
} from "../../domain/repository";

export class RegisterAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly passwordHashRepository: PasswordHashRepository
  ) {}
  async run(user: User): Promise<AuthResponse> {
    try {
      const resultValidation = validateUser(user);
      if (resultValidation.success) {
        const isUserCreated = await this.existingUser(
          resultValidation.data.email
        );
        if (!isUserCreated) {
          const password = this.passwordHashRepository.createPasswordHash(
            resultValidation.data.password
          );
          const newUser = {
            ...resultValidation.data,
            password,
          };
          const responseUser = await this.userRepository.createUser(newUser);
          const jwt = this.tokenRepository.createToken(responseUser);
          const responseToke: AuthResponse = {
            token: jwt,
          };
          return responseToke;
        }
      }
      throw new Error("Could not create");
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  private async existingUser(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) return true;
    return false;
  }
}
