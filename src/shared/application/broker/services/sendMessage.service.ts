import {
  QueueContent,
  QueueName,
  QueueRequest,
} from "../../../domain/broker/entities";
import { QueueRepository } from "../../../domain/broker/repository/QueueRepository";

export class SendMessageService {
  constructor(private readonly queueRepository: QueueRepository) {}
  async run(data: QueueContent, queueName: QueueName) {
    try {
      const reqQueue: QueueRequest = {
        queueName: queueName,
        content: data,
      };
      this.queueRepository.sendMessageToChannel(reqQueue);
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
