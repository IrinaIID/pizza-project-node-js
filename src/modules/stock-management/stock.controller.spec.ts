import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import Fastify from 'fastify';
import { stockController } from './stock.controller.js';
import { errorHandler } from '../../common/error-handler.js';
import type { ShipmentType } from './schemas/shipment.schema.js';

vi.mock('./stock.service.js', () => ({
  StockService: vi.fn().mockImplementation(() => ({
    receiveShipment: vi.fn((data: ShipmentType) => ({ received: true, ...data })),
  })),
}));

describe('stockController', () => {
  let app: ReturnType<typeof Fastify>;

  beforeAll(async () => {
    app = Fastify({ logger: false });

    await errorHandler(app);
    await stockController(app);
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 and shipment result for valid payload', async () => {
    const payload: ShipmentType = {
      dishName: 'Pizza',
      ingredients: [
        { ingredientName: 'Cheese', quantity: 200, unit: 'g' },
        { ingredientName: 'Flour', quantity: 500, unit: 'g' },
      ],
    };

    const response = await app.inject({
      method: 'POST',
      url: '/stock',
      payload,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ received: true, ...payload });
  });

  it('should return 400 for invalid payload', async () => {
    const invalidPayload = { dishName: 123 };

    const response = await app.inject({
      method: 'POST',
      url: '/stock',
      payload: invalidPayload,
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toHaveProperty('error', 'Validation error');
    expect(response.json()).toHaveProperty('details');
  });
});
