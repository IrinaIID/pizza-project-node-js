import { describe, it, expect } from 'vitest';
import { StockService } from './stock.service.js';
import { shipmentSchema, type ShipmentType } from './schemas/shipment.schema.js';

describe('StockService', () => {
  const service = new StockService();

  it('should return the shipment data as-is', () => {
    const payload: ShipmentType = {
      dishName: 'Pizza',
      ingredients: [
        { ingredientName: 'Cheese', quantity: 200, unit: 'g' },
        { ingredientName: 'Flour', quantity: 500, unit: 'g' },
      ],
    };

    const result = service.receiveShipment(payload);

    expect(result).toEqual(payload);
  });

  it('should work with an empty ingredients array', () => {
    const payload: ShipmentType = {
      dishName: 'Water',
      ingredients: [],
    };

    const result = service.receiveShipment(payload);

    expect(result).toEqual(payload);
  });

  it('should throw if payload does not match schema', () => {
    const invalidPayload = {
      dishName: 'Pizza',
      ingredients: [{ ingredientName: 'Cheese', quantity: '200', unit: 'g' }],
    } as unknown;

    expect(() => shipmentSchema.parse(invalidPayload)).toThrow();
  });
});
