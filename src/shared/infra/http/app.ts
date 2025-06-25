import Fastify from 'fastify';
import { registerRoutes } from '../../../modules/infra/http/routes/routes';
import 'dotenv/config';

export const app = Fastify({ logger: true });

registerRoutes(app);
