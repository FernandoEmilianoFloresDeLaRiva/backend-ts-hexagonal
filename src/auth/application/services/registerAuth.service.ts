import { User } from "../../../user/domain/entities";
import { UserRepository } from "../../../user/domain/repository/userRepository";
import { validateUser } from "../../../user/domain/validators/user.validator";
import { AuthResponse } from "../../domain/entities";
import bcrypt from "bcrypt";
import { createJwt } from "../utils/createJwt.util";

export class RegisterAuthService {
  constructor(private readonly userRepository: UserRepository) {}
  async run(user: User): Promise<AuthResponse> {
    try {
      const resultValidation = validateUser(user);
      console.log(1)
      if (resultValidation.success) {
        const isUserCreated = await this.existingUser(resultValidation.data.email);
        console.log(isUserCreated)
        if (!isUserCreated) {
          const password = resultValidation.data.password;
          const newUser = {
            ...resultValidation.data,
            password: bcrypt.hashSync(password, 10),
          };
          console.log(2)
          const responseUser : any = await this.userRepository.createUser(newUser);
          const jwt = createJwt(responseUser)
          const responseToke: AuthResponse = {
            token: jwt,
          };
          return responseToke;
        }
      }
      throw "Could not create"
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  private async existingUser(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.getUserByEmail(email);
    console.log(existingUser)
    if (existingUser) return true;
    return false;
  }
}
