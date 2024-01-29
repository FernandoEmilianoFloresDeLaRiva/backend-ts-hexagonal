import { User } from "../../../user/domain/entities";
import { UserRepository } from "../../../user/domain/repository/userRepository";
import { AuthResponse } from "../../domain/entities";
import { validateAuth } from "../../domain/validators/auth.validator";
import bcrypt from "bcrypt";
import { createJwt } from "../../infraestructure/utils";

export class LoginAuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(user: User): Promise<AuthResponse> {
    try {
      const resultValidation = validateAuth(user);
      if (resultValidation.success) {
        const response = await this.userRepository.getUserByEmail(user.email);
        //se checan credenciales
        const isPasswordValid = this.compareCredentials(
          user,
          response.password
        );
        if (isPasswordValid) {
          const jwt = createJwt(user);
          console.log(jwt);
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

  private compareCredentials(user: User, passwordRequest: string): boolean {
    const correctPassword = bcrypt.compareSync(user.password, passwordRequest);
    return correctPassword;
  }
}
