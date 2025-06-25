import { FastifyInstance } from 'fastify';
import { handleWhatsappWebhook } from '../handlers/handleWhatsappWebhook';

export async function registerRoutes(app: FastifyInstance) {
  console.log('[Rotas] Registrando rotas...');

  const controller = new handleWhatsappWebhook();

  app.get('/', async () => {
    return { status: 'ok', message: 'Webhook ativo' };
  });

  app.post('/webhook', async (request, reply) => {
    return controller.handle(request, reply);
  });

  console.log('[Rotas] ✅ Rotas registradas com sucesso');
}
