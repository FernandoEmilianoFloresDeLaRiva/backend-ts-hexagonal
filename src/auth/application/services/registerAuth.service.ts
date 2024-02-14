import {
  ConsumeChannelService,
  SendMessageService,
} from "../../../shared/application/broker/services";
import { QueueName } from "../../../shared/domain/broker/entities";
import { User } from "../../../user/domain/entities";
import { UserRepository } from "../../../user/domain/repository/userRepository";
import { validateUser } from "../../../user/domain/validators/user.validator";
import { AuthResponse } from "../../domain/entities";
import { CreatePasswordService } from "./createPassword.service";
import { CreateTokenService } from "./createToken.service";

export class RegisterAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly createToken: CreateTokenService,
    private readonly createPassword: CreatePasswordService,
    private readonly consumeChannelService: ConsumeChannelService,
    private readonly sendMessageService: SendMessageService
  ) {}
  async run(user: User): Promise<AuthResponse> {
    try {
      const resultValidation = validateUser(user);
      if (resultValidation.success) {
        const isUserCreated = await this.existingUser(
          resultValidation.data.email
        );
        if (!isUserCreated) {
          const { password } = user;
          await this.sendMessageService.run(password, QueueName.ENCODE);
          await this.consumeChannelService.run(
            QueueName.CREATE_USER,
            async (passwordHashed) => {
              const newUser: User = {
                email: user.email,
                username: user.username,
                password: passwordHashed as string,
              };
              await this.userRepository.createUser(newUser);
              const jwt = await this.createToken.run(newUser);
              const responseToke: AuthResponse = {
                token: jwt,
              };
              return responseToke;
            }
          );
          // const password = await this.createPassword.run(
          //   resultValidation.data.password
          // );
          // const newUser = {
          //   ...resultValidation.data,
          //   password,
          // };
          // const responseUser = await this.userRepository.createUser(newUser);
          // const jwt = await this.createToken.run(responseUser);
          // const responseToke: AuthResponse = {
          //   token: jwt,
          // };
          // return responseToke;
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
