import { QueueContent, QueueName } from "./index";

export interface QueueRequest {
  queueName: QueueName;
  content: QueueContent;
}
