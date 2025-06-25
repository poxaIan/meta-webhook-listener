import { container } from '../../shared/infra/containers/container';
import { IMessageQueueProvider } from '../../shared/providers/models/IMessageQueueProvider';
import { META_ERRORS_QUEUE } from '../../config/amqp/queues';

export class WebhookService {
  async execute(body: any) {
    console.log('[WebhookService] Body recebido:', JSON.stringify(body, null, 2));

    try {
      const provider = container.resolve<IMessageQueueProvider>('messageQueueProvider');

      const simulatedError = {
        code: 131050,
        message: 'Simulated error',
        details: 'Usuário parou de receber mensagens da empresa',
      };

      console.log('[WebhookService] Enviando erro simulado para a fila:', META_ERRORS_QUEUE);
      await provider.sendToQueue(META_ERRORS_QUEUE, simulatedError);

      console.log('[WebhookService] Erro simulado enviado com sucesso.');
    } catch (error) {
      console.error('[WebhookService] Falha ao enviar mensagem para fila:', error);
    }
  }
}
