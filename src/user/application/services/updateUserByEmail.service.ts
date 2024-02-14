import { User, UserResponse } from "../../domain/entities";
import { UserRepository } from "../../domain/repository/userRepository";
import { validatePartialUser } from "../../domain/validators/user.validator";
import { CreatePasswordService } from "../../../auth/application/services";
import {
  ConsumeChannelService,
  SendMessageService,
} from "../../../shared/application/broker/services";
import { QueueName } from "../../../shared/domain/broker/entities";

export class UpdateUserByEmailService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sendMessageService: SendMessageService,
    private readonly consumeChannelService: ConsumeChannelService
  ) {}

  async run(user: User, email: string): Promise<UserResponse> {
    try {
      const resultValidation = validatePartialUser(user);
      if (resultValidation.success) {
        const originalUser = await this.userRepository.getUserByEmail(email);
        if (!originalUser) throw new Error("User not found");
        const { password } = user;
        await this.sendMessageService.run(password, QueueName.ENCODE);
        this.consumeChannelService.run(
          QueueName.CREATE_USER,
          async (passwordHashed) => {
            const newUser: User = {
              email: user.email,
              username: user.username,
              password: passwordHashed as string,
            };
            await this.userRepository.updateUserByEmail(email, newUser);
          }
        );
      }
      throw new Error("Could not update user");
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
