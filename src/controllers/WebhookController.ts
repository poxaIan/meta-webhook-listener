// src/modules/infra/http/handlers/WebhookController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { WebhookService } from '../modules/services/WebhookService'; // ajuste conforme seu path real

export class WebhookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log('[WebhookController] Requisição recebida no endpoint /webhook');

    const body = request.body;

    const service = new WebhookService();
    await service.execute(body); // chama a fila simulada

    return reply.status(200).send('EVENT_RECEIVED');
  }
}
