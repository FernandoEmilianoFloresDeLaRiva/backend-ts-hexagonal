import { QueueName, QueueResponse } from "../../../domain/broker/entities";
import { QueueRepository } from "../../../domain/broker/repository/QueueRepository";

export class ConsumeChannelService {
  constructor(private readonly queueRepository: QueueRepository) {}
  async run(queueName: QueueName, callbackToDo: (msg: QueueResponse) => void) {
    try {
      const msg = await this.queueRepository.consumeChannel(queueName);
      console.log(msg);
      //callbackToDo(msg);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
