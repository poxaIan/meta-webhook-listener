type ConsumerFunction = (message: any) => Promise<void>;

export interface IMessageQueueProvider {
  sendToQueue(queue: string, payload: any): Promise<void>;
  createConsumer(config: {
    queue: string;
    consumer: ConsumerFunction;
  }): Promise<void>;
}
