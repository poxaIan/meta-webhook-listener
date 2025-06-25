import { FastifyRequest, FastifyReply } from 'fastify';
import { WebhookService } from '../../../../modules/services/WebhookService'; // ajuste o path conforme sua estrutura

export class handleWhatsappWebhook {
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
        console.log('[WebhookController] Erro recebido:');
        console.log(`  Código: ${error.code}`);
        console.log(`  Mensagem: ${error.message}`);
        console.log(`  Detalhes: ${error.details}`);
      }

      // ✅ Chama o WebhookService para simular envio para fila
      const service = new WebhookService();
      await service.execute(body);
    } else {
      console.log('[WebhookController] Nenhum erro encontrado na requisição.');
    }

    return reply.status(200).send({
      status: 'received',
      error: {
        code: errors?.[0]?.code || null,
        message: errors?.[0]?.message || 'Nenhuma mensagem',
        details: errors?.[0]?.details || 'Sem detalhes',
      },
    });


  }
}
