import { FastifyRequest, FastifyReply } from 'fastify';

export class WebhookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as {
      object?: string;
      entry?: {
        id?: string;
        changes?: {
          field?: string;
          value?: {
            messaging_product?: string;
            metadata?: {
              display_phone_number?: string;
              phone_number_id?: string;
            };
            errors?: {
              code: number;
              message: string;
              details: string;
            }[];
          };
        }[];
      }[];
    };

    if (body.object !== 'whatsapp_business_account') {
      console.warn('Objeto inesperado:', body.object);
      return reply.status(400).send('Objeto inválido');
    }

    const errors = body.entry?.[0]?.changes?.[0]?.value?.errors;

    if (errors && errors.length > 0) {
      for (const error of errors) {
        console.log('[Erro recebido]');
        console.log(`Código: ${error.code}`);
        console.log(`Mensagem: ${error.message}`);
        console.log(`Detalhes: ${error.details}`);
      }
    }

    return reply.status(200).send('EVENT_RECEIVED');
  }
}

