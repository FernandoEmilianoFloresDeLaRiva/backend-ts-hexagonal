import { QueueName, QueueRequest, QueueContent } from "../entities";

export interface QueueRepository {
  sendMessageToChannel(req: QueueRequest): void;
  consumeChannel(
    queueName: QueueName,
    nextCall: (data: QueueContent) => {}
  ): void;
}
