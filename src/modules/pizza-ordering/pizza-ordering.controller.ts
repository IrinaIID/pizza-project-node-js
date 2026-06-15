import { FastifyInstance } from 'fastify';
import { PizzaOrderingService } from './pizza-ordering.service.js';

export async function PizzaOrderingController(app: FastifyInstance) {
  const service = new PizzaOrderingService();

  app.patch('/orders/:id/ready', async (request) => {
    const { id } = request.params as {
      id: string;
    };

    return service.markReady(Number(id));
  });
}
