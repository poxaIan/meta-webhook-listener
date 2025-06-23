import { FastifyInstance } from 'fastify';

export async function registerRoutes(app: FastifyInstance) {
  const VERIFY_TOKEN = 'EAAYGQ8mOifUBOx9EmoG5jDKNI708nKekD4naVLb7OlIaPeUhDL7vNH3jQfdcFRvThbe1JHMlZAiExIr1WzHZBJdE1HfWhekKCJHSBdaFOx4IclNAOHr4nPbnh9iyi4Kym5aB1Yzd1sYx456ZAItvgXkg08m6JywnuCrdknHZBYA37WlRj8WmhalZAAZBfW7asjP2KGixXqDbVnVcRJwi2VP73UORdHOLZA3QAiZAPJE5fdeK9gZDZD'; 

app.get('/webhook', {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        'hub.mode': { type: 'string' },
        'hub.verify_token': { type: 'string' },
        'hub.challenge': { type: 'string' },
      },
      required: ['hub.mode', 'hub.verify_token', 'hub.challenge'],
    },
  },
}, async (request, reply) => {
  const { 'hub.mode': mode, 'hub.verify_token': token, 'hub.challenge': challenge } = request.query as any;

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return reply.status(200).send(challenge);
  } else {
    return reply.status(403).send('Forbidden');
  }
});


}
