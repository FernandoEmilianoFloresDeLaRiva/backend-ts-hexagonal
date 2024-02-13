import amqp, { Message } from "amqplib/callback_api";
import {
  QueueRequest,
  QueueContent,
  QueueName,
} from "../../domain/broker/entities";
import { QueueRepository } from "../../domain/broker/repository/QueueRepository";
import { Connection } from "amqplib/callback_api";

export class AmqpLibPort implements QueueRepository {
  constructor(private readonly url: string) {}
  sendMessageToChannel(req: QueueRequest): void {
    const { queueName, content } = req;
    amqp.connect(this.url, (errConn: any, conn: Connection) => {
      if (errConn) throw new Error(errConn);
      conn.createChannel((errChannel, channel) => {
        if (errChannel) throw new Error(errChannel);
        channel.assertQueue(queueName);
        //jsonstringify va en logica de negocio
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)));
        console.log("message send: " + content);
        setTimeout(() => {
          conn.close();
        }, 1000);
      });
    });
  }
  consumeChannel(
    queueName: QueueName,
    nextCall: (data: QueueContent) => {}
  ): void {
    amqp.connect(this.url, (errConn: any, conn: Connection) => {
      if (errConn) throw new Error(errConn);
      conn.createChannel((errChannel, channel) => {
        if (errChannel) throw new Error(errChannel);
        channel.assertQueue(queueName);
        //jsonstringify va en logica de negocio
        channel.consume(queueName, async (data: Message | null) => {
          if (data === null) throw new Error("Invalid data: " + data);
          const content = data?.content ?? null;
          const parsedContent = JSON.parse(content.toString());
          await nextCall(parsedContent);
          channel.ack(data);
        });
      });
    });
  }
}
