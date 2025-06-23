import Fastify from 'fastify';
import { registerRoutes } from './routes';

export const app = Fastify({ logger: true });

registerRoutes(app);
