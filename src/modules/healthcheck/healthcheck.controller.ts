import { FastifyInstance } from 'fastify';
import { HealthCheckService } from './healthcheck.service.js';

export async function HealthCheckController(app: FastifyInstance) {
  const healthService = new HealthCheckService();

  app.get('/healthcheck', async (request, reply) => {
    const status = healthService.getStatus();

    reply.send(status);
  });
}
