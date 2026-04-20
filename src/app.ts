import Fastify from 'fastify';
import { ZodTypeProvider, validatorCompiler, serializerCompiler } from 'fastify-type-provider-zod';
import { HealthCheckController } from './modules/healthcheck/healthcheck.controller.js';
import { StockController } from './modules/stock-management/stock.controller.js';
import { errorHandler } from './common/error-handler.js';
import { ShipmentController } from './modules/shipment/shipment.controller.js';

export const app = Fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(errorHandler);
await app.register(HealthCheckController);
await app.register(StockController);
await app.register(ShipmentController);

await app.listen({ port: 3000 });
