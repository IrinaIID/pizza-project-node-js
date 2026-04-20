import Fastify from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { healthCheckController } from './modules/healthcheck/healthcheck.controller.js';
import { stockController } from './modules/stock-management/stock.controller.js';
import { errorHandler } from './common/error-handler.js';

export const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

await app.register(errorHandler);
await app.register(healthCheckController);
await app.register(stockController);

await app.listen({ port: 3000 });
