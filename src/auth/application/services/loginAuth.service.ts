import { User } from "../../../user/domain/entities";
import { UserRepository } from "../../../user/domain/repository/userRepository";
import { AuthResponse } from "../../domain/entities";
import {
  PasswordHashRepository,
  TokenRepository,
} from "../../domain/repository";
import { validateAuth } from "../../domain/validators/auth.validator";

export class LoginAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly passwordHashRepository: PasswordHashRepository
  ) {}
  async run(user: User): Promise<AuthResponse> {
    try {
      const resultValidation = validateAuth(user);
      if (resultValidation.success) {
        const response = await this.userRepository.getUserByEmail(user.email);
        //se checan credenciales
        const isPasswordValid = this.passwordHashRepository.compareCredentials(
          user,
          response.password
        );
        if (isPasswordValid) {
          const jwt = this.tokenRepository.createToken(user);
          //Se crea el token y se envia;
          const responseToken: AuthResponse = {
            token: jwt,
          };
          return responseToken;
        }
        throw new Error(`password or email was not valid`);
      }
      throw new Error(resultValidation.error.message);
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
