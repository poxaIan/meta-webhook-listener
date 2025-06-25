import { IMessageQueueProvider } from '../models/IMessageQueueProvider';

type QueueHandler = {
  [queue: string]: (payload: any) => Promise<void>;
};

export class FakeMessageQueueProvider implements IMessageQueueProvider {
  private handlers: QueueHandler = {};

  async sendToQueue(queue: string, payload: any): Promise<void> {
    console.log(`\n[FakeMQ] → Enviado para fila "${queue}"`);
    console.log('[FakeMQ] Payload:', JSON.stringify(payload, null, 2));

    const handler = this.handlers[queue];
    if (handler) {
      console.log(`[FakeMQ] → Chamando handler da fila "${queue}"...`);
      try {
        await handler(payload);
        console.log(`[FakeMQ] ✓ Payload processado com sucesso pela fila "${queue}"`);
      } catch (err) {
        console.error(`[FakeMQ] ✗ Erro ao processar payload na fila "${queue}":`, err);
      }
    } else {
      console.warn(`[FakeMQ] ⚠ Nenhum consumer registrado para a fila "${queue}"`);
    }
  }

  async createConsumer(config: {
    queue: string;
    consumer: (message: any) => Promise<void>;
  }): Promise<void> {
    this.handlers[config.queue] = config.consumer;
    console.log(`\n[FakeMQ] ✅ Consumer registrado para fila "${config.queue}"`);
  }
}
