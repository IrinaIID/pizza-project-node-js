import { FastifyInstance } from 'fastify';
import { PizzaProductionService } from './pizza-production.service.js';

export async function PizzaProductionController(app: FastifyInstance) {
  const service = new PizzaProductionService();

  app.get('/production/ready-pizzas', async () => {
    return service.getReadyPizzas();
  });
}
