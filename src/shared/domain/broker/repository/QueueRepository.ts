import { QueueName, QueueRequest, QueueResponse } from "../entities";

export interface QueueRepository {
  connectionBroker(): Promise<any>;
  createChannel(): Promise<any>;
  sendMessageToChannel(req: QueueRequest): Promise<void>;
  deleteMessage(queueName: QueueName, data: any): Promise<void>;
  consumeChannel(queueName: QueueName): Promise<QueueResponse>;
}
