import { describe, it, expect } from 'vitest';
import { WarehouseStrategy } from './warehouse.strategy.js';

describe('WarehouseStrategy', () => {
  const rules = {
    workingHours: {
      start: 8,
      end: 18,
    },
    minUnits: 10,
    maxUnits: 100,
  };

  const strategy = new WarehouseStrategy(rules);

  it('should validate working hours correctly (true case)', () => {
    const date = new Date();
    date.setHours(10);

    expect(strategy.validateWorkingHours(date)).toBe(true);
  });

  it('should fail working hours outside range', () => {
    const date = new Date();
    date.setHours(2);

    expect(strategy.validateWorkingHours(date)).toBe(false);
  });

  it('should validate min units', () => {
    expect(strategy.validateMinUnits(10)).toBe(true);
    expect(strategy.validateMinUnits(5)).toBe(false);
  });

  it('should validate max units', () => {
    expect(strategy.validateMaxUnits(100)).toBe(true);
    expect(strategy.validateMaxUnits(150)).toBe(false);
  });

  it('should return max units', () => {
    expect(strategy.getMaxUnits()).toBe(100);
  });
});
