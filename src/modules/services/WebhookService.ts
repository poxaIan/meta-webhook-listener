import { container } from '../../shared/infra/containers/container';
import { IMessageQueueProvider } from '../../shared/providers/models/IMessageQueueProvider';
import { META_ERRORS_QUEUE } from '../../config/amqp/queues';

export class WebhookService {
  async execute(body: any) {
    console.log('[WebhookService] Corpo recebido:', body);

    const provider = container.resolve<IMessageQueueProvider>('messageQueueProvider');

    await provider.sendToQueue(META_ERRORS_QUEUE, {
      code: 131050,
      message: 'Simulated error',
      details: 'Usuário parou de receber mensagens da empresa',
    });
  }
}
