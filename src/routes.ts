import { FastifyInstance } from 'fastify';

export async function registerRoutes(app: FastifyInstance) {
  // const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

  // // Health check
  // app.get('/', async () => {
  //   return { status: 'ok', message: 'Webhook ativo' };
  // });

  // // Verificação inicial do Webhook (usado pelo Meta para confirmar URL)
  // app.get('/webhook', {
  //   schema: {
  //     querystring: {
  //       type: 'object',
  //       properties: {
  //         'hub.mode': { type: 'string' },
  //         'hub.verify_token': { type: 'string' },
  //         'hub.challenge': { type: 'string' },
  //       },
  //       required: ['hub.mode', 'hub.verify_token', 'hub.challenge'],
  //     },
  //   },
  // }, async (request, reply) => {
  //   const {
  //     'hub.mode': mode,
  //     'hub.verify_token': token,
  //     'hub.challenge': challenge
  //   } = request.query as any;

  //   if (mode === 'subscribe' && token === VERIFY_TOKEN) {
  //     return reply.status(200).send(challenge);
  //   } else {
  //     return reply.status(403).send('Forbidden');
  //   }
  // });

  // Receber eventos de webhook (mensagens, status etc.)
  app.post('/webhook', async (request, reply) => {
  const body = request.body as {
    entry?: {
      changes?: {
        value?: {
          errors?: {
            code: number;
            message: string;
            details: string;
          }[];
        };
      }[];
    }[];
  };

  const errors = body?.entry?.[0]?.changes?.[0]?.value?.errors;

  if (errors && errors.length > 0) {
    for (const error of errors) {
      console.log('[Erro recebido]');
      console.log(`Código: ${error.code}`);
      console.log(`Mensagem: ${error.message}`);
      console.log(`Detalhes: ${error.details}`);
    }
  }

  return reply.status(200).send('EVENT_RECEIVED');
});


}
