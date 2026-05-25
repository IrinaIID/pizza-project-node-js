import { FastifyInstance } from 'fastify';
import { shipmentSchema, ShipmentType } from './schemas/shipment.schema.js';
import { StockService } from './stock.service.js';

export async function StockController(app: FastifyInstance) {
  const stockService = new StockService();

  app.post(
    '/stock',
    {
      schema: {
        body: shipmentSchema,
      },
    },
    async (request, reply) => {
      const data = request.body as ShipmentType;

      app.log.info(`Shipment received for - ${data.dishName}`);

      const result = stockService.receiveShipment(data);
      return reply.status(200).send(result);
    },
  );
}
