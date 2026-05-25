import { FastifyInstance } from 'fastify';
import { paramsSchema, ParamsType } from './schemas/params.schema.js';
import { shipmentSchema, ShipmentType } from './schemas/shipment.schema.js';
import { ShipmentService } from './shipment.service.js';

export async function ShipmentController(app: FastifyInstance) {
  const shipmentService = new ShipmentService();

  app.post(
    '/shipment/:countryCode',
    {
      schema: {
        params: paramsSchema,
        body: shipmentSchema,
      },
    },
    async (request, reply) => {
      const { countryCode } = request.params as ParamsType;
      const { targetWarehouse, ingredients } = request.body as ShipmentType;

      const result = await shipmentService.registerShipment(
        countryCode,
        targetWarehouse,
        ingredients,
      );

      return reply.send(result);
    },
  );
}
