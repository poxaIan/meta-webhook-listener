import { container } from '../../shared/infra/containers/container';
import { IMessageQueueProvider } from '../../shared/providers/models/IMessageQueueProvider';
import { META_ERRORS_QUEUE } from '../../config/amqp/queues';

export class WebhookService {
  async execute(body: any) {
    console.log('[WebhookService] Body recebido:', JSON.stringify(body, null, 2));

    try {
      const provider = container.resolve<IMessageQueueProvider>('messageQueueProvider');

      const simulatedError = {
        errorCode: 131050,
        errorMsg: 'Simulated error',
        errorDetails: 'Usuário parou de receber mensagens da empresa',
      };

      console.log('[WebhookService] Enviando erro simulado para a fila:', META_ERRORS_QUEUE);
      await provider.sendToQueue(META_ERRORS_QUEUE, simulatedError);

      console.log('[WebhookService] Erro simulado enviado com sucesso.');
    } catch (e) {
      console.error('[WebhookService] Falha ao enviar mensagem para fila:', e);
    }
  }
}
