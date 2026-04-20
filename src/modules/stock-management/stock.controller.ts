import { FastifyInstance } from 'fastify';
import { shipmentSchema, ShipmentType } from './schemas/shipment.schema.js';
import { StockService } from './stock.service.js';

export async function stockController(app: FastifyInstance) {
  const stockService = new StockService();

  app.post('/stock', async (request, reply) => {
    const data: ShipmentType = shipmentSchema.parse(request.body);

    app.log.info(`Shipment received for - ${data.dishName}`);

    const result = stockService.receiveShipment(data);
    return reply.status(200).send(result);
  });
}
