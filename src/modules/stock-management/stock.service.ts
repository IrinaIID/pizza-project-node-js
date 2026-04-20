import { z } from 'zod';
import { shipmentSchema } from './schemas/shipment.schema.js';

export type Shipment = z.infer<typeof shipmentSchema>;

export class StockService {
  receiveShipment(data: Shipment): Shipment {
    return data;
  }
}
