import { FastifyRequest, FastifyReply } from 'fastify';
import { WebhookService } from '../services/WebhookService';

export class WebhookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const service = new WebhookService();
    service.execute(request.body);

    return reply.status(200).send({ ok: true });
  }
}
