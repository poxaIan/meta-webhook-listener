import Fastify from 'fastify';
import { registerRoutes } from './routes';
import 'dotenv/config';

export const app = Fastify({ logger: true });

registerRoutes(app);
