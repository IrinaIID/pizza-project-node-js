import { describe, it, expect } from 'vitest';
import { getStrategy } from './strategy.factory.js';

describe('getStrategy', () => {
  it('should return a WarehouseStrategy for valid country and warehouse', () => {
    const strategy = getStrategy('lt', 'a');

    expect(strategy).toBeDefined();
    expect(strategy).toBeInstanceOf(Object);
  });

  it('should throw error for unsupported country', () => {
    expect(() => {
      getStrategy('INVALID', 'a');
    }).toThrow('Unsupported country: INVALID');
  });

  it('should throw error for unsupported warehouse', () => {
    expect(() => {
      getStrategy('pl', 'unknown-warehouse');
    }).toThrow('Unsupported warehouse: unknown-warehouse for country pl');
  });

  it('should be case insensitive', () => {
    const strategy = getStrategy('lt', 'a');

    expect(strategy).toBeDefined();
  });
});
