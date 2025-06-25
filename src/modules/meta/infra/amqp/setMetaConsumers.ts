import { container } from '../../../../shared/infra/containers/container';
import { IMessageQueueProvider } from '../../../../shared/providers/models/IMessageQueueProvider';
import { META_ERRORS_QUEUE } from '../../../../config/amqp/queues';
import { metaErrorConsumer } from './consumers/metaErrorConsumer';

export async function setMetaConsumers(): Promise<void> {
  console.log('[setMetaConsumers] Inicializando consumer para fila META_ERRORS_QUEUE...');

  const provider = container.resolve<IMessageQueueProvider>('messageQueueProvider');

  try {
    await provider.createConsumer({
      queue: META_ERRORS_QUEUE,
      consumer: metaErrorConsumer,
    });

    console.log(`[setMetaConsumers] ✅ Consumer registrado para fila "${META_ERRORS_QUEUE}"`);
  } catch (err) {
    console.error('[setMetaConsumers] ❌ Erro ao registrar consumer:', err);
  }
}
