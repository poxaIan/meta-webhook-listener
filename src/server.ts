import Fastify from 'fastify';
import { setMetaConsumers } from './modules/meta/infra/amqp/setMetaConsumers';
import { WebhookController } from './modules/infra/http/handlers/handleWhatsappWebhook';

const app = Fastify();

// Instância do controller
const controller = new WebhookController();

// Rota de health check
app.get('/', async () => {
  return { status: 'ok', message: 'Webhook ativo' };
});

// Rota principal para receber webhooks do WhatsApp (Meta)
app.post('/webhook', async (request, reply) => {
  return controller.handle(request, reply);
});

// Inicialização do app e dos consumers
(async () => {
  try {
    console.log('[Bootstrap] Inicializando consumidores Meta...');
    await setMetaConsumers();
    console.log('[Bootstrap] ✅ Consumers inicializados com sucesso');

    const PORT = process.env.PORT || 3000;

    await app.listen({ port: +PORT, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  } catch (err) {
    console.error('[Bootstrap] ❌ Erro ao inicializar aplicação:', err);
    process.exit(1);
  }
})();
