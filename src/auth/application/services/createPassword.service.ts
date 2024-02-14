import {
  ConsumeChannelService,
  SendMessageService,
} from "../../../shared/application/broker/services";
import { QueueName } from "../../../shared/domain/broker/entities";
import { BCYPT_SPACE } from "../../domain/constants";
import { PasswordHashRepository } from "../../domain/repository";

export class CreatePasswordService {
  constructor(
    private readonly bCryptPort: PasswordHashRepository,
    private readonly consumeChannelService: ConsumeChannelService,
    private readonly sendMessageService: SendMessageService
  ) {}
  async run(): Promise<void> {
    try {
      this.consumeChannelService.run(QueueName.ENCODE, async (password) => {
        try {
          const passwordHash = await this.bCryptPort.createPasswordHash(
            password.toString(),
            BCYPT_SPACE
          );
          this.sendMessageService.run(passwordHash, QueueName.CREATE_USER);
        } catch (err: any) {
          throw new Error(err);
        }
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
