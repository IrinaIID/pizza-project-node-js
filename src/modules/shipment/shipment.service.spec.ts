import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShipmentService } from './shipment.service.js';
import { BusinessRuleError } from '../../common/errors.js';

vi.mock('./strategies/strategy.factory.js', () => {
  return {
    getStrategy: () => ({
      validateWorkingHours: () => true,
      validateMinUnits: (u: number) => u >= 1,
      validateMaxUnits: (u: number) => u <= 10,
      getMaxUnits: () => 10,
    }),
  };
});

vi.mock('./shipment.service.js', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('./shipment.service.js');

  return {
    ...actual,
    ShipmentRepository: class {
      createShipment = vi.fn().mockResolvedValue(true);
    },
  };
});

describe('ShipmentService', () => {
  let service: ShipmentService;

  beforeEach(() => {
    service = new ShipmentService();
  });

  it('should create shipment successfully', async () => {
    const result = await service.registerShipment('LT', 'vilnius', [{ id: 'ing-1', units: 5 }]);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      ingredientId: 'ing-1',
      units: 5,
      warehouse: 'vilnius',
      country: 'LT',
    });
  });

  it('should split shipment when units exceed max', async () => {
    const result = await service.registerShipment('LT', 'vilnius', [{ id: 'ing-1', units: 25 }]);

    expect(result).toEqual([
      { ingredientId: 'ing-1', units: 10, warehouse: 'vilnius', country: 'LT' },
      { ingredientId: 'ing-1', units: 10, warehouse: 'vilnius', country: 'LT' },
      { ingredientId: 'ing-1', units: 5, warehouse: 'vilnius', country: 'LT' },
    ]);
  });

  it('should throw when units below minimum', async () => {
    await expect(
      service.registerShipment('LT', 'vilnius', [{ id: 'ing-1', units: 0 }]),
    ).rejects.toThrow(BusinessRuleError);
  });
});
