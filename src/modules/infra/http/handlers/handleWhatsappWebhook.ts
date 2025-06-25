import { FastifyRequest, FastifyReply } from 'fastify';

export class WebhookController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    console.log('[WebhookController] Requisição recebida no endpoint /webhook');

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
      console.warn('[WebhookController] Objeto inesperado:', body.object);
      return reply.status(400).send('Objeto inválido');
    }

    const errors = body.entry?.[0]?.changes?.[0]?.value?.errors;

    if (errors && errors.length > 0) {
      for (const error of errors) {
        console.log('[WebhookController] 🔴 Erro recebido:');
        console.log(`  Código: ${error.code}`);
        console.log(`  Mensagem: ${error.message}`);
        console.log(`  Detalhes: ${error.details}`);
      }
    } else {
      console.log('[WebhookController] Nenhum erro encontrado na requisição.');
    }

    return reply.status(200).send('EVENT_RECEIVED');
  }
}
